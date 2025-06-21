'use strict';

function _typeof(o) {
  '@babel/helpers - typeof';
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (o) {
            return typeof o;
          }
        : function (o) {
            return o &&
              'function' == typeof Symbol &&
              o.constructor === Symbol &&
              o !== Symbol.prototype
              ? 'symbol'
              : typeof o;
          }),
    _typeof(o)
  );
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r &&
      (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })),
      t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2
      ? ownKeys(Object(t), !0).forEach(function (r) {
          _defineProperty(e, r, t[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
        : ownKeys(Object(t)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
          });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (
    (r = _toPropertyKey(r)) in e
      ? Object.defineProperty(e, r, {
          value: t,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[r] = t),
    e
  );
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, 'string');
  return 'symbol' == _typeof(i) ? i : i + '';
}
function _toPrimitive(t, r) {
  if ('object' != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || 'default');
    if ('object' != _typeof(i)) return i;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return ('string' === r ? String : Number)(t);
}
var fs = require('fs');
var tours = JSON.parse(
  fs.readFileSync(''.concat(__dirname, '/../dev-data/data/tours-simple.json')),
);
exports.checkID = function (req, res, next, val) {
  console.log('Tour id is: '.concat(val));
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};
exports.checkBody = function (req, res, next) {
  var body = req.body;
  if (!body.name || body.name === '' || !body.price || body.price === '') {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing Fields',
    });
  }
  next();
};
exports.getAllTours = function (req, res) {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};
exports.getTour = function (req, res) {
  console.log(req.params);
  var tour = tours.find(function (el) {
    return el.id === req.params.id;
  });
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};
exports.createNewTour = function (req, res) {
  // console.log(req.body);

  var newId = tours[tours.length - 1].id + 1;
  var newTour = _objectSpread(
    {
      id: newId,
    },
    req.body,
  );
  tours.push(newTour);
  fs.writeFile(
    ''.concat(__dirname, '/dev-data/data/tours-simple.json'),
    JSON.stringify(tours),
    function () {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
  // res.send('Done');
};
exports.updateTour = function (req, res) {
  var sus = tours.find(function (el) {
    return el.id === req.params.id;
  });
  sus.map(function (el) {
    if (req.body[el]) {
      sus[el] = req.body[el];
    }
    return sus;
  });
  // for (s in sus) {
  //   if (req.body[s]) {
  //     sus[s] = req.body[s];
  //   }
  // }
  var idx = tours.indexOf(sus);
  tours[idx] = sus;
  console.log(tours);
  fs.writeFile(
    ''.concat(__dirname, '/dev-data/data/tours-simple.json'),
    JSON.stringify(tours),
    function () {
      res.status(200).json({
        status: 'success',
        data: {
          sus: sus,
        },
      });
    },
  );
  // res.status(200).json({status: 'success'});
};
exports.deleteTour = function (req, res) {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
