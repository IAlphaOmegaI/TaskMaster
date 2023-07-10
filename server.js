const express = require("express");
const path = require("path");

const app = express();

// Serve static files from the dist directory
app.use(express.static(path.resolve(__dirname, "front-end")));

// Catch-all route to serve your index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "front-end", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at port: ${port}`));
