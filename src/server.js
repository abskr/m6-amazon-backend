import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import mongoose from 'mongoose'

import productsRouter from './services/products/index.js'
import reviewsRouter from './services/products/index.js'

import {
  notFoundHandler,
  badRequestHandler,
  genericErrorHandler,} from "./errorHandlers.js"

const server = express();

const port = process.env.PORT || 5000;

const whitelist = [process.env.FE_URL_DEV, process.env.FE_URL_PROD]
const corsOptions = {
  origin: function (origin, next) {
    if (whitelist.indexOf(origin) !== -1) {
      console.log("ORIGIN ", origin)
      // origin found in whitelist
      next(null, true)
    } else {
      // origin not found in the whitelist
      next(new Error("Not allowed by CORS"))
    }
  },
}

server.use(express.json());

server.use(cors(corsOptions));
//server.use(cors());

server.use('/products', productsRouter);
server.use('/reviews', reviewsRouter)

server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

console.log(listEndpoints(server));

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log("Running on port", port);
    })
  )
  .catch((err) => console.log(err));