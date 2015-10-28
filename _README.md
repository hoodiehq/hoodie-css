Hood.ie: the Website for the Hoodie Open Source Project
==================

## Getting started

To get started check out the recent version and install the local dependencies via `npm install`.
The default task `npm start` will fire up a local server at localhost:9090 with livereload, dev Sass prefixing and compiling (including sourcemap and nested output).
There's also a production task `npm prod` which at this point just spits out a compressed CSS file, without sourcemap in a dedicated folder(css/prod).
In order to list the available scripts used in development, execute `npm run`. The complete development environment help can be found in `DEVELOPMENT.md`.

## Editorconfig

Use the .editorsconfig file with your editor of choice to ensure a consistent coding style. Plugins are available at [http://editorconfig.org/#download](http://editorconfig.org/#download title="editorconfig download").
