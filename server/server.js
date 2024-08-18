import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// NOTE: Mongoose tutorial:
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  console.log("success");
  const kittySchema = new mongoose.Schema({
    name: String,
  });

  kittySchema.methods.speak = function speak() {
    const greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  };

  const Kitten = mongoose.model("Kitten", kittySchema);
  const fluffy = new Kitten({ name: "fluffy" });
  fluffy.speak(); // "Meow name is fluffy"
  await fluffy.save();
  fluffy.speak();
  const kittens = await Kitten.find();
  await Kitten.deleteMany({ name: "fluffy" });
  console.log(kittens);
}

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from server");
  // res.json({ hello: "hello from server" });
});

app.post("/", (req, res) => {
  res.json({ payload: req.body });
});

app.listen(port, () => {
  console.log("Server running!");
});
