const { Reserva } = require("../models/reserva");
const { connectToDb, disconnectFromDb } = require("../utils.js");

async function addNewReserva(reservaData) {
  try {
    // Create / connect to collection reservas
    await connectToDb();
    console.log(reservaData);

    // Create new reserva (create new document)
    const newReserva = new Reserva(reservaData);

    // Save new reserva
    await newReserva.save();

    // Query all reservas
    const reservas = await Reserva.find();
    console.log(reservas);

    //NOTE: To clean db:
    // await Reserva.deleteMany({ name: "john doe" });
    // Close connection
    disconnectFromDb();
  } catch (error) {
    console.log("An error occurred:" + error);
  }
}

async function readReservas() {
  try {
    await connectToDb();
    const dirtyReservas = await Reserva.find();
    if (dirtyReservas) {
      const reservas = await updateExpiredReservas(dirtyReservas);
      return reservas;
    }
    await disconnectFromDb();
  } catch (error) {
    console.log(error);
    await disconnectFromDb();
  }
}

async function updateExpiredReservas(reservas) {
  const filteredReservas = reservas.filter((reserva) => {
    const nowTimeStamp = new Date().getTime();
    const reservaTimeStamp = reserva.date.getTime();

    if (reservaTimeStamp >= nowTimeStamp) {
      return true;
    } else {
      (async () => {
        await Reserva.updateOne(
          { _id: reserva._id },
          {
            expired: true,
          },
        );
      })();
      return false;
    }
  });
  return filteredReservas;
}

module.exports = { addNewReserva, readReservas, updateExpiredReservas };
