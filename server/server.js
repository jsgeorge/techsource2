const express = require("express");

const app = express();

app.use(express.static("client/build"));

//default
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.get("/*", (req, res) => {
    res.sendfile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
