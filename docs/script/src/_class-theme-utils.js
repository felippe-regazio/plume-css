class ThemeUtils {
  
  /**
   * Return a stylesheet tag <link> as a CSS Array
   * @param {String} id A <link> tag id
   * @param {String} filter Filter by specific selector
   * @return {Array} A CSS sheet as array or undefined
   */
  static getStyleSheetArray (id, filter) {
    let tag = document.getElementById(id);
    let sheet = tag ? Array.from(tag.sheet.rules || tag.sheet.cssRules) : undefined;
    if (sheet && filter) {
      sheet = this.filterBySelector(filter, sheet);
    }
    return sheet;
  }

  /**
   * Filter a given stylesheet array by a given selector 
   * @param {String} Selector A valid selector 
   * @param {Array} sheet A stylesheet array 
   * @return {Array} A filtered stylesheet array
   */
  static filterBySelector (selector, sheet) {
    return sheet.length ? sheet
      .filter(rule => rule.selectorText === selector) : undefined
  }

  /**
   * Extracts CSS custom props from a given String
   * @param {String} str a css string to stract custom props
   * @return {Object} Custom props as {name: '', value: ''}
   */
  static getCustomPropsFromStr (str) {

    const splitPropNameValue = propStr => {
      const p = propStr.split(':');
      return ({ name: p[0], value: p[1].replace(';', '') })
    }

    return str.match(/(?:--[^;]*)/g)
      .map(prop => splitPropNameValue(prop))
  }

  /**
   * Extract custom properties from a <link> tag by a given scope
   * @param {String} id Id of the <link> element to stract props
   * @param {String} scope Scope from where stract props
   * @return {Array} Nested Array of Custom Props Objects like 
   * [[{name: '', value: ''}, ...], [{name: '', value: ''} ...]]
   */
  static getCustomPropsFromStyleSheet (id, scope = ':root') {
    return this.getStyleSheetArray(id, scope)
      .map(rule => this.getCustomPropsFromStr(rule.cssText));
  }
  
  /**
   * Returns the current custom theme source code
   * @param {Boolean} beautify Beautify the code or not
   */
  static getCustomTheme (beautify = true) {
    let wrapper = document.querySelector('[name="plume-custom-theme-scope"]').value || ':root';
    let theme = document.documentElement.style.cssText;
    
    if (theme.indexOf('--pm-') < 0) {
      theme = "/* You didn't modified any default property. */";
    } else if (beautify) {
      theme = cssbeautify(`${wrapper} { ${theme} }`, {
        indent: '  ',
        autosemicolon: true
      });
    }

    return theme;
  }

  /**
   * Reset theme state by reloading the page withou query string,
   * @return void
   */
  static reloadApp () {
    window.history.pushState({}, document.title, window.location.href.split('?')[0]);
    window.location.reload();
  }
}