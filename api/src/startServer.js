import { ApolloServer } from "apollo-server";
import { PubSub } from 'graphql-subscriptions';

import mongoose from 'mongoose';

function startServer({ typeDefs, resolvers }) {

  mongoose.connect('mongodb://localhost:27017/graphql', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const pubsub = new PubSub();

  const server = new ApolloServer({
    typeDefs, resolvers, context: ((req, res) => req)
  });

  server.listen().then(({ url }) => console.log(`Server started at ${url}`))
}

export default startServer;