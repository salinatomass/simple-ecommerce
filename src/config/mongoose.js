import { connect, connection } from "mongoose";
import { MONGODB_URL } from "../config";

(async () => {
  const db = await connect(MONGODB_URL);
  `[db:${db.connection.name}] Succesfuly connected!`;
})();

connection.on("connected", () => {
  console.log("Mongodb is connected");
});

connection.on("error", (err) => {
  console.error(`[db] ${err}`);
});

connection.on("disconnected", (err) => {
  console.log("Mongodb disconnected");
});

process.on("SIGINT", async () => {
  await connection.close();
  process.exit(0);
});
