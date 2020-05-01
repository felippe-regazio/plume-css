(function (root) {

  const renderStyleEditor = target => {

    const rootCustomProperties = getRootCustomProperties('plume');

    rootCustomProperties.map(proplist => {
      const holder = document.createElement('div');
      proplist.forEach(prop => {
        
        const o = Object.assign(document.createElement('option'), {
          value: `var(${prop.name})`
        });
        document.getElementById('propdatalist').append(o);
        
        const p = Object.assign(document.createElement('div'), {
          innerText: prop.name
        });
        p.classList.add('css-custom-property');
        holder.append(p);
      });
      document.getElementById('proplist').append(holder);
    });

    rootCustomPropertiesToInputs(rootCustomProperties).forEach(inputSet => {
      const holder = document.createElement('div');
      inputSet.forEach(input => holder.append(input));
      target.append(holder);
    });
  }  
  
  const getRootCustomProperties = (stylesheetLinkId) => {
    const s = document.getElementById(stylesheetLinkId);
    if (s) {
      return Array.from(s.sheet.rules || s.sheet.cssRules)
      .filter(_rule => _rule.selectorText === ':root')                  // for all :root selectors in plume sheet
      .map(_root => _root.cssText.match(/(?:--[^;]*)/g))                // get --css-custom-props:value list from each :root
      .map(_propset => _propset.map(prop => splitPropNameValue(prop)))  // each pro of each root must be a pair {name: '', value: ''}
    }
  }

  const rootCustomPropertiesToInputs = (rootCustomProperties) => {
    return rootCustomProperties.map(_propset => propsetToInputs(_propset))
  };
  
  const propsetToInputs = _propset => {
    return _propset.map(prop => {
      const field = document.createElement('div');
      field.classList.add('field');
      field.append(createPropLabel(prop.name))
      field.append(createPropInput(prop));
      return field;
    });
  };

  const createPropLabel = innerText => {
    return Object.assign(document.createElement('label'), {
      innerText: normalizePropName(innerText),
      title: innerText
    });
  }

  const createPropInput = prop => {
    let typingTimeout = null;
    let propName = prop.name;
    let propValue = prop.value;

    const propInput = Object.assign(document.createElement('input'), {
      type: 'text',
      name: propName,
      value: propValue
    });

    const paintByValue = value => {
      if (propInput.value){
        propInput.style.borderColor = propInput.value;
      };
    }

    const variablesAutocomplete = value => {
      if (propInput.value.trim().toLowerCase().startsWith('var')) {
        propInput.setAttribute('list', 'propdatalist');
      } else {
        propInput.removeAttribute('list');
      }
    }

    const incDecNumbers = (op) => {
      let n = propInput.value.split(/(\d+)/).filter(v => v ? true : false);
      n = n.map(v => {
        number = Number(v);
        if (number || Number(v) === 0) {
          return op == 'inc' ? number+=1 : (number >= 1 ? number-=1 : number);
        } else {
          return v;
        }
      });
      propInput.value = n.join('');
      updateTheme();
    }

    const updateTheme = () => {
      const defaultValueChanged = (propInput.value !== propInput.dataset.defaultValue);
      propInput.classList[defaultValueChanged ? 'add' : 'remove']('not-default');
      if (propInput.classList.contains('not-default')) {
        setCssProp(propName, propInput.value);
      } else {
        unsetCssProp(propName);
      }
    }

    const tryToHelp = () => {
      paintByValue();
      variablesAutocomplete();
    }
    
    propInput.addEventListener('input', () => {        
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(function () {
        if (propInput.value) {
          tryToHelp();
          updateTheme();
        }
      }, 400);
    });

    propInput.addEventListener('focus', () => {
      propInput.setSelectionRange(0, propInput.value.length)
      tryToHelp();
    });

    propInput.addEventListener('blur', () => {
      if (!propInput.value) {
        propInput.value = propInput.dataset.defaultValue;
      }
      tryToHelp();
      updateTheme();
    });
    
    propInput.addEventListener('keydown', e => {
      const keymap = {
        38:  'inc', // arrow up
        187: 'inc', // + key
        40:  'dec', // arrow down
        189: 'dec', // - key
      };
      if (keymap[e.keyCode]) {
        incDecNumbers(keymap[e.keyCode]);
      }
    });

    propInput.dataset.defaultValue = propValue;
    propInput.dataset.prop = JSON.stringify(prop);
    propInput.style.borderColor = propInput.value;
    
    return propInput;
  }

  const splitPropNameValue = propStr => {
    const p = propStr.split(':');
    return ({ name: p[0], value: p[1].replace(';', '') });
  }
    
  const setCssProp = (propName, propValue) => {
    document.documentElement.style.setProperty(propName, propValue);
  }

  const unsetCssProp = propName => {
    document.documentElement.style.removeProperty(propName);
  }  

  const normalizePropName = propName => {
    const prefix = propName.match(/(?:--[^-]*)/g);
    return propName.replace(prefix, '').split('-').join(' ');
  }

  const getTheme = () => {
    const wrapper = document.querySelector('[name="plume-custom-theme-scope"]').value || ':root';
    return `${wrapper} { ${document.documentElement.style.cssText} }`;
  }

  const CM = CodeMirror.fromTextArea(document.getElementById('custom-theme-code-mirror'), {
    mode: 'css',
    readOnly: true,
    lineNumbers: true,
  });
  CM.setSize("100%", "100%");

  root.showCustomThemeSource = () => {
    let theme = cssbeautify(getTheme(), {
      indent: '  ',
      autosemicolon: true
    });
    console.log(theme.indexOf('--pm-'));
    if (theme.indexOf('--pm-') < 0) {
      theme = "/* You didn't modified any default property. */";
    }
    CM.setValue(theme);
    CM.refresh();
  } 

  // -------------------------------------------------------------------------
  
  renderStyleEditor(document.querySelector('#theme-editor form')); 

})(window);