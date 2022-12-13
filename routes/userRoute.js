const express = require("express");
const router = express.Router();
const { User, Show } = require("../models/index.js");
const { check, validationResult } = require("express-validator");

router.get("/", async (request, response) => {
    response.json(await User.findAll());
});

router.get("/:id", async (request, response) => {
    response.json(await User.findByPk(request.params.id));
});

router.get("/:id/shows", async (request, response) => {
    response.json(await User.findByPk(request.params.id, {
        include: Show
    }));
});

router.put("/:userID/shows/:showID", async (request, response) => {
    const foundUser = await User.findByPk(request.params.userID);
    const foundShow = await Show.findByPk(request.params.showID);
    await foundUser.addShow(foundShow);
    response.json(await User.findByPk(request.params.userID, {
        include: Show
    }));
});

module.exports = router;