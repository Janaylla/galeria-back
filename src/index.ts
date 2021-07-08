import dotenv from "dotenv";
import express from "express";
import {AddressInfo} from "net";

dotenv.config();
const app = express();

app.use(express.json());

const server = app.listen(3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server running on http://localhost:${address.port}`);
  } else {
    console.error(`Failed to run the server.`);
  }
});