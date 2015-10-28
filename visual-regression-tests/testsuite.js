

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
    mismatchTolerance: 0.05,
    prefixCount: true,
    outputSettings: {
      errorColors: {
        red: 224,
        green: 10,
        blue: 10
      },
      errorType: 'movement',
      transparency: 0.2
    }
  });

  casper.start('localhost:3000');

  casper.viewport(1440, 900);

  casper.then(function() {
    phantomcss.turnOffAnimations();
  });

  casper.then(function() {
    phantomcss.screenshot('html', 'hood.ie-index');
  });

  casper.then(function() {
    casper.open('localhost:3000/intro');
    phantomcss.screenshot('html', 'hood.ie-intro');
  });

  casper.then(function() {
    casper.open('localhost:3000/contribute');
    phantomcss.screenshot('html', 'hood.ie-contribute');
  });

  casper.then(function() {
    casper.open('localhost:3000/get-help');
    phantomcss.screenshot('html', 'hood.ie-get-help');
  });

  casper.then(function() {
    casper.open('localhost:3000/about');
    phantomcss.screenshot('html', 'hood.ie-about');
  });

  casper.then(function() {
    casper.open('localhost:3000/community');
    phantomcss.screenshot('html', 'hood.ie-community');
  });

  casper.then(function() {
    casper.open('localhost:3000/animals');
    phantomcss.screenshot('html', 'hood.ie-animals');
  });

  casper.then(function() {
    casper.open('localhost:3000/contact');
    phantomcss.screenshot('html', 'hood.ie-contact');
  });

  casper.then(function() {
    casper.open('localhost:3000/initiatives/');
    phantomcss.screenshot('html', 'hood.ie-initiatives');
  });

  casper.then(function() {
    casper.open('localhost:3000/events/');
    phantomcss.screenshot('html', 'hood.ie-events');
  });

  casper.then(function() {
    casper.open('localhost:3000/code-of-conduct/');
    phantomcss.screenshot('html', 'hood.ie-code-of-conduct');
  });

  casper.then(function() {
    casper.open('localhost:3000/blog/');
    phantomcss.screenshot('html', 'hood.ie-blog');
  });


  casper.then(function() {
    casper.open('http://faq.hood.ie/');
    phantomcss.screenshot('html', 'hood.ie-faq');
  });

  casper.then(function() {
    casper.open('http://docs.hood.ie/');
    phantomcss.screenshot('html', 'hood.ie-docs');
  });

  casper.then(function(){
    casper.open('localhost:3000/');
  });

  casper.then(function() {
    casper.viewport(640, 640);
    casper.click('.menu-button');
    casper.waitForSelector('.menu-button.is-active', function success() {
      phantomcss.screenshot('html', 'hood.ie-menu');
    },
    function timeout() {
      casper.test.fail ('whooomp whooom whooohhoooomp...');
    });
  });

  casper.then(function() {
    phantomcss.compareAll();
  });

  casper.run(function() {
    console.log('\n~~**TESTS FINISHED**~~');
    casper.test.done();
  });
});
