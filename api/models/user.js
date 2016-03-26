import Promise from 'bluebird';
import bcrypt from 'bcrypt';
import Bookshelf from '../config/bookshelf';
import Plan from './plan';

const User = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function() {
    this.on('saving', this.validateSave);
  },

  validateSave: function() {
    // TODO:- Input Validation
  },

  currentPlan: function() {
    return this.belongsToMany(Plan, 'users_plans', 'user_id', 'plan_id')
               .query({where: {active: true}});
  },

}, {

  login: Promise.method(function(email, password) {
    if(!email || !password) throw new Error('Email and password both required');

    return new this({email: email.toLowerCase().trim()}).fetch({require: true})
      .tap((customer) => {
        return bcrypt.compareAsync(customer.get('password'), password)
          .then((res) => {
            if (!res) throw new Error('Invalid password');
          })
      })
  }),


  register: Promise.method(function(email, password) {
    if(!email || !password) throw new Error('Email and password both required');

    var self = this;

    return new self({email: email.toLowerCase().trim()}).fetch()
      .then(function(user){
        if (user) throw new Error('User with email already exists');

        // hash pw
        const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(11));

        // save user
        return new self({email: email.toLowerCase().trim(), password: hash}).save();
      })
      .then((user) => {
        // Assign Trial Plan
        return user.currentPlan().attach({
          plan_id: Plan.trial.id,
          active: true,
          created_at: new Date(),
          updated_at: new Date()
        });
      })
  })

})

export default User;
