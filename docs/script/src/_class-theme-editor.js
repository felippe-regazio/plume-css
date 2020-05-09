class ThemeEditor {
  
  /**
   * {
   *  form: '.holder form',
   *  propset: {}
   * }
   * @param {Object} options Set of constructor options
   */
  constructor (options) {
    this.FORM = document.querySelector(options.form);
    this.CSS_CUSTOM_PROPS = options.propset;
    this.render();
  }

  /**
   * Renders the entire Theme Editor feature on the theme-editor html chunk
   * @return void
   */
  render () {
    const propInputs = this._customPropsToInputs(this.CSS_CUSTOM_PROPS);
    
    this._renderPropsInputs(this.FORM, propInputs);
    this.FORM.append(this._createPropsDataList());
    
    this._addThemePreviewAction('.preview-theme');
    this._addDownloadThemeAction('.download-theme');
    this._addCssCustomPropsIndex('#proplist');
    this._addReloadAppBtnEvents('.reload-app');
    this._addSearchPropBtnEvents('#search-custom-props');
  }

  // -------------------------------------------------------------

  /**
   * Create a <datalist> element on this.FORM
   * @param {Object} attrs datalist attributes 
   * @return {Element} <datalist> element
   */
  _createPropsDataList () {
    const dataList = Object.assign(document.createElement('datalist'), {
      id: 'theme-editor-datalist',
      optionsIndex: []
    });
    
    dataList.addOption = value => {
      if (value && value.startsWith('--')) {
        value = `var(${value})`;
      }

      if (value && !dataList.optionsIndex.includes(value)) {
        dataList.optionsIndex.push(value);
      
        const option = Object.assign(document.createElement('option'), {
          innerText: value
        });
        
        dataList.append(option);
      }
    }
    
    this.FORM.querySelectorAll('input').forEach(input => {
      [input.name, input.value, input.dataset.defaultValue].forEach(val => {
        dataList.addOption(val);
      });
    });

    return dataList;
  }

  /**
   * Create a text <input> for a given prop
   * @param {Object} prop A prop from  this.CSS_CUSTOM_PROPS
   * @return {Element} An input element that can edit the given property
   */
  _createPropInput (prop) {
    return new PropInput(prop);
  }

  /**
   * Create a holder element. Commonly used to wrap a set of inputs
   * @return {Element} The holder element (div)
   */
  _createHolder () {
    return document.createElement('div');
  }
  
  /**
   * Convert a custom props set into a set of prop Inputs
   * @param {Array} customProps an array of css custom properties set like this.CSS_CUSTOM_PROPS
   * @return {Array} Array of custom properties inputs
   */
  _customPropsToInputs (customProps) {
    return customProps.map(propset => {
      return propset.map(prop => this._createPropInput(prop));
    });
  }
  
  /**
   * Appends a custom props input list to the form,
   * Every array inside the customPropsInputs[] will be a div
   * That div will hold the inputs on this set, and be apended on form
   * @param {*} customPropsInputs 
   * @return void
   */
  _renderPropsInputs (form, customPropsInputs) {
    customPropsInputs.forEach(inputset => {
      const holder = this._createHolder()
      inputset.forEach(input => {
        holder.append(input);
      });
      this.FORM.append(holder);
    });
  }

  /**
   * Add the custom theme source code to the custom-theme-code-mirror textarea
   * And add the proper events to show the source code on the given trigger
   * @param {String} trigger A selector to trigger the action
   * @return void
   */
  _addThemePreviewAction (trigger) {

    const textarea = document.getElementById('custom-theme-code-mirror');
    const CM = this._initializeCodeMirror(textarea);

    document.querySelectorAll(trigger).forEach(el => {
      el.addEventListener('click', e => {
        const theme = ThemeUtils.getCustomTheme();
        CM.setValue(theme);
        CM.refresh();
      });
    });
  }

  /**
   * Force to download the current theme source code on click
   * @param {String} trigger A selector to trigger the action
   */
  _addDownloadThemeAction (trigger) {
    document.querySelectorAll(trigger).forEach(el => {
      el.addEventListener('click', e => {
        const theme = ThemeUtils.getCustomTheme();
        const themeName = this._slugify(document.querySelector('[name="plume-custom-theme-name"]').value || 'untitled');
        this._saveFile(`plume-theme-${themeName}.css`, theme);        
      });
    });        
  }

  /**
   * Adds Code Mirror feature to a given textarea
   * @param {Element} textarea A selected textarea element
   * @return {Element} A CodeMirror instance
   */
  _initializeCodeMirror (textarea) {
    const CM = CodeMirror.fromTextArea(textarea, {
      mode: 'css',
      readOnly: true,
      lineNumbers: true,
    });

    CM.setSize("100%", "100%"); 
    return CM;   
  }

  /**
   * Slugifies a string
   * @param {String} text Some simple text
   * @return {String} some-simple-text
   */
  _slugify (text) {
    return text
      .toString()                // Cast to string
      .toLowerCase()             // Convert the string to lowercase letters
      .normalize('NFD')          // The normalize() method returns the Unicode Normalization Form of a given string.
      .trim()                    // Remove whitespace from both sides of a string
      .replace(/\s+/g, '-')      // Replace spaces with -
      .replace(/[^\w\-]+/g, '')  // Remove all non-word chars
      .replace(/\-\-+/g, '-');   // Replace multiple - with single -
  }

  /**
   * Triggers the browser API to save data as a file
   * @param {String} name File name
   * @param {String} data Text to save
   * @param {String} type Mime type to transfer 
   */
  _saveFile (name, data, type = "data:attachment/text") {
    if (data !== null && navigator.msSaveBlob) {
      return navigator.msSaveBlob(new Blob([data], { type: type }), name);
    }
    let a = document.createElement('a');
    a.style.diplay = 'none';
    let url = window.URL.createObjectURL(new Blob([data], {type: type}));
    a.setAttribute("href", url);
    a.setAttribute("download", name);
    document.body.append(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  /**
   * Adds all the plume css custom props available on the given holder
   * @param {String} holder Element selector to add the list
   * @return void
   */
  _addCssCustomPropsIndex (holder) {
    holder = document.querySelector(holder);
    this.CSS_CUSTOM_PROPS.forEach(propset => {
      const div = document.createElement('div');
      propset.forEach(prop => {
        const propDiv = Object.assign(document.createElement('div'), {
          innerText: prop.name
        });
        div.append(propDiv);
        holder.append(div);
      });
    });
  }

  /**
   * Reset the application to its original state by reloading page;
   * The action will accour when clicked on the given target
   * @return void
   */
  _addReloadAppBtnEvents (target) {
    document.querySelectorAll(target).forEach(e => {
      e.addEventListener('click', e => {
        e.preventDefault();
        ThemeUtils.reloadApp();
      });
    });
  }

  _addSearchPropBtnEvents (target) {
    target = document.querySelector(target)
    target.addEventListener('input', e => {
      e.preventDefault();
      clearTimeout(target._TYPING);
      this.FORM.style.opacity = '.5';
      target._TYPING = setTimeout(() => {
        this._filterInputsByQuery(target.value);
        this.FORM.style.opacity = '1';
      }, 500);
    });
    target.addEventListener('focus', () => {
      target.setSelectionRange(0, target.value.length);
    });
  }

  _filterInputsByQuery (query) {

    this.FORM.classList.remove('searching');
    this.FORM.querySelectorAll('input.custom-prop-input').forEach(input => {
      input.classList.remove('keep');
      input.parentElement.style.display = 'block';
    });
    this.FORM.querySelectorAll(':scope > div').forEach(holder => {
      holder.style.display = 'block';
    });

    if (query.trim().length) {
      this.FORM.querySelectorAll('input.custom-prop-input').forEach(input => {
        this.FORM.classList.add('searching');
        input.classList.remove('keep');
        input.parentElement.style.display = 'none';
        
        const corpus = [
          input.name,
          input.value,
          input.dataset.prop,
          input.dataset.defaultValue,
          input.parentElement.querySelector('label').innerText
        ];

        if (corpus.join(' ').toUpperCase().indexOf(query.toUpperCase()) > 0) {
          input.classList.add('keep');
          input.parentElement.style.display = 'block';
        }
      });
      this.FORM.querySelectorAll(':scope > div').forEach(holder => {
        if (!holder.querySelectorAll('.keep').length) {
          holder.style.display = 'none';
        }
      });
    }
  }
}