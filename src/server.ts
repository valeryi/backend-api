import express from 'express';
import { applyGraphQLMiddleware } from './graphql';
import { applyExpressMiddleware, wrappers } from './middlewares/index';
import { applyErrorHandlers } from './errorHandlers';
import * as errorHandlers from './errorHandlers/handlers';
import { sysLog } from './utils/winston';
import { env } from './environments';
import { database } from './db/mongoose';

process.on("uncaughtException", e => { // LEARN: learn more about process and its properties and methods 
    console.log(e);
    process.exit(1);
});

process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1);
});

const app = express();
database.init();

applyExpressMiddleware(app, wrappers);
applyGraphQLMiddleware(app);
applyErrorHandlers(app, errorHandlers);

app.listen(env.port, () => {
    sysLog.info(`Server running at: http://localhost:${env.port}/graphql`)
});

// Here I receive all necessary params and data for setting up an express / apollo server 
// and apply all express middlewares - putting together all express modules

// Here is the place where I am putting everything together to run the server - from all the modules