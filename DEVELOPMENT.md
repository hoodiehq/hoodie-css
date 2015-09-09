# Development

In order to see what scripts we have available, you can either go through the **scripts** object in the `package.json` directly, or run `npm run` and it will print a nice list of all named scripts and what they actually do.

=======
```shell
Scripts available in hoodie-website via `npm run-script`:
  # Currently this is a workaround because the watch task doesn't compile on the first run,
  # so we don't get a hoodie.css until we change a sass file. Using a pre- or post- prefix
  # as the name of the script executes the script before or after the main script. So here
  # we have presass:dev which will run before sass:dev, without us having to specify 
  # `npm run presass:dev && npm run sass:dev`.
  presass:dev
    node-sass --source-map src/css/hoodie.css.map 
      --output-style nested src/sass/base.scss src/css/hoodie.css
  # This command takes the base.scss file and compiles it to hoodie.css, adds a source map
  # at hoodie.css.map, and has output-style nested so that it shares the same dev properties
  # as the grunt task to do the same.
  sass:dev
    node-sass --source-map src/css/hoodie.css.map
      -w --output-style nested src/sass/base.scss src/css/hoodie.css
  # This command opens the browser for us at the localhost page so that we can immediately
  # see what we're developing.
  open:dev
    opener http://localhost:9090
  # This command starts a simple http-server at port 9090 serving the contents of dist/.
  # We need this so that we can mimic our production environment with the serving of all our
  # content on our local machines.
  serve
    http-server -p 9090 dist/
  # This command starts a "Live Reload" server which watches for changes in the dist/
  # directory, and fires a reload event to our index.html page so that we never need to
  # worry about reloading our browser page during development.
  live-reload
    live-reload --port 9091 dist/
  # This command ties some of our scripts together so that we can set up a complete development
  # environment with one command. Of note here is the use of parallelshell and -s.
  # [parallelshell](https://www.npmjs.com/package/parallelshell) is a nice, cross-platform wrapper
  # around command1 & command2 & command3 which doesn't stop the command running if one fails, and
  # other niceties that should be explained in the README. The -s option is an option
  # passed directly to npm run where it quietens the info level outputs, and means that we don't
  # clutter our terminal with a load of noise when we run the command.
  dev
    npm run open:dev -s &&
      parallelshell "npm run live-reload -s" "npm run sass:dev -s" "npm run serve -s"
```

### Process

When building the project, you can start a local server with `npm run dev`.

This creates a local server at *localhost:9000*, opens your browser to that address, and will reload the page when any files in the `dist` folder change, without a full page reload.

Please extend this document as we automate each part of the process.
