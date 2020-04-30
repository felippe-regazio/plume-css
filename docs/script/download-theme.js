(function () {
  
  document.querySelectorAll('.download-css').forEach(el => {
    el.addEventListener('click', () => {
      let theme = cssbeautify(getTheme(), {
        indent: '  ',
        autosemicolon: true
      });
      if (!theme.indexOf('--pm-') < 0) {
        theme = "/* You didn't modified any default property. */";
      }
      const themeName = slugify(document.querySelector('[name="plume-custom-theme-name"]').value || 'untitled');
      saveFile("data:attachment/text", theme, `plume-theme-${themeName}.css`);
    });
  });

  const slugify = text => {
    return text
      .toString()                // Cast to string
      .toLowerCase()             // Convert the string to lowercase letters
      .normalize('NFD')          // The normalize() method returns the Unicode Normalization Form of a given string.
      .trim()                    // Remove whitespace from both sides of a string
      .replace(/\s+/g, '-')      // Replace spaces with -
      .replace(/[^\w\-]+/g, '')  // Remove all non-word chars
      .replace(/\-\-+/g, '-');   // Replace multiple - with single -
  }

  const saveFile = (type, data, name) => {
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

  const getTheme = () => {
    const wrapper = document.querySelector('[name="plume-custom-theme-wrapper"]').value || ':root';
    return `${wrapper} { ${document.documentElement.style.cssText} }`;
  }
})();