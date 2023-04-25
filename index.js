const express = require("express");
const { connection } = require("./config/db");
require("dotenv").config();
const PORT = process.env.PORT;
const { userRouter } = require("./routes/user.routes");
const { flightRouter } = require("./routes/flight.routes");
const { bookingRouter } = require("./routes/booking.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to flight ticket API");
});

app.use("/user", userRouter);
app.use("/flight", flightRouter);
app.use("/booking", bookingRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`connected to DB and live in ${PORT}`);
  } catch (err) {
    console.log("Error while connecting to DB", err);
  }
});
