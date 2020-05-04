class PropInput {
  
  constructor (prop) {
    return this._wrappedInput(prop);
  }

  // -------------------------------------------

  /**
   * Convert the given prop object to a labeled field wrapped input
   * @param {Object} prop A css custom property like {name: '', value: ''}
   * @return {Element} Field element containing labeled prop input
   */
  _wrappedInput (prop) {
    const input = this._input(prop);
    return this._wrap(input);
  }

  /**
   * Creates a custom prop input that has full features to edit this prop
   * @param {Object} prop A css custom property like {name: '', value: ''}
   * @return {Element} A full featured custom prop input editor
   */
  _input (prop) {
    const input = Object.assign(document.createElement('input'), {
      name: prop.name,
      value: prop.value,
    });
    
    input.dataset.defaultValue = prop.value;
    input.dataset.prop = JSON.stringify(prop);

    ['input', 'focus', 'blur', 'keydown'].forEach(ev => {
      input.addEventListener(ev, e => this[`on_${ev}`](e));
    });

    input.dispatchEvent(new Event('input'));
    return input;
  }

  /**
   * Add a div.field and label to the given input
   * @param {Element} input An input element
   * @return {Element} The wrapped input
   */
  _wrap (input) {
    const field = document.createElement('field');
    field.classList.add('field');
    
    const label = document.createElement('label');
    label.innerText = this._normalizePropName(input.name);
    label.title = input.name;

    [label, input].forEach(el => field.append(el));
    return field;
  }

  /**
   * Normalizes css custom properties names like
   * --my-custom-prop becomes "my custom prop"
   * @param {String} propName A Css Custom property name
   * @return {String} Normalized name
   */
  _normalizePropName (propName) {
    const prefix = propName.match(/(?:--[^-]*)/g);
    return propName.replace(prefix, '').split('-').join(' ');
  }

  // -------------------------------------------

  /**
   * Input Binded Event
   * @param {Event} event 
   * @return void
   */
  on_input (event) {
    const input = event.target;
    this._updateBorderColor(input);
    this._updateTheme(input);
  }

  /**
   * Input Binded Event
   * @param {Event} event 
   * @return void
   */  
  on_focus (event) {
    const input = event.target;
    input.dataset.currentValue = input.value;
    input.setSelectionRange(0, input.value.length);
  }

  /**
   * Input Binded Event
   * @param {Event} event 
   * @return void
   */  
  on_blur (event) {
    const input = event.target;
    input.removeAttribute('list');
    this._updateDatalist(input);
    input.removeAttribute('data-current-value');
  }

  /**
   * Input Binded Event
   * @param {Event} event 
   * @return void
   */  
  on_keydown (event) {
    const input = event.target;
    input.setAttribute('list', 'theme-editor-datalist');

    const keymap = {
      38:  'inc', // arrow up
      187: 'inc', // + key
      40:  'dec', // arrow down
      189: 'dec', // - key
    };

    if (event.keyCode === 27) {
      input.value = input.dataset.currentValue;
    }

    if (keymap[event.keyCode]) {
      this._increaseDecreaseNumbers(input, keymap[event.keyCode]);
    }
    
    this._updateTheme(input);
  }

  // -------------------------------------------

  /**
   * Updates the current theme based on the input changes
   * @param {Element} input Source of the update event
   * @return void
   */  
  _updateTheme (input) {
    clearTimeout(input._typing);
    
    const defaultValueChanged = (input.value !== input.dataset.defaultValue);
    input.classList[defaultValueChanged ? 'add' : 'remove']('not-default');
    
    input._typing = setTimeout(() => {
      if (input.classList.contains('not-default')) {
        this.setCssProp(input.name, input.value);
      } else {
        this.unsetCssProp(input.name);
      }
    }, 100);    
  }

  /**
   * Check if a given string is a valid CSS Color
   * @param {String} str Some string (maybe a color)
   * @return {Boolean} If is a valid CSS Color or not
   */
  _isCssColor (str) {
    let s = new Option().style;
    s.color = str;
    return !!s.color;
  }

  /**
   * If an input value is a color, applies it as its own border color
   * @param {Element} input An input element
   * @return void
   */
  _updateBorderColor (input) {
    const value = input.value;

    if (value && (value.startsWith('var(--') || this._isCssColor(value))) {
      input.style.borderColor = value;
    } else {
      input.style.borderColor = "#aaaaaa";
    }
  }

  /**
   * Updates the global datalist with the current input value
   * @param {Element} input An input element
   * @return void
   */
  _updateDatalist (input) {
    const dataList = document.querySelector('#theme-editor form datalist');
    if (!dataList.optionsIndex.includes(input.value)) {
      dataList.addOption(input.value);
    }
  }

  /**
   * Increase or decrease the value of all numbers in a string
   * @param {Element} input An input element
   * @param {String} operation The operation: inc (increase) or dec (decrease)
   */
  _increaseDecreaseNumbers (input, operation) {
    let n = input.value.split(/(\d+)/).filter(v => v ? true : false);
    
    n = n.map(v => {
      let number = Number(v);
      if (number || Number(v) === 0) {
        return operation == 'inc' ? number+=1 : (number >= 1 ? number-=1 : number);
      } else {
        return v;
      }
    });

    input.value = n.join('');
    
    if (input.value.startsWith('#') && input.value.length > 7) {
      input.value = input.value.substring(0, 7);
    }
  }  

  /**
   * Sets a custom Css Prop on the document root
   * @param {String} propName property name
   * @param {String} propValue Property value
   * @return void
   */
  setCssProp (propName, propValue) {
    document.documentElement.style.setProperty(propName, propValue);
  }

  /**
   * Unset a custom Css Prop on the document root
   * @param {String} propName property name
   * @return void
   */
  unsetCssProp (propName) {
    document.documentElement.style.removeProperty(propName);
  }  
}