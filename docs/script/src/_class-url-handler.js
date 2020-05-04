class URLHandler {

  /**
   * This class implements the state track of the form/theme through URL
   * options: {form: '#target-form-selector'}
   * @param {options} options A set of constructor options
   */
  constructor (options) {
    this.FORM = document.querySelector(options.form);
    this._init();
  }

  /**
   * Starts to track the form state and save on URL
   * @return void
   */
  _init () {
    this._loadState();
    this._addInputListeners();
  }

  /**
   * Clears the theme and URL to original state
   * @param {String} warn Optional parameter with error message to console
   * @return void
   */
  _clearState (warn) {
    if (warn) {
      console.warning(`WARN: A problem occurred while loading Plume Theme from URL data. Default theme loaded.\nError Ref: ${warn}`);
    }
    window.history.pushState({}, document.title, window.location.href.split('?')[0]);
  }

  /**
   * Listen to some input events in order to save theme state
   * @return void
   */
  _addInputListeners () {
    this.FORM.querySelectorAll('input').forEach(input => {
      ['input', 'keyup', 'blur'].forEach(ev => {
        input.addEventListener(ev, () => {
          this._saveState();
        });
      });
    }); 
  }

  /**
   * Reads the URL query data, decompress and loads to form
   * @return void
   */
  _loadState () {
    try {
      let query = window.location.search.slice(1);
      if (query && query.length) {
        let decompressedQuery = this._decompress_str(query);
        decompressedQuery ? this._loadFormData(decompressedQuery) : this._clearState('Malformed theme string');
      }
    } catch (error) {
      _clearState(error);
    }
  }  

  /**
   * Serializes the form data, compress and save on URL query
   * @return void
   */
  _saveState () {
    if (document.querySelector('.not-default')) {
      const themeData = this._serialize(this.FORM);
      const compressed_url = this._compress_str(themeData);
      window.history.pushState({}, document.title, `?${compressed_url}`);
    } else {
      this._clearState();
    }
  }

  /**
   * Loads an URL query string to form
   * @param {String} decompressedQuery A URL query string decompressed
   */
  _loadFormData (decompressedQuery) {
    decodeURIComponent(decompressedQuery).split('&')
      .map(pair => {
        return {name: pair.split('=')[0], value: pair.split('=')[1]};
      })
      .forEach(pair => {
        if (pair.name && pair.value) {
          const input = this.FORM.querySelector(`input[name="${pair.name}"]`);
          input.value = pair.value;
          input.dispatchEvent(new Event('input'));
        }
      });    
  }

  /**
   * Serializes a form as a Query String
   * @param {Element} form A form element
   * @return Serialized form as query string
   */
  _serialize (form) {
    let serialized = [];
    this.FORM.querySelectorAll('input.static, input.not-default').forEach(input => {
      serialized.push(encodeURIComponent(input.name) + "=" + encodeURIComponent(input.value));
    });
    return serialized.join('&');
  };  

  /**
   * Compress a String
   * @param {String} str Any string
   */
  _compress_str (str) {
    return LZString.compressToEncodedURIComponent(str);
  }

  /**
   * Decompress a String
   * @param {String} str Any string
   */
  _decompress_str (str) {
    return LZString.decompressFromEncodedURIComponent(str);
  }
}