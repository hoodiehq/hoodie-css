

var fs = require('fs');
var path = fs.workingDirectory + '/node_modules/phantomcss/phantomcss.js';
var phantomcss = require(path);

casper.test.begin('Hood.ie visual tests', function(test) {

  phantomcss.init({
    //create new baseline images without manually deleting the files casperjs demo/test.js --rebase
    rebase: casper.cli.get('rebase'),
    libraryRoot: './node_modules/PhantomCSS',
    screenshotRoot: './visual-regression-tests/screenshots',
    failedComparisonsRoot: './visual-regression-tests/screenshots/failures',
    cleanupComparisonImages: true,
    addLabelToFailedImage: false,
    mismatchTolerance: 0.05,
    prefixCount: true,
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

  casper.then(function() {
    phantomcss.screenshot('html');
  });

  casper.then(function() {
    phantomcss.compareAll();
  });

  casper.run(function() {
    console.log('\nTESTS FINISHED.');
    casper.test.done();
  });
});
