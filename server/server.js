const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const app = express();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server running on http://localhost:" + port);
});
