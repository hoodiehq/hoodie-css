# Development Environment Help

In order to see what scripts we have available, you can either go through the **scripts** object in the `package.json` directly, or run `npm run` and it will print a nice list of all named scripts and what they actually do.

## Contents

Topic | Link
------------- | -------------
npm Scripts  | [npm-scripts](#npm-scripts)
Lifecycle Scripts  | [lifecycle-scripts](#lifecycle-scripts)
The "start" Script  | [the-start-script](#the-start-script)
npm-run-all | [npm-run-all](#npm-run-all)
Parallelisation | [parallelisation](#parallelisation)
Glob Matching | [glob-matching](#glob-matching)
What npm start does | [what-npm-start-does](#what-npm-start-does)
live-server | [live-server](#live-server)
The "test" Script  | [the-test-script](#the-test-script)
Additional Scripts  | [additional-scripts](#additional-scripts)
Scripts that match `test:*`  | [scripts-that-match-test](#scripts-that-match-test)
The "docs" script | [the-docs-script](#the-docs-script)
The "serve" script | [the-serve-script](#the-serve-script)
The "dev" script | [the-dev-script](#the-dev-script)
Scripts that match `dev:*`  | [scripts-that-match-dev](#scripts-that-match-dev)
The "prod" script | [the-prod-script](#the-prod-script)
Scripts that match `prod:*`  | [scripts-that-match-prod](#scripts-that-match-prod)


---

## npm Scripts

When we define a "script" in our `package.json`, we are telling npm run-script to run the command whenever we use the name of the script as an argument to `npm run`. These scripts don't have to be JavaScript, only executable somehow. This could be anything that's runnable from the console.

For example, if we had a JavaScript file called helloworld.js, that contained:

```javascript
console.log('Hello World');
```

An npm script defined in our `package.json` file:

```json
"scripts": {
  "hello": "node helloworld.js"
}
```

From our project directory, in the terminal, we could run `npm run hello`, the output would be:

```
Hello World
```

We could do the same with a bash script, or any executable script out there.

While npm deals with JavaScript packages, it's an important point to make that these scripts **don't** have to be JavaScript.

---

When we run `npm run` in this project we get some nice looking output, but it's not that helpful on it's own. This document will try and explain what our development environment is, why it is like that, and how you can use it to work on this repository, but also hopefully give you enough information to be able to consider using npm as a build tool.

Let's step through the output of `npm run` piece by piece.

## Lifecycle scripts

##### `Lifecycle scripts included in hoodie-website:`

First of all, we are introduced, (albeit briefly) to the concept of __lifecycle scripts__.

These scripts are related to a module itself, and to it's lifecycle. For example, in this project we have `start` and `test` defined already. These scripts are special because they are linked to how an npm module is consumed by other modules, so when you run `npm install [packagename]` the lifecycle scripts can affect what actually is installed. Often you might want to publish (to the npm registry) only the compiled version of your code, so you can add a `prepublish` script that compiles your JavaScript/CSS/whatever, and then whenever you publish a version, your code gets compiled and people don't get the development version.

`prepublish` also introduces a new concept of the `pre` prefix. There is also a partner `post` prefix, and any script with a corresponding version with `pre` ahead of it will be run before the original script. In this package, we have the `dev:sass` task, and a corresponding `predev:sass`. This means whenever the `dev:sass` task is run, before the actual task runs, the command `predev:sass` is automatically run for us. The `pre` and `post` prefixes are a handy way of naming these to help understand them.

---

### The "start" script

##### `start`
###### `npm-run-all --parallel dev serve`

The first time you see the full `npm run` output, it might be intimidating, but we've tried to do our best to make these scripts as approachable as possible.

The first line is the name that we use to call the script. In this case that's `start`, and we can use `npm run start`, or, because it's a lifecycle script, we can shorten it to `npm start`.

The second line is the commands that are executed when this command runs. Here we see that `npm-run-all --parallel dev serve` is run, whenever we run `npm run start`, or `npm start`. Fully understanding this needs a bit of knowledge about the [npm-run-all](https://www.npmjs.com/package/npm-run-all) module, so let's explore what it is, why we use it, and what the alternatives might look like.

#### [npm-run-all](https://www.npmjs.com/package/npm-run-all)

This module is one of our devDependencies. This means it's not a dependency for our module to operate, and is not added to our module when we publish, however it is something that we need in order for our development environment to work. You can install more of these with `npm install [packagename] --save-dev`.

This specific dependency allows us to use the name of the script instead of typing out `npm run [script]` inside our npm scripts.

##### Parallelisation

`npm-run-all` also allows us to run multiple scripts at once, with the `--parallel` flag. By default scripts listed in order will be run sequentially.

There are a few problems regarding the more usual way of running tasks in parallel with the `&&` command. You may be used to seeing this in other scripts, but it can run into problems when running in a Windows environment, as the `&&` command doesn't work.

The _(non-Windows)_ alternative for our script would look like:

```shell
npm run dev & npm run serve
```

However, as before, this won't work on a Windows environment, and also will create background processes that need to be manually exited, which can get really annoying if you run a lot of scripts in parallel.

There is also [parallelshell](https://www.npmjs.com/package/parallelshell) which accomplishes the parallelisation concerns, and works across platforms, but makes the scripts less readable.

##### "Glob matching"

`npm-run-all` also has the bonus feature of what is known as "glob matching", however the phrase may be new to you. It is also known as wildcard matching. This allows us to call tasks with a `*` character, and it will "match" all the scripts that match the pattern, and run each of them.

#### What `npm start` does

When we want to set up our development environment, with some content in a browser that will update when we change files on our machine, we run `npm start`. This runs the `dev` script, and the `serve` script in parallel.

The `dev` script runs all the tasks whose name starts with `dev:` with the glob matching, and this sets up any compilation steps that we need. It takes our Sass files and compiles them to CSS so that we can view our changes in the browser, and if we change a Sass file, it re-compiles the appropriate files, and this allows us to view our changes as soon as possible after we make them.

The `serve` script uses a really great tool called [live-server](https://www.npmjs.com/package/live-server) that solves 3 problems for us.

#### [live-server](https://www.npmjs.com/package/live-server)

- It serves the index.html file for us, this can help when we bring in things that need to request content that's not on our page, like webfonts, or external CSS/JS, because the `file://` protocol doesn't allow that. This is why we need a server at all.

- It adds "live reload" capability to that server, so any changes it detects in the `dist` directory will be served, and any CSS changes will also be applied as soon as the file is saved, without restarting anything, or reloading the page. This helps speed up development work a lot.

- It opens the browser for us at the location we need the browser to be to see the index.html as it's being served, which is another speed boost when you run `npm start` to get to seeing the site as you work on it.

Previously, these were handled with three separate dependencies.

- [http-server](https://www.npmjs.com/package/http-server) would serve the content.

- [live-reload](https://www.npmjs.com/package/live-reload) would add the live reload capability.

- [opener](https://www.npmjs.com/package/opener) would open the user's default browser.

However combining these makes sense, and means we can keep the number of devDependencies as small as possible, (and by extension how much we need anyone who wants to work on the project to install), and we don't need to worry about explaining 3 separate dependencies that are all very much linked to how we serve content and view changes to that content.

---

### The "test" script

##### `test`
###### `npm-run-all test:*`

With the test script we take advantage of [npm-run-all](https://www.npmjs.com/package/npm-run-all)'s glob matching to run all the scripts that begin with `test:`. We run these scripts one after the other, also known as in "sequence", or in "series". This makes running a full `npm test` or `npm run test` take a bit more time, but also means that we can pause test execution on a test fail, which can be helpful to stop an automated build from continuing running if it has a breaking change.

We call the script `test` because a lot of automated build/test tools, also known as Continuous Integration, like [Travis CI](https://travis-ci.org/), [Circle CI](https://circleci.com/), or [Codeship](https://codeship.com/) will see that our project has a package.json, and is therefore using npm for (at the very least), tracking versions or dependencies, and it will try out `npm test` as a default test script.

So by naming our script `test` instead of `lint` or similar, we can take advantage of that and not have to set up anything unique in our testing environments.

If we were working on tests themselves, and wanted to keep running them instead of the full test suite, we can run specific tests by, (for example) running something like `npm run test:lint` which will run the linter only. This will make the test run faster by only running a subset of the tests.

One would expect `npm test` to only be run in full by an automated build/test environment, and people working on the code itself to run the necessary tests when they change, and maybe run a full `npm test` before committing changes.

---

## Additional scripts

#### `available via npm run-script:`

These scripts are scripts that we have defined ourselves, and are only different to **Lifecycle scripts** in that they have to be run with `npm run` before the name of the script, and npm itself won't use them when publishing or installing a package.

This makes them ideal to hold our development scripts.

---

These scripts will be run when we run `npm test`, and should always run our whole testing/linting suite.

### Scripts that match `test:*`

#### `test:lint`
##### `sass-lint --verbose --config .sass-lint.yml src/sass/*`

The `test:lint` script looks for all the sass files in the `src/sass` and runs [sass-lint](https://www.npmjs.com/package/sass-lint) against them. The rules for this are all defined in `.sass-lint.yml`, and contain things like the number of spaces you should use for indenting, what selectors you should and shouldn't use, and so on. This script helps us to spot style errors in our code, and when we do break them, this script is the one that will tell us that we have.

---

### The "help" script

##### `help`
###### `markdown-chalk --input DEVELOPMENT.md`

The `help` script takes our development environment help file (the one you're reading right now), and outputs it in the terminal. It strips the markdown that we use to make the file easier to read when on GitHub in the browser, and changes it to formatting the output with terminal colour changes and font styles. To accomplish this it uses [markdown-chalk](https://www.npmjs.com/package/markdown-chalk)

The goal is to enable our documentation to be more accessible when offline, for anyone who wants to read it without having to open it in a text editor and get rid of all the markdown formatting.

---

### The "docs" script

#### `docs`
##### `kss-node --source src/sass --homepage ../../styleguide.md`

The `docs` script uses [kss-node](https://www.npmjs.com/package/kss) to extract comments inside the `src/sass` directory and create a styleguide from internal comments, with the main page defined in the `styleguide.md` file.

This is still in progress, as our Sass files don't have comments, and we should also have a way to serve the content locally.

---

### The "serve" script

##### `serve`
###### `live-server dist/ --port=9090`

The `serve` script uses the [live-server](#live-server): [npm package link](http://npmjs.com/package/live-server) dependency to start a local development server, with live reloading, and an auto opening browser tab in the user's default browser.

It serves up everything inside the `dist` directory, and will reload the page automatically if anything inside that directory changes.

`serve` is one of the integral parts of our main development environment, and is one of the scripts executed with the lifecycle script `npm start` (as well as the [dev](#the-dev-script) script).

---

### The "dev" script

##### `dev`
###### `npm-run-all dev:*`

The `dev` script is a catch all script to run all the scripts that start with "dev:" using the [glob-matching](#glob-matching) capability of [npm-run-all](#npm-run-all): [npm package link](http://npmjs.com/package/npm-run-all).

`dev` is another integral part of our main development environment, and is the other script run when we run `npm start`, along with the [serve](#the-serve-script) script. Let's look at the scripts that `npm-run-all dev:*` will run.

#### Scripts that match `dev:*`

##### `predev:sass`
###### `node-sass --source-map src/css/hoodie.css.map --output-style nested src/sass/base.scss src/css/hoodie.css`

The `predev:sass` script compiles our Sass into CSS, adds a source map so that we can debug our Sass from within our CSS, and uses an output style that's easy for humans to read to help debugging efforts.

We currently have this workaround `predev:sass` script because when we first run `dev:sass`, which has the `--watch` option, the Sass is not compiled to CSS until a file has changed. This will break our first page load when we're doing development, when we try to load CSS that doesn't exist yet.

Whenever we run `dev:sass`, this script is executed before it, automatically. This means that when we first run `npm start` that our CSS gets built, and then proceeds to watch for changes. Without this `predev:sass` script, we would have to change a Sass file before our CSS would work on the main page.

##### `dev:sass`
###### `node-sass --source-map src/css/hoodie.css.map --watch --output-style nested src/sass/base.scss src/css/hoodie.css`

The `dev:sass` script compiles our Sass with a nested output style, which is easier for humans to read than our production version. We also add source maps so that we can more easily debug our Sass from within the browser.

The `--watch` option adds file "watching", which will recompile the Sass into CSS whenever any of the Sass files it knows about change. This makes development super speedy.

##### `dev:autoprefix`
###### `postcss --use autoprefixer --autoprefixer.browsers "> 5%" --output src/css/hoodie.css src/css/hoodie.css`

The `dev:autoprefix` script uses autoprefixer to add prefixes for CSS declarations that may be needed for full cross browser support. This helps take the effort out of the hands of the developer so they can focus on making things work on their browser of choice, and then this tool can take care of the rest.

The option `--autoprefixer.browsers "> 5%"` tells autoprefixer to add support for any browser with more than 5% market share, which means it won't worry about adding prefixes for browsers that the majority of people aren't using.

---

### The "prod" script

##### `prod`
###### `npm-run-all prod:*`

The `prod` script is a catch all script to run all the scripts that start with "prod:" using the [glob-matching](#glob-matching) capability of [npm-run-all](#npm-run-all): [npm package link](http://npmjs.com/package/npm-run-all).

#### Scripts that match `prod:*`

##### `prod:sass`
###### `node-sass --output-style compressed src/sass/base.scss src/css/prod/hoodie.min.css`

The `prod:sass` script compiles our Sass with a compressed output style, which is more difficult for humans to read, but saves some space so when we send the compiled version to the site, it doesn't have to transfer as much, which makes it quicker. 

##### `prod:autoprefix`
###### `postcss --use autoprefixer --autoprefixer.browsers "> 5%" --output src/css/prod/hoodie.min.css src/css/prod/hoodie.min.css`

The `prod:autoprefix` script uses autoprefixer to add prefixes for CSS declarations that may be needed for full cross browser support. This helps take the effort out of the hands of the developer so they can focus on making things work on their browser of choice, and then this tool can take care of the rest.

The option `--autoprefixer.browsers "> 5%"` tells autoprefixer to add support for any browser with more than 5% market share, which means it won't worry about adding prefixes for browsers that the majority of people aren't using.

---

## Please help us!

If you find a script defined in the `package.json` that is not documented, please open an issue, or file a pull request with documentation.