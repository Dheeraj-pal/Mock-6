const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const bookingSchema = mongoose.Schema({
  user: { type: ObjectId, ref: "user" },
  flight: { type: ObjectId, ref: "flight" },
});

const BookingModel = mongoose.model("booking", bookingSchema);

module.exports = {
  BookingModel,
};
