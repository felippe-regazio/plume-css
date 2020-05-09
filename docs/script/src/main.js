(function () {
  
  const propset = ThemeUtils.getCustomPropsFromStyleSheet('plume', ':root');

  new ThemeEditor({
    propset: propset, 
    form: '#theme-editor form',
  });

  new URLHandler({
    form: '#theme-editor form'
  });

  new ToggleSource({
    trigger: '#toggle-source',
    targets: '[data-toggle-source] .el-ac-content',
  });  

})();