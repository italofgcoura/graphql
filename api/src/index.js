import startServer from "./startServer";

import typeDefs from './graphql/typedefs';
import resolvers from './graphql/resolvers';
console.log('teste')
startServer({ typeDefs, resolvers })