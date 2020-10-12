import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';

import '@shared/infra/typeorm';
import '@shared/container';

import schema from '../graphql/schema';
import { createContext } from '../graphql/context';

const main = async () => {
  const app = express();

  app.use(cors());

  const apolloServer = new ApolloServer({
    schema: await schema,
    context: createContext,

    formatError: err => {
      return err;
      //   return {
      //     ...err,
      //     message:
      //       err.originalError instanceof ApolloError
      //         ? err.message
      //         : 'Internal Server Error',
      //     locations: [],
      //     extensions: [],
      //   };
    },
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(3333, () => console.log('Server listenning on port 3333!'));
};

main().catch(err => console.log(err));
