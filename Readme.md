[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][gemnasium-image]][gemnasium-url]

# pirxpilot-events

Simple dom event management. Heavily inspired by [component/events].
Use when multiple event listeners are naturally part of the same object.

## Install

```sh
$ npm install --save @pirxpilot/events
```

## Usage

```js
var events = require('@pirxpilot/events');
var el = document.querySelector('button.ok');
var handlers = {
  click: function() {
    // do something on click
  },
  onblur: function() {
    // do something on blur
  }
};

var e = events(el, obj);
e.bind('click');

// add handlers
e.bind('mouseenter');
e.bind('blur', 'onblur');

e.unbind();
```

## API

### events(el, obj)

create events for dom element `el` and handlers object `obj`

### bind(event, [method])

add event listener and bind it to `obj` - if `method` is not specified use method that has the same name as event ie. use `mouseup` method for `mouseup` event

### Events.unbind([event])

remove event listener for specific `event`, if `event` is not specified remove all registered listeners

## License

MIT © [Damian Krzeminski](https://pirxpilot.me)

[npm-image]: https://img.shields.io/npm/v/pirxpilot-events.svg
[npm-url]: https://npmjs.org/package/pirxpilot-events

[travis-url]: https://travis-ci.org/pirxpilot/pirxpilot-events
[travis-image]: https://img.shields.io/travis/pirxpilot/pirxpilot-events.svg

[gemnasium-image]: https://img.shields.io/gemnasium/pirxpilot/pirxpilot-events.svg
[gemnasium-url]: https://gemnasium.com/pirxpilot/pirxpilot-events
