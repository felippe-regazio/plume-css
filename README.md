# Plume CSS

Welcome to Plume CSS, a lightweight and highly themeable CSS Micro-Framework. No JS, no Dependencies. This is the Plume's repository and technical documentation. If you want to know exactly what Plume is, what it does and its main characteristics, please visit: https://felippe-regazio.github.io/plume-css/. For usage and technical information, please follow the README:

# Compatibility

Full compatibility with the following Browsers:

- Google Chrome 80.0.3987.132 
- Mozilla Firefox 76.0.1
- Opera 68.0.3618.125
- Safari 11.1.2

Tested in a browser thats isn't here? Send a PR with the results. Found an issue? Send a PR describing it :)

# Installing

With NPM (Also available with Yarn)

```bash
npm install plume-css
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

Now you're ready to go

# Loading by Modules

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

This method is specially useful if you want to import Plume styles on your SCSS projects.

```scss
@import 'plume-css/lib/plume-core.css';
@import 'plume-css/lib/typography.css';

h1 {
  // this will override plume's H1 default style
}
```

# Utilities

Plume apply styles on bare components, but there is a large set of functional utilities - classes and data properties - that you can apply on your elements to alter its behavior. You can check the complete list of Utilities on this link: https://felippe-regazio.github.io/plume-css/.

NOTE: Plume is scoped under a main class `plume` by default, and all the classes and properties are prefixed with `pm-` by default. This guarantee highly compatibility and Collision Free CSS. If you are interested in change Plume's main class and prefix, please read the `Building from Source` section of this README.

# Theming

Plume is written using a lot of custom properties (70+) that controls important aspects of the default style. Here we assume that you are familiarized with "CSS Custom Properties". You can override these properties to alter default elements style, or to create your own custom Theme. So, a custom theme is nothing more then a set of CSS Custom Properties overriding. You can check the complete Plume's Custom Properties List on the Github Page. You can add a theme by:

1. Creating and downloading or Theme using the theme editor on Plume's Github Page.

2. Manually overriding the variables on your code

# HTML & Body Normalizing

Plume is already normalized, but since its scoped, it cant access the HMTL and Body directly. So, to completely normalize the entire APP you must also normalize the HTML and Body. To do it, just use this snippet:

```css
html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}

body {
  margin: 0;
}
```

# Building

Starting

```
npm install
```

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

The documentation and the Theme Editor is automatically generated. New properties, prefixes and base configuration changes will be automatically updated.

Developing

```
npm run dev-docs
```

Building

```
npm run build-docs
```

# Developing from Sources

Plume has a very simple and solid architecture. You can tune and modify most of its basic aspects in a very simple manner. Its possible to change the main classes, prefixes, and other characteristics. If you want to know how Plume works under the hood, please read the `developing.md`.
