const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

const dotenv = require("dotenv");

const Routes = require('./routes/route')

const PORT = process.env.PORT || 5001;

const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDb"))
  .catch((err) => console.log("Not Connected To Netword", err));

app.get("/", Routes);

app.listen(PORT, () => {
  console.log(`Server started at Port no .${PORT}`);
});

