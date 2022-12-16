import startServer from "./startServer";

import typeDefs from './graphql/typedefs';
import resolvers from './graphql/resolvers';

startServer({ typeDefs, resolvers })