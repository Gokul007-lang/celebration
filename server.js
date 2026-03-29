const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

/* 🔥 CONNECT TO MONGODB */
mongoose.connect("mongodb+srv://Gokul:<NOTU@2340>@cluster0.fp4hxwy.mongodb.net/?appName=Cluster0")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ Mongo Error:", err));

/* SCHEMA */
const wishSchema = new mongoose.Schema({
name: String,
msg: String
});

const Wish = mongoose.model("Wish", wishSchema);

/* ADD WISH */
app.post("/wish", async (req, res) => {
const { name, msg } = req.body;

```
if (!name || !msg) {
    return res.json({ success: false });
}

const newWish = new Wish({ name, msg });
await newWish.save();

res.json({ success: true });
```

});

/* GET ALL WISHES */
app.get("/wishes", async (req, res) => {
const data = await Wish.find();
res.json(data);
});

/* DELETE */
app.delete("/delete/:id", async (req, res) => {
await Wish.findByIdAndDelete(req.params.id);
res.json({ success: true });
});

/* HOME */
app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "index.html"));
});

/* START SERVER */
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
console.log("🚀 Server running");
});
