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
      themeURL: 'A4GwrgtgpgtAxmAzgFwPYRsgFlaMB2AhtALwAiUAZoWCMgKQBMADGYQE4DWAZKJLAhTpMOPIjipgUEvQDMAQXapUybjBjAMhYMBiIw7anAGoQqdjJZNZjW2o1admKAA9k8U+cvNrlP0A'
    },
    {
      name: 'Accessible Theme',
      description: 'Accessibility-first Theme',
      palette: {
        primary: '#00819d',
        secondary: '#c03ae9',
        surface: 'transparent',
        text: '#333',
      },
      themeURL: 'A4GwrgtgpgtAxmAzgFwPYRsgFlaMB2AhtALwCCccUiiAlgEYhQCkATAAwAqO0AZKJFgIU6TD1iI4qYFBLMAzGQBOqVMl4wYwDMCW0IhJQE94qEKiVzW89uwAcARgCcAEw1aMhYMBj1CiWAAzVHxkGDoAL1lWABZgAA93bRgvHxBafFgcWgBzLGQSViSMejBkNHwYYNDw2iiSBzsE4t8yipgIDJhsvIKAVgA2Zs1k0vKQmBUwfBcoF1r6weGPLRBCKiwzWaVTc0s2eTsjlsDaKBAXALD6C22YAHdaF2xC5eSM4DLuqFz8kiXEiMMB8vjclHclIQXLQkCQ4oCViDrrcoDtHs8sK8EclIdDUCkZvAcHAANY3eILaJNbEYNA5HJMSkkeSsBJAA'
    },
    {
      name: 'Sweet Carnival',
      description: 'A pastel semi rounded theme',
      palette: {
        primary: '#90d2d8',
        secondary: '#f6a6b2',
        surface: 'transparent',
        text: '#555'
      },
      themeURL: 'A4GwrgtgpgtAxmAzgFwPYRsgFlaMB2AhtALwDKA7lFMgKQBMADAMKEBO+AlgG6EgBkoSLAQp0mHHkRxUwKCVoBmAIJtUqZPxgxgGYG04R2AT3ioQqNgvqKAnIwAm9BwA4tOjIigz8Dk2YsrBkUAMwA2QjCAI3p3XQDLGEQwODgoRERrO1tU21s4jBlAmCg2NSCbEJCAdhqQgoS2GAp2LnwAcyyqp1qGwmBgJLA2EMI0xpJkNkJ8RGB2KHxNbXj+wfa1MF8JqZm5haW+gcwoAA9kCeCAVhuGqLBkNHwYCE5nnE52rGQSABYXYCnO4PJ4wKKWBylGDTBycJAkehXQENN7AB4wD5fH7-ZErDCo9HgtiQpowuGZACMv0BDEYjAa+hEqEhYIhULJ8KpNKY9LxOjYTJZUTGAGsNqgtg5LjZIg4og56nzGdLFKrFEA'
    },
    {
      name: 'Dark Blue Ocean',
      description: 'A blue rounded theme',
      palette: {
        primary: '#00c2c7',
        secondary: '#00719c',
        surface: '#011f4b',
        text: '#fff'
      },
      themeURL: 'A4GwrgtgpgtAxmAzgFwPYRsgFlaMB2AhtALwAihATgNYCkATAAwBC4UDjA8nFIfgGShIsBCnSYceRHFTAoJWgGYAgpVSpk-GDGAZglAJYQqAT3ioQqSgvqLGjOPTgB2LToyIoM-ABNT5y2sGO0ZnAEYATjg3XRhCYGAYRDBKADNCHgCrGzswsNSAFgAjGIx4xOQoAA9kLKDbVMbSmCKwZDR8GAgDToB3Ax9sEjCAVgA2YCrm1vbUTqKrHyhKGEpCHwMkEnoRyem2jpgQKHblpOAMnoBzYb3tWJnDypqddY38G6csZtAMqCwLEsVjJAjl0uDCM0esA2jAcAYrlhkCQChMpvcMNDYQtKECksgTMcSPg5lAofgYbUcXi1hstjs7u4YFiqYsziDspQrkVCAAKJiMBgAYQFwtF9CFADoxgBKH6UESoJYtNkrWmbRDbXbopn6RXKnlwahXNRgXx1HKMPKFEoYnQK14+d43MJojj0AqTIA'
    },
    {
      name: 'Skinny Theme',
      description: 'A blue light theme',
      palette: {
        primary: '#42d4d5',
        secondary: '#bcedfe',
        surface: 'transparent',
        text: 'transparent',
      },
      themeURL: 'A4GwrgtgpgtAxmAzgFwPYRsgFlaMB2AhtALwDKA1gJb74CeApAEwAMAKjtAGSiSwIp0mTrERxUwKCQYBmAIIAnVKmRcYMYBmAKqEQgrrxUIVAulMZAFiYATSzYCsajRkRRx+G-sPiTZ5jIARnBQNgBmUM6aMITAwDCIYAphhCFGfiTICoT4iMD6UPiq6tGx8QDmSmCe6aaZ2bn5CoXFLjBYAIwwYahFMADuUFTlWMgkliwsURhYTN29yANDI2MTUyUzMvN9g8Oj45PT7Zbbi7srB+ttWA6nS3urhxvtAGx35-trRzTAYIuBphsUAUMGyNioSHGwAAHt98L9-oDgQMqDZsCQOjCgA+G-sPiTZhiwAnMwyAEZwUDYAZlDOmjCEwMAwiGAKUYQRRn4kyAqE+IjA+lD4qurxickA5kpgntmmufmFxQql5S4wWACMMFGoZTAA7lBU1VjIJJYsLHEYWEz9g8gjYxNTM3MVCzLLQ6Pjk9Oz892W+6uHGyfbXVgOl2tHm6c73QBsT9fHW2c0wDAq1CphsUAUMHyNioSGmwAAHv98IDgaDwSMqDZsCQegigA'
    },
    {
      name: 'Black & White',
      description: 'The beautiful basic',
      palette: {
        primary: '#000000',
        secondary: '#f0f0f0',
        surface: 'transparent',
        text: '#333'
      },
      themeURL: 'A4GwrgtgpgtAxmAzgFwPYRsgFlaMB2AhtALwBCIhcA1gKQBMADAGSiSwIrqY56JypgUErQDMAQQBOqVMmYwYwDADNU+ZDGXEAliACeMRFAH4AJoUl6SACSggAblGTa4hAHJQwUBgGFbDpxdCBkYPL19-R2dXXyltQhBfREJ8REMoSW1leUUMYEyICwMBEFRJEXpRRmqanKV0k3NLeFRS8oZRZUYurrqMErLDMDg4KERECqqAFgAOACMpub6YQmBgIcktUZa2kmRJFMRgCyh1ZdX1gHNpMDMdsr2D1OPJU7kFermwZDR8BrUmgZkFAAB4aAbtSpTaHLbT4YDfGA4bSXLDIEizYAgoA'
    }
  ];

  // ---------------------------------------------------------------------------------

  const LIST_HOLDER = document.querySelector('#premade-themes .premade-themes-list');

  PREMADE_THEMES.forEach(function (theme) {
    const themeItem = document.createElement('li');
    const themeItemContent = `
      <a href="?${theme.themeURL}">
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