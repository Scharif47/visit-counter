const express = require("express");
const redis = require("redis");

// Get functionality from express
const app = express();
// Create a redis client
const client = redis.createClient({
  host: "redis-server",
  port: 6379,
});

// Set initial value
client.set("visits", 0);

// GET method for sending response to client
app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    res.send("Number of visits is: " + visits);
    client.set("visits", parseInt(visits) + 1);
  });
});

// Listen on port 8081
app.listen(8081, () => {
  console.log("Listening on port 8081");
});
