# Plume CSS

UNDER CONSTRUCTION - PLEASE DONT USE IT YET

Welcome to Plume CSS, a lightweight and highly themeable CSS Micro-Framework. No JS, no Dependencies. This is the Plume's repository and technical documentation. If you want to know exactly what Plume is, what it does and its main characteristics, please visit: https://felippe-regazio.github.io/plume-css/. For usage and technical information, please follow the README:

# Installing

With NPM

```bash
npm install plume-css
```

With Yarn

```bash
yarn add plume-css
```

Then on your app

```javascript
import 'plume-css'
```

### Browser Instalation

Clone or download this repository, or download the dist package on the github page.  
Now just add it on your page:

```html
<link rel="stylesheet" href="plume-css/lib/plume-all.css">
```

# Getting Started

Since Plume is scoped, after installing it, you must add the `plume` class on a wrapper div to apply local styles, or add it on the `body` tag to style the entire page. You can also add the `pm-container` class to have a containerized wrapper.

```html
  <!-- apply styles to entire document -->
  <body class="plume"> ... </body>  
  
  <!-- wrapper with plume local style -->
  <div class="plume"> ... </div>
```

# Loading Modules

When you load `plume-all.css` or `import 'plume-all'`, you bring the entire Plume lib to your app. Thats ok since the complete lib has only 5kb gziped. But you may want to load only some modules, as Buttons, or Form styles for example. You just need to load the `plume-core` module, then load the modules you want:

```javascript
import 'plume-css/lib/plume-core'
```

or

```html
<link rel="stylesheet" href="plume-css/lib/plume-core.css">
```

Now you can load the modules that you want. The following modules are available

- typography
- buttons
- form
- tables
- lists
- pre-code
- effects
- utilities

So, if you want to add only typography and buttons, for example, you can do:

```javascript
import 'plume-css/lib/plume-core';
import 'plume-css/lib/typography';
import 'plume-css/lib/buttons';
```

Or

```html
<link rel="stylesheet" href="lib/plume-core.css">
<link rel="stylesheet" href="lib/typography.css">
<link rel="stylesheet" href="lib/buttons.css">
```

# Utilities

Plume apply styles on bare components, but there is a large set of functional utilities - classes and data properties - that you can apply on your elements to alter its behavior. You can check the complete list of Utilities on this link: https://felippe-regazio.github.io/plume-css/.

NOTE: Plume is scoped under a main class - `.plume` by default - and also by prefixing all other classes and properties with a `pm-` by default. If you are interested in change Plume's main class and prefix, please read the `Building from Source` section of this README.

# Theming

Plume is written using a lot of custom properties (70+) that controls important style aspects. It will be good for yout to be familiarized with "CSS Custom Properties". You can override those properties to alter the elements style, or to create your own custom Theme. So, a custom theme is nothing more
then a set of CSS Custom Properties overridings. You can check the complete Plume's Custom Properties List on the Github Page. You can add a theme by:

1. Creating and downloading or Theme using the theme editor on Plume's Github Page.
2. Manually overriding the variables on your code
3. Loading a pre made custom theme from Plume's package *

If you want details about the Theme Editor source code and how to change it or build it, please read the `Building from Source` section of this README.

# Building from Source

Plume follows a very simple and solid architecture. If you want to know how Plume works under the hood, its architecture, building process, automation etc, please read the README.md on the `sass` directory on this repository. The common building scripts are:  

Developing

```
npm run dev
```

Building

```
npm run build
```

Building Sass & Docs

```
npm run build-all
```

# Building Docs

The front matter documentation is also the Plume's github pages. It holds the Theme Editor, Description, Visual Reference, Custom Themes Collection and Code Reference. The documentation information as Utilities, prefixes, classes, custom properties as the Theme Editor information and editable properties are automatically generated via Javascript. If you change Plume Defaults, the documentation references must automatically change. To know more about the documentation structure and code, please see the README.md file on the `docs` directory of this repository. Common scripts are:  

Developing

```
npm run dev-docs
```

Building

```
npm run build-docs
```
