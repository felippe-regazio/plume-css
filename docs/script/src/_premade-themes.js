(function () {

  const PREMADE_THEMES = [
    {
      name: 'Default Dark',
      description: 'Plume\'s default dark theme',
      palette: {
        primary:'#33b5e5',
        secondary:'#c03ae9',
        surface:'#222',
        text:'#fff'
      },
      urlQuery: 'A4GwrgtgpgtAxmAzgFwPYRsgFlaMB2AhtALwAiUAZoWCMgKQBMADGYQE4DWAZKJLAhTpMOPIjipgUEvQDMAQXapUybjBjAMhYMBiIw7anAGoQqdjJZNZjW2o1admKAA9k8U+cvNrlP0A'
    },
    {
      name: 'Sweet Carnival',
      description: 'A pastel rounded theme',
      palette: {
        primary: '#90d2d8',
        secondary: '#f6a6b2',
        surface: 'transparent',
        text: '#555'
      },
      urlQuery: 'A4GwrgtgpgtAxmAzgFwPYRsgFlaMB2AhtALwDKA7lFMgKQBMADAMKEBO+AlgG6EgBkoSLAQp0mHHkRxUwKCVoBmAIJtUqZPxgxgGYG04R2AT3ioQqNgvqKAnIwAm9BwA4tOjIigz8Dk2YsrBkUAMwA2QjCAI3p3XQDLGEQwODgoRERrO1tU21s4jBlAmCg2NSCbEJCAdhqQgoS2GAp2LnwAcyyqp1qGwmBgJLA2EMI0xpJkNkJ8RGB2KHxNbXj+wfa1MF8JqZm5haW+gcwoAA9kCeCAVhuGqLBkNHwYCE5nnE52rGQSABYXYCnO4PJ4wKKWBylGDTBycJAkehXQENN7AB4wD5fH7-ZErDCo9HgtiQpowuGZACMv0BDEYjAa+hEqEhYIhULJ8KpNKY9LxOjYTJZUTGAGsNqgtg5LjZIg4og56nzGdLFKrFEA'
    }
  ];

  // ---------------------------------------------------------------------------------

  const LIST_HOLDER = document.querySelector('#premade-themes .premade-themes-list');

  PREMADE_THEMES.forEach(function (theme) {
    const themeItem = document.createElement('li');
    const themeItemContent = `
      <a href="?${theme.urlQuery}">
        <span class="custom-theme-list-item__name">${theme.name}</span>
        <span class="custom-theme-list-item__description">${theme.description}</span>
        <span class="custom-theme-list-item__palette">
          ${
            Array.from(Object.keys(theme.palette).map(key => {
              return `<span title="${key} color" class="color-${key}" style="background-color:${theme.palette[key]}"></span>`
            })).join('')
          }
        </span>
      </a>
    `
    themeItem.insertAdjacentHTML('beforeend', themeItemContent);
    themeItem.classList.add('custom-theme-list-item');
    LIST_HOLDER.append(themeItem);
  });
  
})();