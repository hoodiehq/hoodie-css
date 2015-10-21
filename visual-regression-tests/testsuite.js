

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
    // cleanupComparisonImages: true,
    addLabelToFailedImage: false,
    // mismatchTolerance: 0.05,
    // prefixCount: true,
    outputSettings: {
      errorColors: {
        red: 255,
        green: 255,
        blue: 0
      },
      errorType: 'movement',
      transparency: 0.2
    }
  });

  casper.start('http://hood.ie');

  casper.viewport(1440, 900);

  casper.then(function() {
    phantomcss.turnOffAnimations();
  });

  // casper.then(function() {
  //   phantomcss.screenshot('html');
  // });

  // casper.then(function() {
  //   casper.open('http://hood.ie/intro');
  //   phantomcss.screenshot('html');
  // });

  // casper.then(function() {
  //   casper.open('http://hood.ie/contribute');
  //   phantomcss.screenshot('html');
  // });

  // casper.then(function() {
  //   casper.open('http://hood.ie/get-help');
  //   phantomcss.screenshot('html');
  // });

  // casper.then(function() {
  //   casper.open('http://hood.ie/about');
  //   phantomcss.screenshot('html');
  // });

  // casper.then(function() {
  //   casper.open('http://hood.ie/community');
  //   phantomcss.screenshot('html');
  // });

  // casper.then(function() {
  //   casper.open('http://hood.ie/animals');
  //   phantomcss.screenshot('html');
  // });

  // casper.then(function() {
  //   casper.open('http://hood.ie/contact');
  //   phantomcss.screenshot('html');
  // });

  // casper.then(function() {
  //   casper.open('http://hood.ie/initiatives/');
  //   phantomcss.screenshot('html');
  // });

  // casper.then(function() {
  //   casper.open('http://hood.ie/events/');
  //   phantomcss.screenshot('html');
  // });

  // casper.then(function() {
  //   casper.open('http://hood.ie/code-of-conduct/');
  //   phantomcss.screenshot('html');
  // });

  // casper.then(function() {
  //   casper.open('http://hood.ie/blog/');
  //   phantomcss.screenshot('html');
  // });


  // casper.then(function() {
  //   casper.open('http://faq.hood.ie/');
  //   phantomcss.screenshot('html');
  // });

  // casper.then(function() {
  //   casper.open('http://docs.hood.ie/');
  //   phantomcss.screenshot('html');
  // });

casper.then(function() {
  casper.viewport(640, 320);
  casper.click('.menu-button');
  casper.waitForSelector('.menu-button.is-active');
  function success() {
    phantomcss.screenshot('html');
  }
  function timeout() {
    casper.test.fail ('whooomp whooom whooohhoooomp...');
  }
});


  casper.then(function() {
    phantomcss.compareAll();
  });

  casper.run(function() {
    console.log('\n~~**TESTS FINISHED**~~');
    casper.test.done();
  });
});
