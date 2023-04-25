const express = require("express");
const { FlightModel } = require("../models/flight.model");
const flightRouter = express.Router();

//Get all flights
flightRouter.get("/flights", async (req, res) => {
  try {
    const flights = await FlightModel.find();
    res.send(flights);
  } catch (error) {
    console.log("Error in get all flights endpoint", error);
    res.send("Error in get all flights endpoint");
  }
});

//Get flight by ID
flightRouter.get("/flights/:id", async (req, res) => {
  try {
    const flight = await FlightModel.findById(req.params.id);
    if (!flight) {
      console.log("Flight not found");
      res.send("Flight not found");
    }
    res.send(flight);
  } catch (error) {
    console.log("Error in get flight by ID endpoint", error);
    res.send("Error in get flight by ID endpoint");
  }
});

//Create flights
flightRouter.post("/flights", async (req, res) => {
  const {
    airline,
    flightNo,
    departure,
    arrival,
    departureTime,
    arrivalTime,
    seats,
    price,
  } = req.body;

  try {
    const flight = new FlightModel({
      airline,
      flightNo,
      departure,
      arrival,
      departureTime,
      arrivalTime,
      seats,
      price,
    });

    await flight.save();
    res.send("Flight created Successfully");
  } catch (error) {
    console.log("Error while creating the flight", error);
    res.send("Error while creating the flight");
  }
});

//update Flights

flightRouter.patch("/flights/:id", async (req, res) => {
  const ID = req.params.id;

  try {
    const flight = await FlightModel.findByIdAndUpdate({ _id: ID }, req.body, {
      new: true,
    });
    if (!flight) {
      res.send({ msg: `Flight with ID ${req.params.id} not found` });
    }

    res.send(`flight with ID ${req.params.id} updated`);
  } catch (error) {
    console.log("Error while updating the flight", "error: ", error);
    res.send("Error while updating the flight");
  }
});

flightRouter.delete("/flights/:id", async (req, res) => {
  const ID = req.params.id;

  try {
    const flight = await FlightModel.findByIdAndDelete({ _id: ID });
    if (!flight) {
      res.send({ msg: `Flight with ID ${req.params.id} not found` });
    }

    res.send(`flight with ID ${req.params.id} was Deleted`);
  } catch (error) {
    console.log("Error while deleting the flight", "error: ", error);
    res.send("Error while deleting the flight");
  }
});

module.exports = {
  flightRouter,
};
