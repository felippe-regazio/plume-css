# Architecture

Plume source lives in the `sass` dir. The architecture is pretty simple:

```
├── sass
│   ├── core
│   ├── { scss files }
```

# plume.config.js

Plume is compiled using Gulp. Is minified, vendor auto-prefixed, and scoped at compile time. You can use the file `plume.config.js` to recompile plume with different configurations. The file contains:

```js
module.exports = {
  superclass: 'plume',        // plume main class, will scope the styles
  outputStyle: 'compressed',  // plume css output: compressed/expanded
  targetDirName: 'lib',       // target directory (the lib by default)
  prefixer: {                 // prefixing configuration
    prefix: 'pm-',
    ignore: ['.plume'],
  }
}
```

After configure this object, you must run `npm run build` to reconstruct plume with your configurations.

# Prefixer

When writing styles in plume scss files you must not worry with prefixes. Just write your styles. Plume prefixes are added in compile type by gulp using a custom prefixer. You can check the prefixer code in the `prefixer` dir. At compile time, the Plume Prefixer will prefix:

- Class names: .class becomes .pm-class
- Ids (avoid using Ids): #id becomes #pm-id
- Data attributes: #data-attr becomes #data-pm-attr
- Pseudo Attributes (attr(data-*)): attr(data-attr) becomes attr(data-pm-attr)
- Class Wildcards: ([class*=myclass] & [class^=mysclass]) becomes  ([class*=pm-myclass] & [class^=pm-mysclass])
- Custom Properties: --custom-prop becomes --pm-custom-prop

In the `plume.config.js` file you can change this behavior ou set off some prefixers:

```js
prefixer: {
  
  prefix: 'pm-',        // default prefix. set to false no not prefixing
  ignore: ['.plume'],   // selectors to ignore when prefixing
  ids: true, // prefix ids
  classes: true, // prefix classes
  dataAttrs: true, // prefix data-*
  pseudoAttrs: true, // prefix attr(data-*) attributes
  customProps: true, // prefix --custom-props
  classesWildcards: true, // prefix [class*=]
  classesCircumflex: true // prefix [class^=]

}
```

This kind of deep prefixing will completely avoid conflicts when dealing with Plume. Anyway, iff you set the `prefix` key to false, Plume wont be prefixed.

# The Core Dir

Inside the `core` folders we have:

```
_config.scss: Contains global css properties that is shared by all the components.

_general.scss: Contains the styles and properties that concerns to the app in a macro scope.

_helpers.scss: The base functions and mixins that builds Plume's plumbers.

_normalize.scss: A simple normalizer
```

The core is compiled on the `plume-core.scss` and the `plume-all.scss` files. All the other modules as Buttons or Tables, for example, will depend of and consume the the `core`, but you dont need to import it on every module since Plume's CSS variables are on :root, they are global. When working on a Plume module, you will need only the `_helpers.scss`. Load the `plume-core.scss` as a dependency, then load the modules.

# Theming

As plume is written using CSS properties, it can be easily Themed. You can visit https://felippe-regazio.github.io/plume-css/, open the Theme Editor, edito you theme as you want, click on Download Theme, load the download css file in you application and you're done. 

A theme can be scoped, in order to create classes to theme your application or even micro themes:

```
.my-custom-theme {
  --pm-primary-color: blue;
  --pm-secondary-color: green;
}
```

In the example above, the class `my-custom-theme` changes overrides the css Props. Use it along the page to themefy some document local sections.
You can also do:

```
.my-custom-button {
  --pm-primary-color: yellow;
  --button-primary-text-color: #00000;
  border: dashed 2px green;
}
```

Now, buttons with `pm-btn-primary my-custom-button` will have yellow background, black text, etc. To see the complete list of CSS Custom Properties available by default, please visit the plume github page. If this is still confusing, please, read more about CSS Custom Properties, then this documentation section will make more sense.

# Rebuilding

Before anything:

```
npm install
```

To build plume

```
npm run build
```

Dev on plume

```
npm run dev
```

Rebuild plume and docs

```
npm run build-all
```

# Docs

The documentation is Automatically generated based on your new configurations and styles on Plume. You can rebuild the docs with:

```
npm run build-docs
```

Or develop using

```
npm run dev-docs
```

Despite the name, the `docs` folder contains the Plume Github Page, with the Theme Editor and all its features. If you extend Plume by adding new CSS Custom Properties on the :root scope, they will be automatically added to the Theme Editor Inputs. Also if you reconfigure the prefix, superclass and other things, the Theme Editor and the Github Page will also be automatically modified.