import User from '../../models/user.js';

export default function signup(req) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return Promise.reject({
      error: 'Missing email and password'
    });
  }

  return User.register(email, password)
  .then(()=>{
    return Promise.resolve({
      error: false,
      msg: 'User successfully created'
    });
  })
  .catch((err) => {
    return Promise.reject({
      error: true,
      msg: err.message
    });
  });
}
