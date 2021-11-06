const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { typeDefs, resolvers } = require("./graphql/schema");

async function startMongoDB() {
  const server = process.env.SERVER || "localhost";
  const database = process.env.DATABASE || "twitter-clone";

  mongoose.connection.once("open", () =>
    console.log("🗃️  Connected to a MongoDB instance")
  );
  mongoose.connection.on("error", error => console.error(error));

  try {
    await mongoose.connect(`mongodb://${server}/${database}`, {
      useNewUrlParser: true
    });
  } catch (error) {
    console.log("Failed to connect to MongoDB", err);
  }
}

async function startApolloServer() {
  const port = process.env.PORT || 4000;

  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });

  await server.start();
  server.applyMiddleware({ app });

  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
  await new Promise(resolve => httpServer.listen({ port }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
}

async function setupServer() {
  await startMongoDB();
  await startApolloServer(typeDefs, resolvers);
}

setupServer();
