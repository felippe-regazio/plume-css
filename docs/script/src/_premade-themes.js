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
      themeURL: 'A4GwrgtgpgtAxmAzgFwPYRsgFlaMB2AhtALwCCccUiiAlgEYhQCkATAAwAqO0AZKJFgIU6TD1iI4qYFBLMAzGQBOqVMl4wYwDMCW0IhJQE94qEKiVzW89uwAcARgCcAEw1aMhYMBj1CiWAAzVHxkGDoAL1lWABZgAA93bRgvHxBafFgcWgBzLGQSViTPb1NQwgyoJRgDeJgAd1oXbBIHBxi7BOLfMGQ0fBhg0PDaKNbOxM1k+l7+moyYbLyCgFYANi6pjBm+kN8LFyqGppb5TY8e3YGVMHxDlxGx9fPk0EIqLDND6qlzSzZ5HYgd1ArQoCAXAEwvQDkdGs0sCQzpMLqDwZCoNDYT8zBYrPIAOxE7oZYC9RZQXL5EjPFHJUnkmFKb4wJSEFy0JAkOJ0jAMrHMuEnRHIkn4MkClm-PEAokEsUS8KNZBwLCPWTyDa8mD8pW0FVqpks+GnBJAA'
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
      themeURL: 'A4GwrgtgpgtAxmAzgFwPYRsgFlaMB2AhtALwDKA7lFMgKQBMADAMKEBO+AlgG6EgBkoSLAQp0mHHkRxUwKCVoBmAIJtUqZPxgxgGAGap8yGHuKcQATxiIoM-ABN2FkgAkoIbjU5xCAOShgUAzMbh5ePgyM-oHBoZ7I3oTBqpx8wYiE+IjWUGycelo6GMB5EE7wqCCobAr0igCcjPb09gAchbo5do5sVjJVNQyKegBshCMARvQdGP3V1mBwcFCIiLUN9Uv19TMVAzC5aoN1enoA7OcF2p1zbDAU7Fz4AObrp80Xu4TAwAtspss9tUSMg2JlEMB2FAjF8fjBnmowA4gTVQeDIWxoZprhhvr9kFAAB7GW7rACsFN2IE4+AA1pgicZ7LZqoQEoYSEjmWxqfgoLsJmBkGh8DAIDSYDhOM8sMgSAAWVrAQkCoUimATarcmBg+ycJAkehk5W7GnAIWSqDS2UKpUqnEwM0WzVsbW6-VrACM8uVkUYpvw5uMiAonGQcCw1k4AC95PQ7bsSiJUMyNVrcjrCHqDd7fUx-Q6kxVUxNCHBaQjUFyUetxvYJvYrkUdJia0NFB2gA'
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
      themeURL: 'A4GwrgtgpgtAxmAzgFwPYRsgFlaMB2AhtALwAihATgNYCkATAAwBC4UDjA8nFIfgGShIsBCnSYceRHFTAoJWgGYAgpVSpk-GDGAZglAJYQqAT3ioQqSgvqLGjOPTgB2LToyIoM-ABNT5y2sGO0ZnAEYATjg3XRhCYGAYRDBKADNCHgCrGzswsNSAFgAjGIx4xOQoAA9kLKDbVMbSmCKwZDR8GAgDToB3Ax9sEjCAVgA2YCrm1vbUTqKrHyhKGEpCHwMkEnoRyebQDKgsCyWVmUCc9KvCZp7gNpgcAwBzLGQSAomp7Vi7h4XKKcksgTCB5Pg5lBbvh7rUAUC1hstjs9j8MH84YtlnUSJRnkVCAAKJiMBgAYRJ5Mp9DJADoxgBKfaUESoJYtLErRGbRDbXbfdw6FnmdkEuDUZ5qMC+HHBRh5QolNFC2DAdYbfDPYZfDj0AqTIA'
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
      themeURL: 'A4GwrgtgpgtAxmAzgFwPYRsgFlaMB2AhtALwDKA1gJb74CeApAEwAMAKjtAGSiSwIp0mTrERxUwKCQYBmAIIAnVKmRcYMYBmAKqEQgrrxUIVAulMZAFiYATSzYCsajRkRRx+G-sPiTZ5jIARnBQNgBmUM6aMITAwDCIYAphhCFGfiTICoT4iMD6UPiq6tGx8QDmSmCe6aaZ2bn5CoXFLjB6ChQwgaY2UAow2TZUSCQswAAeURiBYMho+N29-YOEw6PjUyUYNMBzSwp9A0MjiGOT0zC7+z2HKwDuVDbYJACMF9sazUZ9B0er6zOmyAA'
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
      themeURL: 'A4GwrgtgpgtAxmAzgFwPYRsgFlaMB2AhtALwBCIhcA1gKQBMADAGSiSwIrqY56JypgUErQDMAQQBOqVMmYwYwDADNU+ZDGXEAliACeMRFAH4AJoUl6SACSggAblGTa4hAHJQwUBgGFbDpxdCBkYPL19-R2dXXyltQhBfREJ8REMoSW1leUUMYEyICwMBEFRJEXpRRmqanKV0k3NLeFRS8oZRZUYurrqMErLDMDg4KERECqqAFgAOACMpub6YQmBgIcktUZa2kmRJFMRgCyh1ZdX1gHNpMDMdsr2D1OPJU7kFesLJahg5stMMjADqZtEgSIxgAAPZZzMDIND4BpqJoGZBQSEaAbtSpTXEwuEI37-QHA0ETCHQj4YbT4YBwmA4bSXLDIEizKHLGl0jR-SQAyRAwggsEUzm0+mIADu2mQcCwhm0AC9hPQAGwcqmKV4tAFEvkkoVk8FQoA'
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