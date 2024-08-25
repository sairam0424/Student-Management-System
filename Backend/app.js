const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

const dotenv = require("dotenv");

const PORT = process.env.PORT || 5001;

const app=express()

dotenv.config();

app.use(express.json());

app.get('/',(req,res)=>{

	res.send("Hello from Nodejs Server")
})

app.listen(PORT, () => {
  console.log(`Server started at Port no .${PORT}`);
});


