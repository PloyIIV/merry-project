import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";

async function init() {
  const app = express();
  const port = 4000;

  const corsConfig = {
    origin: "*",
    credential: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
  }
  app.options("", cors(corsConfig));
  app.use(cors(corsConfig));
  app.use(bodyParser.json());
  app.use(express.json());
  // app.use(express.urlencoded({ extended: true }));

  // Endpoint
  app.use('/admin', adminRouter);
  app.use('/user', userRouter);

  app.get("/", (req, res) => {
    res.send("API is working");
  });

  app.get("*", (req, res) => {
    res.status(404).send("ERROR: Server");
  });

  app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
  });
}

init();
