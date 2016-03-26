import User from '../models/user.js';

export default function loadInfo() {
  return User.forge({id: 44}).fetch().then( user => {
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
