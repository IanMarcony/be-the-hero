const express = require("express");
const crypto = require("crypto");
const connection = require("./database/connection");

const routes = express.Router();

const OngController = require("./controller/OngController");
const IncidentController = require("./controller/IncidentController");
const ProfileController = require("./controller/ProfileController");
const SessionController = require("./controller/SessionController");

routes.post("/sessions", SessionController.create);

routes.get("/ongs", OngController.index);
routes.post("/ongs", OngController.create);

routes.post("/incidents", IncidentController.create);
routes.get("/incidents/", IncidentController.index);
routes.delete("/incidents/:id", IncidentController.delete);

routes.get("/profile", ProfileController.index);

module.exports = routes;
