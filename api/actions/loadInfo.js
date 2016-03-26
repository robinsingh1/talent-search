import User from '../models/user.js';

export default function loadInfo(req) {
  return User.forge({id: req.user.id}).fetch({require: true}).then( user => {
    return user.remainingRequests();
  })
  .then( res => {
    return Promise.resolve({
      error: false,
      remaining: res
    })
  })
  .catch( err => {
    return Promise.reject({
      error: true,
      msg: err.message
    })
  })
}
