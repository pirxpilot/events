module.exports = events;

function events(el, obj) {
  const handlers = new Map();

  function bind(name, handler, opts) {
    if (!handler) {
      handler = name;
    }
    if (typeof handler === 'string') {
      handler = obj[handler].bind(obj);
    }
    el.addEventListener(name, handler, opts);
    handlers.set(name, {
      handler,
      opts
    });
  }

  function do_unbind(name) {
    const h = handlers.get(name);
    if (h) {
      el.removeEventListener(name, h.handler, h.opts);
      handlers.delete(name);
    }
  }

  function unbind(name) {
    return name ? do_unbind(name) : unbindAll();
  }

  function unbindAll() {
    handlers.forEach((h, name) => el.removeEventListener(name, h.handler, h.opts));
    handlers.clear();
  }

  return {
    bind,
    unbind
  };
}
