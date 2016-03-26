import User from '../../models/user.js';

export default function login(req) {
  const email = req.body.email;
  const password = req.body.password;

  return User.login(email, password)
  .then( user => {
    return Promise.resolve({
      error: false,
      user: user,
      token: user.generateJWT()
    });
  })
  .catch( err => {
    return Promise.reject({
      error: true,
      msg: err.message
    });
  });
}
