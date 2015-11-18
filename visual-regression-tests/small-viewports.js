
// We need this because PhantomCSS isn't a npm package
var fs = require('fs');
var path = fs.absolute(fs.workingDirectory + '/node_modules/phantomcss/phantomcss.js');
var phantomcss = require(path);


// Begin testing
casper.test.begin('Run tests against pages with a viewport of 320 x 480', function(test) {

  phantomcss.init({
    // Reference to a particular Casper instance. Required for SlimerJS.
    // Refers to itself because we're running CasperJS directly
    casper: casper,
    // Points to the PhantomCSS library
    libraryRoot: fs.absolute(fs.workingDirectory + '/node_modules/phantomcss/'),
    // Folder for all screenshots
    screenshotRoot: fs.absolute(fs.workingDirectory + '/visual-regression-tests/screenshots/small/'),
    // Removes results directory tree after run.  Use in conjunction with failedComparisonsRoot to see failed comparisons.
    cleanupComparisonImages: true,
    // Folder for failed comparisons
    failedComparisonsRoot: fs.absolute(fs.workingDirectory + '/visual-regression-tests/screenshots/small/failures/'),
  });


  casper.start('localhost:300', function() {

    this.viewport(320, 480);

    this.wait(1000, function() {
      this.then(function() {
        phantomcss.screenshot('html', 'hoodie-index--320x480');
      });

      this.then(function() {
        this.click('a.menu-button');
        this.then(function(){
          phantomcss.screenshot('html', 'hoodie-index-menu--320x480');
        });
      });

      this.then(function() {
        this.open('localhost:3000/intro/');
        this.then(function() {
          phantomcss.screenshot('html', 'hoodie-intro--320x480');
        });
      });

    });

    this.then(function() {
      phantomcss.compareSession();
    });
  });

  casper.run(function() {
    test.done();
  });
});
