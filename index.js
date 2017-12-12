module.exports = events;

function events(el, obj) {
  var handlers = {};

  function bind(name, handler, opts) {
    if (!handler) {
      handler = name;
    }
    if (typeof(handler) === 'string') {
      handler = obj[handler].bind(obj);
    }
    el.addEventListener(name, handler, opts);
    handlers[name] = {
      handler: handler,
      opts: opts
    };
  }

  function do_unbind(name) {
    var h = handlers[name];
    if (!h) { return; }
    el.removeEventListener(name, h.handler, h.opts);
    delete handlers[name];
  }

  function unbind(name) {
    if (!name) { return unbindAll(); }
    do_unbind(name);
  }

  function unbindAll() {
    Object.keys(handlers).forEach(do_unbind);
  }

  return {
    bind: bind,
    unbind: unbind
  };
}
