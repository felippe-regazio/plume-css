(function () {

  const STYLE_EDITOR_FORM = document.querySelector('#style-editor form')
  
  const clearState = (error = 'Malformed theme string') => {
    alert(`Error while loading Plume Theme from URL data. The default theme will be used instead. \n\nERROR: ${error}`);
    window.history.pushState({}, document.title, window.location.href.split('?')[0]);
  }

  const saveState = () => {
    const compressed_url = LZString.compressToEncodedURIComponent(serialize(STYLE_EDITOR_FORM));
    window.history.pushState({}, document.title, `?${compressed_url}`);
  }

  // Load state on page load

  try {
    
    let query = window.location.search.slice(1);
    let decompressedQuery = undefined;
    
    if (query && query.length) {
      decompressedQuery = LZString.decompressFromEncodedURIComponent(query);
    }

    if (query && !decompressedQuery) {
      clearState();
    }
    
    if (decompressedQuery) {
      decodeURIComponent(decompressedQuery).split('&')
        .map(pair => {
          return {name: pair.split('=')[0], value: pair.split('=')[1]};
        })
        .forEach(pair => {
          if (pair.name && pair.value) {
            const input = document.querySelector(`input[name="${pair.name}"]`);
            input.value = pair.value;
            input.dispatchEvent(new Event('input'));
          }
        });
      }
    } catch (error) {
      clearState(error);
    }

  // Save state on change an Input

  STYLE_EDITOR_FORM.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
      saveState();
    });
    input.addEventListener('keyup', () => {
      saveState();
    });
    input.addEventListener('blur', () => {
      saveState();
    });    
  });

  // --------------------------------------------

  const serialize = form => {
    let serialized = [];
    form.querySelectorAll('input[name="plume-custom-theme-name"], input[name="plume-custom-theme-wrapper"], input.not-default').forEach(input => {
      serialized.push(encodeURIComponent(input.name) + "=" + encodeURIComponent(input.value));
    });
    return serialized.join('&');
  };
})();
