(function () {
  const propset = ThemeUtils.getCustomPropsFromStyleSheet('plume', ':root');

  new ThemeEditor({
    propset: propset, 
    form: '#theme-editor form',
  });

  new URLHandler({
    form: '#theme-editor form'
  });
})();