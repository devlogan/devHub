const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

require("dotenv").config();

const app = express();

// Load environment variables

const mongoURI = process.env.MONGO_URI;
// connect database
connectDB(mongoURI);

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./routes/api/user"));

app.use("/api/auth", require("./routes/api/auth"));

app.use("/api/profile", require("./routes/api/profile"));

app.use("/api/post", require("./routes/api/post"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
