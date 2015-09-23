# Development

In order to see what scripts we have available, you can either go through the **scripts** object in the `package.json` directly, or run `npm run` and it will print a nice list of all named scripts and what they actually do.

If that doesn't help you, you can also try `npm run help` which will output a similar list, but with helpful additions so that you understand what each script is doing.

```shell
Lifecycle scripts included in hoodie-website:
  # This is the main entry point for development work. It takes the "dev" task, and at the
  # same time it also runs the "serve" task, which are explained separately. This doc format
  # says that for the "start" command, (run with "npm start"), will run "npm-run-all
  # --parallel dev serve". It's an easy way of not having to remember what the command is,
  # all you need to remember is "npm start", or "npm run start".
  start
    npm-run-all --parallel dev serve
  # This task will run all our tests/linters etc and report errors or failures. The reason to
  # use "test" as a name is that it's a default specified task, a "lifecycle script" in npm
  # terms. This means that some automated test runners, when reaching a node module, will try
  # by default to run "npm test". This runs every script that starts with "test:".
  test
    npm-run-all test:*

available via `npm run-script`:
  # This task will output a more meaningful bit of documentation than "npm run" will, and
  # can hopefully be a good way of helping bring new people on board to develop hoodie
  # websites.
  help
     markdown-chalk -i DEVELOPMENT.md
  # This task starts a live reload enabled server, and opens the browser to localhost:9000.
  # This allows us to see our changes in real time, which makes local development a lot
  # quicker and nicer.
  serve
    live-server dist/ --port=9000

  # This task is a catch all to run every task that begins with dev, so that we can
  # namespace our tasks effectively.
  dev
    npm-run-all dev:*

  # Currently this is a workaround because the watch task doesn't compile on the first run,
  # so we don't get a hoodie.css until we change a sass file. Using a pre- or post- prefix
  # as the name of the script executes the script before or after the main script. So here
  # we have presass:dev which will run before sass:dev, without us having to specify
  # `npm run presass:dev && npm run sass:dev`.
  predev:sass
    node-sass --source-map src/css/hoodie.css.map
      --output-style nested src/sass/base.scss src/css/hoodie.css
  # We then take hoodie.css, and use "autoprefixer" to add some browser specific prefixes to
  # allow us to use some css that some browsers don't yet support without them. We specify
  # our target browser range to support anything with more than 5% usage worldwide.
  dev:autoprefix
    postcss --use autoprefixer --autoprefixer.browsers "> 5%"
      --output src/css/hoodie.css src/css/hoodie.css
  # This command takes the base.scss file and compiles it to hoodie.css, adds a source map
  # at hoodie.css.map, and has a nested output-style to make it more readable, and watches
  # the file for changes.
  dev:sass
    node-sass --source-map src/css/hoodie.css.map --watch
      --output-style  nested src/sass/base.scss src/css/hoodie.css

  # In a similar way to the "dev" task, this is where we catch all the tasks we need to
  # serve "production ready" content. This means we minify, add browser specific prefixes
  # and generally make our CSS as performant as we can.
  prod
    npm-run-all prod:*

  # This command takes our base.scss file and compiles it to hoodie.min.css, without a
  # source map, and with a compressed output-style because we don't care about readability
  # when we are pushing to production pages.
  prod:sass
    node-sass --output-style compressed src/sass/base.scss src/css/prod/hoodie.min.css
  # This command takes our minified css, and adds browser specific prefixes so that if a
  # particular browser hasn't implemented a feature as standard, we can add the appropriate
  # prefix to our CSS so that it works for those browsers. We specify our target browser
  # range to support anything with more than 5% usage worldwide.
  prod:css
    postcss --use autoprefixer --autoprefixer.browsers "> 5%"
      --output src/css/prod/hoodie.min.css src/css/prod/hoodie.min.css

  # This command takes our sass folder, reads through it, and extracts comments inside our
  # .scss files and outputs them into a styleguide in the "styleguide" folder, and the
  # front page of that is defined in the styleguide.md markdown file in the root of the
  # project repository.
  docs
    kss-node --source src/sass --homepage ../../styleguide.md

  # This is our "linting" step for our SASS. Linters pick up things that don't match the
  # style or format we would like, as defined in the ".sass-lint.yml" file specified in
  # this command, and we ask it to output verbosely, which just means it prints more
  # information.
  test:lint
    sass-lint --verbose --config .sass-lint.yml src/sass/*
```

### Process

When building the project, you can start a local server with `npm start`.

This creates a local server at *localhost:9000*, opens your browser to that address, and will reload the page when any files in the `dist` folder change, without a full page reload.

Please extend this document as we automate each part of the process.
