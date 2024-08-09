const fs = require("fs");
const { translate } = require("./translate");
const cors = require("cors");
const express = require("express");
const path = require("path");
const geoip = require("geoip-lite");
const rateLimit = require("express-rate-limit");
const app = express();
const port = process.env.PORT || 8000;

let visitorCount = 0;
let visitorLog = [];

// Use CORS middleware
app.use(
  cors({
    origin: [
      "http://localhost:5501",
      "http://127.0.0.1:5501",
      "http://127.0.0.1:5500",
      "http://localhost:3000",
      "https://latin-r3z3.onrender.com",
      "https://latin-1.onrender.com",
      "https://latinreader.app",
      "https://www.latinreader.app",
      "http://localhost:8000",
    ],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type",
  })
);

// Middleware to log request and response headers
app.use((req, res, next) => {
  console.log("Request Headers:", req.headers);
  res.on("finish", () => {
    console.log("Response Headers:", res.getHeaders());
  });
  next();
});

// Visitor tracking middleware
app.use((req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const geo = geoip.lookup(ip);

  visitorCount += 1;

  const visitorData = {
    id: visitorCount,
    ip: ip,
    location: geo ? `${geo.city}, ${geo.country}` : "Unknown",
    time: new Date().toISOString(),
  };

  visitorLog.push(visitorData);

  console.log(`Visitor #${visitorCount}:`, visitorData);

  // Optionally save the visitor log to a file
  fs.appendFile(
    path.join(__dirname, "visitor_log.json"),
    JSON.stringify(visitorData) + "\n",
    (err) => {
      if (err) console.error("Error saving visitor log:", err);
    }
  );

  next();
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Route to handle visitor statistics
app.get("/visitors", (req, res) => {
  res.json({
    totalVisitors: visitorCount,
    recentVisitors: visitorLog.slice(-10), // Last 10 visitors
  });
});

// Route handler for translation
app.get("/translate", (req, res) => {
  const word = req.query.word;
  console.log("Received word for translation:", word);
  translate(word)
    .then((result) => {
      res.setHeader("Content-Type", "text/plain");
      res.send(result);
    })
    .catch((error) => {
      console.error("Error translating word:", error);
      res.status(500).send(error);
    });
});

// Route to handle text file requests
app.get("/textfile", (req, res) => {
  const { author, title } = req.query;
  const filePath = path.join(__dirname, "latintexts", author, `${title}.txt`);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      res.status(500).send("Error reading the file");
      return;
    }
    res.setHeader("Content-Type", "text/plain");
    res.send(data);
  });
});

app.get("/initnotes", (req, res) => {
  const author = req.query.author || req.params.author;
  const directoryPath = author
    ? path.join(__dirname, "latintexts", author)
    : path.join(__dirname, "latintexts");
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${directoryPath}:`, err);
      return res
        .status(500)
        .send(`Error reading directory ${directoryPath}: ${err.message}`);
    }
    res.json(files);
  });
});

// Start the server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening on port ${port}`);
});
