

var fs = require('fs');
var path = fs.workingDirectory + '/node_modules/phantomcss/phantomcss.js';
var phantomcss = require(path);

casper.test.begin('Hood.ie initial test', function(test) {
  console.log('preinit');
  phantomcss.init({
    //create new baseline images without manually deleting the files casperjs demo/test.js --rebase
    rebase: casper.cli.get('rebase'),
    libraryRoot: './node_modules/PhantomCSS',
    screenshotRoot: './visual-regression-tests/screenshots',
    failedComparisonsRoot: './visual-regression-tests/screenshots/failures',
    cleanupComparisonImages: true,
    addLabelToFailedImage: true,
    mismatchTolerance: 0.05,

    onFail: function(test) {
      console.log(test.filename, test.mismatch);
    },
    onPass: function(test) {
      console.log(test.filename);
    },
    onNewImage: function() {
      console.log(test.filename);
    },
    onTimeout: function() {
      console.log(test.filename);
    },
    onComplete: function(allTests, noOfFails, noOfErrors) {
      allTests.forEach(function(test) {
        if(test.fail) {
          console.log(test.filename, test.mismatch);
        }
      });
    },
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
    phantomcss.screenshot('html');
  });

  casper.then(function now_check_the_screenshots() {
    phantomcss.compareAll();
  });

  casper.run(function() {
    console.log('\nTHE END.');
    casper.test.done();
  });
});
