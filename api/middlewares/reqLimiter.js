import redis from '../config/redis';
import moment from 'moment';
import HTTPStatus from 'http-status';

const reqLimiter = (req, res, next) => {
  req.user = {
    id: 44
  }

  // save this payload in the user requests sorted list.
  const payload = JSON.stringify({
    url: req.url,
    method: req.method
  });

  // atomically decrement a count and log to req list
  return redis.multi([
    ['DECRBY', `user:${req.user.id}:limit`, 1],
    ['ZADD', `user:${req.user.id}:requests`, moment().utc().unix(), payload]
  ])
  .execAsync()
  .then( results => {
    const remaining = results[0];
    if (remaining <= 0) {
      // No more requests available for this user.
      return res.status(HTTPStatus.FORBIDDEN).json({
        error: true,
        msg: 'Your account has run out of requests'
      });
    }
    next();
  })
  .catch( err => {
    console.log(err.message);
  });
};

export default reqLimiter;
