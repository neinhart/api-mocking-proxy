const timers = require('timers');

const createDelayer = function () {
  return function (req, res, next) {
    const end = res.end;

    if (!req.conf || !req.conf.delay) {
      return next();
    }

    const time = req.conf.delay;

    res.end = function () {
      const args = arguments;
      timers.setTimeout(function () {
        end.apply(res, args);
      }, time);
    };

    next();
  };
};

module.exports = createDelayer;
