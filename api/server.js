const express = require("express");
const { errHandler } = require("./server-middleware.js");
const accounts = require("./accounts/accounts-router.js");
const server = express();

server.use(express.json());
server.use("/api/accounts", accounts);
server.use(errHandler);
module.exports = server;
