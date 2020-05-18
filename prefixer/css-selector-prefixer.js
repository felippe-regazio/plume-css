/**
 * CSS Selector Prefixer
 * 
 * Static class to prefix CSS selectors (not attributes). This means that you can scope an entire 
 * css style sheet. This class transforms .class-names, data-attributes, attr(data-attributes), 
 * --custom-properties, [class*="class"] and [class^="class"] into prefixed versions: .prefix-class-names, 
 * data-prefix-attributes, attr(data-prefix-attributes), --prefix-custom-properties, [class*="prefix-class"]
 * and [class^="prefix-class"].
 * 
 * Formal Notation:
 * SelectorPrefixer.prefix(String:cssText, Object:options) : String;
 * 
 * Options can be:
 * 
 * {
 *    prefix: 'prefix-',
 *    ignore: ['.class-to-ignore', '[data-some-attribute], [class*='this-selector']'],
 *    ids: true, // set to false to not prefix ids
 *    classes: true, // set to false to not prefix classes
 *    dataAttrs: true, // set to false to not prefix [data-attr]
 *    pseudoAttrs: true, // set to false to not prefix attr(data-attr)
 *    customProps: true, // set to false no top prefix --custom-props
 *    classesWildcards: true, // set to false to not prefix [class*="class"] notation
 *    classesCircumflex: true, // set to false to not prefix [class^="class"] notation
 * }
 * 
 * @author Felippe Regazio 
 * @License GNU Public License (GPL) 
 */
module.exports = class {
  
  static prefix (cssText, options) {
    
    const prefix = options.prefix;
    const allSelectors = this._extractSelectorsFrom(cssText);
    const selectors = this._removeIgnored(allSelectors, options.ignore);

    const _enum = {
      ids: '_prefixIds',
      classes: '_prefixClass',
      dataAttrs: '_prefixDataAttr',
      pseudoAttrs: '_prefixPseudoAttr',
      customProps: '_prefixCustomProp',
      classesWildcards: '_prefixSelectorQuery',
      classesCircumflex: '_prefixSelectorQuery',
    }

    Object.keys(_enum).forEach(key => {
      if (options[key] !== false) {
        cssText = this._prefixAll(prefix, cssText, selectors[key], _enum[key]);
      }
    });
    
    return cssText;
  }

  static _unique (array) {
    return array ? array.filter( (item, index) => array.indexOf(item) === index ) : [];
  }

  static _escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  /**
   * Extractors section. These functions extracts selectors
   * from the given CSS Text by using RegExp. Return Arrays.
   * Useful to now that (?![^{]*}) means anything outside {}.
   */

  static _extractIds (cssText) {
    return this._unique(cssText.match(/(\#([a-zA-Z_-]{1}[\w-_]+))(?![^{]*})/g));
  }

  static _extractClasses (cssText) {
    return this._unique(cssText.match(/(\.([a-zA-Z_-]{1}[\w-_]+))(?![^{]*})/g));
  }

  static _extractDataAttrs (cssText) {
    return this._unique(cssText.match(/\[data-(?![^{]*})(.*?)\]/g));
  }

  static _extractPseudoAttrs (cssText) {
    return this._unique(cssText.match(/attr\(data-(.*?)(\))/g));
  }

  static _extractCustomProps (cssText) {
    return this._unique(cssText.match(/(--)(.*?)(?=:|\))/g));
  }

  static _extractClassesWildcards (cssText) {
    return this._unique(cssText.match(/\[class\*\=(?![^{]*})(.*?)\]/g));
  }

  static _extractClassesCircumflex (cssText) {
    return this._unique(cssText.match(/\[class\^\=(?![^{]*})(.*?)\]/g));
  }

  /**
   * Single prefixers. These functions receives a prefix and a
   * selector, returns the  prefixed version of the selector
   */

  static _prefixIds (prefix, idName) {
    return `#${prefix+idName.substr(1)}`;
  }  

  static _prefixClass (prefix, className) {
    return `.${prefix+className.substr(1)}`;
  }

  static _prefixDataAttr (prefix, dataName) {
    return dataName.replace('[data-', `[data-${prefix}`);
  }

  static _prefixPseudoAttr (prefix, attrName) {
    return attrName.replace('attr(data-', `attr(data-${prefix}`);
  }

  static _prefixCustomProp (prefix, propName) {
    return `--${prefix+propName.substr(2)}`;
  }

  static _prefixSelectorQuery (prefix, query) {
    const str = query.replace(/\[|class|\*\=|^=|\'|\`|\"|\]/g, "");
    return query.replace(str, prefix+str);
  }

  /** ---------------------------------------------------- */

  static _prefixAll (prefix, text, terms, prefixer) {
    terms.forEach(term => {
      const reg = new RegExp(this._escapeRegExp(term), "g");
      const newName = this[prefixer](prefix, term);
      text = text.replace(reg, newName);
    });
    return text;
  }

  static _extractSelectorsFrom (cssText) {
    return {
      ids: this._extractIds(cssText),
      classes: this._extractClasses(cssText),
      dataAttrs: this._extractDataAttrs(cssText),
      pseudoAttrs: this._extractPseudoAttrs(cssText),
      customProps: this._extractCustomProps(cssText),
      classesWildcards: this._extractClassesWildcards(cssText),
      classesCircumflex: this._extractClassesCircumflex(cssText),
    }
  }

  static _removeIgnored (selectors, ignore) {
    if (ignore && ignore.length) {
      Object.keys(selectors).forEach(key => {
        selectors[key] = selectors[key].filter(item => !ignore.includes(item));
      });
    };
    return selectors;
  }
}