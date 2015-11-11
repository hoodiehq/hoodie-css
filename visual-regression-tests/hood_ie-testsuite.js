

var fs = require('fs');
var path = fs.absolute(fs.workingDirectory + '/node_modules/phantomcss/phantomcss.js');
var phantomcss = require(path);

casper.test.begin('Hood.ie visual tests', function(test) {

  phantomcss.init({
    //create new baseline images without manually deleting the files casperjs demo/test.js --rebase
    rebase: casper.cli.get('rebase'),
    casper: casper,
    libraryRoot: fs.absolute(fs.workingDirectory + '/node_modules/PhantomCSS'),
    screenshotRoot: fs.absolute(fs.workingDirectory + '/visual-regression-tests/screenshots'),
    failedComparisonsRoot: fs.absolute(fs.workingDirectory + '/visual-regression-tests/screenshots/failures'),
    addLabelToFailedImage: false,
    mismatchTolerance: 0.00,
    prefixCount: true,
    outputSettings: {
      errorColors: {
        red: 224,
        green: 10,
        blue: 10
      },
      errorType: 'movement',
      transparency: 0.3
    }
  });

  // casper.then(function() {
  //   casper.open('localhost:3000/blog/');
  //   phantomcss.screenshot('html', 'hood.ie-blog');
  // });

  // casper.then(function(){
  //   casper.open('localhost:3000/');
  // });

  // casper.then(function() {
  //   casper.viewport(640, 640);
  //   casper.click('.menu-button');
  //   casper.waitForSelector('.menu-button.is-active', function success() {
  //     phantomcss.screenshot('html', 'hood.ie-menu');
  //   },
  //   function timeout() {
  //     casper.test.fail ('whooomp whooom whooohhoooomp...');
  //   });
  // });

  // casper.then(function() {
  //   phantomcss.compareAll();
  // });

  // casper.run(function() {
  //   console.log('\n~~**TESTS FINISHED**~~');
  //   casper.test.done();
  // });

var check, config, currentSuite, scenarios;

  config = [
    {
      name: "Hood.ie Index",
      path: "localhost:3000/",
      viewports: [1440, 1024, 640]
    }, {
      name: "Hood.ie Intro",
      path: "localhost:3000/intro/",
      viewports: [1440, 1024, 640]
    }, {
      name: "Hood.ie Contribute",
      path: "localhost:3000/contribute/",
      viewports: [1440, 1024, 640]
    }, {
      name: "Hood.ie Get Help",
      path: "localhost:3000/get-help/",
      viewports: [1440, 1024, 640]
    }, {
      name: "Hood.ie About",
      path: "localhost:3000/about/",
      viewports: [1440, 1024, 640]
    }, {
      name: "Hood.ie Community",
      path: "localhost:3000/community/",
      viewports: [1440, 1024, 640]
    }, {
      name: "Hood.ie Animals",
      path: "localhost:3000/animals/",
      viewports: [1444, 1024, 640]
    }, {
      name: "Hood.ie Contact",
      path: "localhost:3000/contact/",
      viewports: [1440, 1024, 640]
    }, {
      name: "Hood.ie Initiatives",
      path: "localhost:3000/initiatives/",
      viewports: [1440, 1024, 640]
    }, {
      name: "Hood.ie Events",
      path: "localhost:3000/events/",
      viewports: [1440, 1024, 640]
    }, {
      name: "Hood.ie Code of Conduct",
      path: "localhost:3000/code-of-conduct/",
      viewports: [1440, 1024, 640]
    }, {
      name: "Hood.ie Blog",
      path: "localhost:3000/blog/",
      viewports: [1440, 1024, 640]
    }
  ];

  scenarios = config.reduce((function(acc, scenario) {
    return acc.concat(scenario.viewports.map(function(viewportWidth) {
      return function() {
        this.echo(scenario.name);
        this.start(scenario.path, function() {
          return this.echo("CURRENTLY TESTING: " + (this.getTitle()));
        });
        this.viewport(viewportWidth, 600);
        this.then(function() {
          return phantomcss.screenshot("body", scenario.name + "-" + viewportWidth);
        });
        return this.then(function() {
          return phantomcss.compareAll();
        });
      };
    }));
  }), []);

  casper.start();

  casper.then(function() {
    return this.echo("Starting");
  });

  currentSuite = 0;

  check = function() {
    if (scenarios[currentSuite]) {
      scenarios[currentSuite].call(this);
      currentSuite++;
      return casper.run(check);
    } else {
      this.echo("All done.");
      return this.exit();
    }
  };

  casper.run(check);

});
