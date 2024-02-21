module.exports = events;

function events(el, obj) {
  const handlers = {};

  function bind(name, handler, opts) {
    if (!handler) {
      handler = name;
    }
    if (typeof (handler) === 'string') {
      handler = obj[handler].bind(obj);
    }
    el.addEventListener(name, handler, opts);
    handlers[name] = {
      handler,
      opts
    };
  }

  function do_unbind(name) {
    const h = handlers[name];
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
    bind,
    unbind
  };
}
