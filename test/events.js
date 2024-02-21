const { describe, it } = require('node:test');

var events = require('../');

describe('events', function () {
  it('must bind event', function () {
    var clicks = 0;
    var handlers = {
      click: function() { clicks++; }
    };
    var div = document.createElement('div');

    events(div, handlers).bind('click');

    div.click();
    clicks.should.eql(1);
    div.click();
    clicks.should.eql(2);
  });

  it('must bind event when method name is passed', function () {
    var clicks = 0;
    var handlers = {
      onclick: function() { clicks++; }
    };
    var div = document.createElement('div');

    events(div, handlers).bind('click', 'onclick');

    div.click();
    clicks.should.eql(1);
    div.click();
    clicks.should.eql(2);
  });


  it('must unbind event', function () {
    var clicks = 0;
    var handlers = {
      click: function() { clicks++; }
    };
    var div = document.createElement('div');

    var e = events(div, handlers);

    e.bind('click');

    div.click();
    clicks.should.eql(1);

    e.unbind('click');

    div.click();
    clicks.should.eql(1);
  });


  it('must unbind all events when no event name is passed', function () {
    var clicks = 0;
    var foos = 0;
    var handlers = {
      click: function() { clicks++; },
      foo: function() { foos++; }
    };
    var div = document.createElement('div');
    var ev = new CustomEvent('foo');

    var e = events(div, handlers);

    e.bind('click');
    e.bind('foo');

    div.click();
    div.dispatchEvent(ev);

    clicks.should.eql(1);
    foos.should.eql(1);

    // unbind all
    e.unbind();

    div.click();
    div.dispatchEvent(ev);

    clicks.should.eql(1);
    foos.should.eql(1);
  });


});
