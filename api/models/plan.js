import Bookshelf from '../config/bookshelf';
import User from './user';

const Plan = Bookshelf.Model.extend({
  tableName: 'subscription_plans',
  trialUsers: function() {
    return this.belongsToMany(User, 'users_plans', 'plan_id', 'user_id')
      .query({where: {plan_id: 1}});
  },
  starterUsers: function() {
    return this.belongsToMany(User, 'users_plans', 'plan_id', 'user_id')
      .query({where: {plan_id: 2}});
  },
  growthUsers: function() {
    return this.belongsToMany(User, 'users_plans', 'plan_id', 'user_id')
      .query({where: {plan_id: 3}});
  },
  enterpriseUsers: function() {
    return this.belongsToMany(User, 'users_plans', 'plan_id', 'user_id')
      .query({where: {plan_id: 4}});
  },
}, {
  trial: {
    id: 1,
    name: 'Trial'
  }
})

export default Plan;
