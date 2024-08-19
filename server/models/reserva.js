const mongoose = require("mongoose");
// Create schema
const reservaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  bday: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
});

// Create model
const Reserva = mongoose.model("Reserva", reservaSchema);

// Export the model
module.exports = {
  Reserva: Reserva,
};
