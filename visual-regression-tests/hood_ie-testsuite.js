var casper = require('casper').create({
  viewportSize: {
    width: 1440,
    height: 800
  }
});
var fs = require('fs');
var path = fs.absolute(fs.workingDirectory + '/node_modules/phantomcss/phantomcss.js');
var phantomcss = require(path);

  phantomcss.init({
    //create new baseline images without manually deleting the files casperjs demo/test.js --rebase
    rebase: casper.cli.get('rebase'),
    casper: casper,
    libraryRoot: fs.absolute(fs.workingDirectory + '/node_modules/PhantomCSS'),
    screenshotRoot: fs.absolute(fs.workingDirectory + '/visual-regression-tests/screenshots'),
    failedComparisonsRoot: fs.absolute(fs.workingDirectory + '/visual-regression-tests/screenshots/failures'),
    cleanupComparisonImages: true,
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

  phantomcss.turnOffAnimations()

casper.test.begin('testing navigation and title on homepage', 4, function suite(test) {
  casper.start('http://hood.ie/', function() {
      test.assertTitle('hood.ie', 'hood.ie homepage title is the one expected');
      test.assertExists('a.logo', 'hood.ie logo is present and an anchor tag');
      test.assertExists('nav.main-nav', 'main-nav is present');
      test.assertEval(function() {
        var navLinks = __utils__.findAll("nav.main-nav > a");
        return navLinks.length === 7;
      }, "main navigation has 7 links");
      this.captureSelector('visual-regression-tests/screenshots/hoodie.png', 'body');
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin('testing titles and headers across hood.ie/*', 26, function suite(test) {

  casper.start('http://hood.ie/intro', function () {
    test.assertTitle('hood.ie intro', 'the intro title is correct');
    test.assertSelectorHasText('div.teaser > article > h1', 'Welcome to Hoodie!');
  });

  casper.thenOpen('http://hood.ie/contribute/', function () {
    test.assertTitle('hood.ie contribute', 'the contribute title is correct');
    test.assertSelectorHasText('div.teaser > article > h1', 'Contribute');
  });

  casper.thenOpen('http://hood.ie/get-help/', function () {
    test.assertTitle('hood.ie get help', 'the get help title is correct');
    test.assertSelectorHasText('div.teaser > article > h1', 'Get help');
  });

  casper.thenOpen('http://hood.ie/about/', function () {
    test.assertTitle('hood.ie about', 'the about title is correct');
    test.assertSelectorHasText('div.teaser > article > h1', 'About');
  });

  casper.thenOpen('http://hood.ie/community/', function () {
    test.assertTitle('hood.ie community', 'the community title is correct');
    test.assertSelectorHasText('div.teaser > article > h1', 'We are the Hoodies');
  });

  casper.thenOpen('http://hood.ie/animals/', function () {
    test.assertTitle('hood.ie animals', 'the animals title is correct');
    test.assertSelectorHasText('div.teaser > article > h1', 'The Hoodie Animals');
  });

  casper.thenOpen('http://hood.ie/contact/', function () {
    test.assertTitle('hood.ie contact', 'the contact title is correct');
    test.assertSelectorHasText('div.teaser > article > h1', 'Contact');
  });

  casper.thenOpen('http://hood.ie/events/', function () {
    test.assertTitle('hood.ie', 'the events title is correct');
    test.assertSelectorHasText('div.teaser > article > h1', 'Events');
  });

  casper.thenOpen('http://hood.ie/initiatives/', function () {
    test.assertTitle('hood.ie initiatives', 'the initiatives title is correct');
    test.assertSelectorHasText('div.teaser > article > h1', 'Initiatives');
  });

  casper.thenOpen('http://hood.ie/bug/', function () {
    test.assertTitle('hood.ie Report a Bug', 'the bug title is correct');
    test.assertSelectorHasText('div.teaser > article > h1', 'Bug');
  });

  casper.thenOpen('http://hood.ie/friends/', function () {
    test.assertTitle('hood.ie friends', 'the friends title is correct');
    test.assertSelectorHasText('div.teaser > article > h1', 'Friends');
  });

  casper.thenOpen('http://hood.ie/merchandise/', function () {
    test.assertTitle('hood.ie merchandise', 'the merchandise title is correct');
    test.assertSelectorHasText('div.teaser > article > h1', 'Merchandise');
  });

  casper.thenOpen('http://hood.ie/code-of-conduct/', function () {
    test.assertTitle('hood.ie code of conduct', 'the code-of-conduct title is correct');
    test.assertSelectorHasText('div.teaser > article > h1', 'The Hoodie Community Code of Conduct');
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin('testing titles and headers across docs.hood.ie/*', 16, function suite(test) {
  casper.start('http://docs.hood.ie', function() {
    test.assertTitle('Hood.ie Docs', 'docs title is the one expected');
    test.assertSelectorHasText('div.cb > article > h1', 'Welcome to the Hoodie Documentation');
  });

  casper.thenOpen('http://docs.hood.ie/en', function() {
    test.assertTitle('Hood.ie Docs', 'docs/en title is the one expected');
    test.assertSelectorHasText('div.cb > article > h1', 'Welcome to Hoodie');
  });

  casper.thenOpen('http://docs.hood.ie/en/start', function() {
    test.assertTitle('Hood.ie Docs', 'docs/en/start title is the one expected');
    test.assertSelectorHasText('div.cb > article > h1', 'Installing Hoodie on your System');
  });

  casper.thenOpen('http://docs.hood.ie/en/tutorials', function() {
    test.assertTitle('Hood.ie Docs', 'docs/en/tutorials title is the one expected');
    test.assertSelectorHasText('div.cb > article > h1', 'Getting started with Hoodie - Part 2');
  });

  casper.thenOpen('http://docs.hood.ie/en/techdocs', function() {
    test.assertTitle('Hood.ie Docs', 'docs/en/techdocs title is the one expected');
    test.assertSelectorHasText('div.cb > article > h1', 'Hoodie API Guide');
  });

  casper.thenOpen('http://docs.hood.ie/en/plugins', function() {
    test.assertTitle('Hood.ie Docs', 'docs/en/plugins title is the one expected');
    test.assertSelectorHasText('div.cb > article > h1', 'Plugins');
  });

  casper.thenOpen('http://docs.hood.ie/en/deployment', function() {
    test.assertTitle('Hood.ie Docs', 'docs/en/deployment title is the one expected');
    test.assertSelectorHasText('div.cb > article > h1', 'Deployment');
  });

  casper.thenOpen('http://docs.hood.ie/en/community', function() {
    test.assertTitle('Hood.ie Docs', 'docs/en/community title is the one expected');
    test.assertSelectorHasText('div.cb > article > h1', 'You\'d love to help us?');
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin('testing titles and headers on faq.hood.ie', 2, function suite(test) {
  casper.thenOpen('http://faq.hood.ie', function() {
    if (this.exists('#logo-animation')) {
      test.assertSelectorHasText('#logo-animation', 'Frequently Asked Questions');
    }
    test.assertTitle('Hoodie - Frequently Asked Questions', 'faq title is the one expected');
  });

  casper.run(function() {
    test.done();
  });

  casper.then(function () {
    this.exit();
  });
});
