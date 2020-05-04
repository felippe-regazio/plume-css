class URLHandler {

  constructor (options) {
    this.FORM = document.querySelector(options.form);
    this._init();
  }

  _init () {
    this._loadState();
    this._addInputListeners();
  }

  _clearState (error) {
    if (error) {
      console.error(`ERROR: while loading Plume Theme from URL data. Default theme loaded.\nRef: ${error}`);
    }
    window.history.pushState({}, document.title, window.location.href.split('?')[0]);
  }

  _addInputListeners () {
    this.FORM.querySelectorAll('input').forEach(input => {
      ['input', 'keyup', 'blur'].forEach(ev => {
        input.addEventListener(ev, () => {
          this._saveState();
        });
      });
    }); 
  }

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

  _saveState () {
    if (document.querySelector('.not-default')) {
      const themeData = this._serialize(this.FORM);
      const compressed_url = this._compress_str(themeData);
      window.history.pushState({}, document.title, `?${compressed_url}`);
    } else {
      this._clearState();
    }
  }

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

  _serialize (form) {
    let serialized = [];
    this.FORM.querySelectorAll('input.static, input.not-default').forEach(input => {
      serialized.push(encodeURIComponent(input.name) + "=" + encodeURIComponent(input.value));
    });
    return serialized.join('&');
  };  

  _compress_str (str) {
    return LZString.compressToEncodedURIComponent(str);
  }

  _decompress_str (str) {
    return LZString.decompressFromEncodedURIComponent(str);
  }
}