const express = require("express");
const { BookingModel } = require("../models/booking.model");
const { FlightModel } = require("../models/flight.model");
const { UserModel } = require("../models/user.model");
const bookingRouter = express.Router();

//booking POST
bookingRouter.post("/", async (req, res) => {
  const { user, flight } = req.body;

  try {
    const users = await UserModel.findById({ _id: user });
    const flights = await FlightModel.findById({ _id: flight });
    if (!user) {
      res.send({ msg: "User not found" });
    } else if (!flight) {
      res.send({ msg: "flight not found" });
    } else {
      const book = new BookingModel({ user: users, flight: flights });
      await book.save();
      res.send({ msg: "Flight booked", book });
    }
  } catch (error) {
    console.log("Error while booking the flight", error);
    res.send("Error while booking the flight");
  }
});

bookingRouter.get("/dashboard", async (req, res) => {
  const bookings = await BookingModel.find();
  res.send(bookings);
});

module.exports = {
  bookingRouter,
};
