import User from '../../../models/User'

import { USER_ADDED } from './channels';


export default {
  User: {
    fullName: (user) => `${user.firstName} ${user.lastName}`
  },
  Query: {
    users: async (_, req,res) => {
      console.log('c', req, res)

      return await User.find()
    },
    user: async (a, { id }) => {
      console.log(a)
      return await User.findById(id)
    }
  },
  Mutation: {
    createUser: async (_, { data }, { pubsub }) => {

      const user = await User.create(data);

      pubsub.publish(USER_ADDED, {
        userAdded: user
      });

      return user;
    },
    updateUser: async (_, { id, data }) => await User.findOneAndUpdate(id, data, { new: true }),
    deleteUser: async (_, { id }) => {
      const deleted = await User.findOneAndDelete(id);
      return !!deleted;
    }
  },
  Subscription: {
    userAdded: {
      subscribe: (obj, args, { pubsub }) => pubsub.asyncIterator(USER_ADDED)
    }
  }
}