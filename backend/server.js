const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./database/db");

const app = express();
const journalRoutes = require("./routes/journalRoutes");

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/journal", journalRoutes);

// test route
app.get("/", (req, res) => {
  res.send("AI Journal API running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});