const { describe, it } = require('node:test');

const events = require('../');

describe('events', function () {
  it('must bind event', function () {
    let clicks = 0;
    const handlers = {
      click() { clicks++; }
    };
    const div = document.createElement('div');

    events(div, handlers).bind('click');

    div.click();
    clicks.should.eql(1);
    div.click();
    clicks.should.eql(2);
  });

  it('must bind event when method name is passed', function () {
    let clicks = 0;
    const handlers = {
      onclick() { clicks++; }
    };
    const div = document.createElement('div');

    events(div, handlers).bind('click', 'onclick');

    div.click();
    clicks.should.eql(1);
    div.click();
    clicks.should.eql(2);
  });

  it('must unbind event', function () {
    let clicks = 0;
    const handlers = {
      click() { clicks++; }
    };
    const div = document.createElement('div');

    const e = events(div, handlers);

    e.bind('click');

    div.click();
    clicks.should.eql(1);

    e.unbind('click');

    div.click();
    clicks.should.eql(1);
  });

  it('must unbind all events when no event name is passed', function () {
    let clicks = 0;
    let foos = 0;
    const handlers = {
      click() { clicks++; },
      foo() { foos++; }
    };
    const div = document.createElement('div');
    const ev = new CustomEvent('foo');

    const e = events(div, handlers);

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
