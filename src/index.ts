import dotenv from "dotenv";
import express from "express";
import {AddressInfo} from "net";
import cors from 'cors'
import {userRouter} from './router/UserRouter'
import {tagRouter} from './router/TagRouter'
import {collectionRouter} from './router/CollectionRouter'
import { imageRouter } from "./router/ImageRouter";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/tags', tagRouter)
app.use('/collections', collectionRouter)
app.use('/images', imageRouter)


const server = app.listen(process.env.PORT|| 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server running on http://localhost:${address.port}`);
  } else {
    console.error(`Failed to run the server.`);
  }
});