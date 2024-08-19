const mongoose = require("mongoose");
const { Reserva } = require("./reserva");

async function addNewReserva(reservaData) {
  try {
    // Create / connect to collection reservas
    await mongoose.connect("mongodb://127.0.0.1:27017/reservas");
    console.log("Successfully connected into reservas db");

    // Create new reserva (create new document)
    const newReserva = new Reserva(reservaData);

    // Save new reserva
    await newReserva.save();

    // Query all reservas
    const reservas = await Reserva.find();
    console.log(reservas);

    //NOTE: To clean db:
    await Reserva.deleteMany({ name: "john doe" });
  } catch (error) {
    console.log("An error occurred:" + error);
  }
}

module.exports = { addNewReserva };
