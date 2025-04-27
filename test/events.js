const test = require('node:test');

const events = require('../');

test('must bind event', t => {
  let clicks = 0;
  const handlers = {
    click() {
      clicks++;
    }
  };
  const div = document.createElement('div');

  events(div, handlers).bind('click');

  div.click();
  t.assert.equal(clicks, 1);
  div.click();
  t.assert.equal(clicks, 2);
});

test('must bind event when method name is passed', t => {
  let clicks = 0;
  const handlers = {
    onclick() {
      clicks++;
    }
  };
  const div = document.createElement('div');

  events(div, handlers).bind('click', 'onclick');

  div.click();
  t.assert.equal(clicks, 1);
  div.click();
  t.assert.equal(clicks, 2);
});

test('must unbind event', t => {
  let clicks = 0;
  const handlers = {
    click() {
      clicks++;
    }
  };
  const div = document.createElement('div');

  const e = events(div, handlers);

  e.bind('click');

  div.click();
  t.assert.equal(clicks, 1);

  e.unbind('click');

  div.click();
  t.assert.equal(clicks, 1);
});

test('must unbind all events when no event name is passed', t => {
  let clicks = 0;
  let foos = 0;
  const handlers = {
    click() {
      clicks++;
    },
    foo() {
      foos++;
    }
  };
  const div = document.createElement('div');
  const ev = new CustomEvent('foo');

  const e = events(div, handlers);

  e.bind('click');
  e.bind('foo');

  div.click();
  div.dispatchEvent(ev);

  t.assert.equal(clicks, 1);
  t.assert.equal(foos, 1);

  // unbind all
  e.unbind();

  div.click();
  div.dispatchEvent(ev);

  t.assert.equal(clicks, 1);
  t.assert.equal(foos, 1);
});
