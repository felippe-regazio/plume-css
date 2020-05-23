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
<link rel="stylesheet" href="dist/plume-all.css">
```

# Getting Started

Since Plume is scoped, after installing it, you must add the `plume` class on a wrapper div to apply local styles, or add it on the `body` tag to style the entire page. You can also add the `pm-container` class to have a containerized wrapper.

```html
  <div class="plume">
    <!-- Will be styled by Plume -->
  </div>

  <div class="plume pm-container">
    <!-- Will also be styled by Plume -->
  </div>

  <div class="whatever">
    <!-- Wont be styled by plume -->
  </div>
```

# Loading Modules

When you load `plume-all.css` or `import 'plume-all'`, you bring the entire Plume lib to your app. Thats ok since the complete lib has only 5kb gziped. But you may want to load only some modules, as Buttons, or Form styles for example. You just need to load the `plume-core` module, then load the modules you want:

```javascript
import 'plume-css/plume-core'
```

or

```html
<link rel="stylesheet" href="dist/plume-core.css">
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
<link rel="stylesheet" href="dist/plume-core.css">
<link rel="stylesheet" href="dist/typography.css">
<link rel="stylesheet" href="dist/buttons.css">
```

# Custom Themes

# Theme Editor

# Themes from Scratch

# Utilities

# Extending

# Configuration

# Building from Source

# Building Docs

# Plume as a boilerplate