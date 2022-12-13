const express = require("express");
const router = express.Router();
const { Show } = require("../models/index.js");
const { check, validationResult } = require("express-validator");

router.get("/", async (request, response) => {
  response.json(await Show.findAll());
});

router.get("/:id", async (request, reponse) => {
  reponse.json(await Show.findByPk(request.params.id));
});

router.get("/genres/:id", async (request, response) => {
  response.json(
    await Show.findAll({
      where: {
        genre: request.params.id,
      },
    })
  );
});

const watchedChecks = [
  check("rating").trim().not().isEmpty(),
  check("rating").not().isEmpty(),
];

router.put("/:id/watched", watchedChecks, async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    response.json({ errors: errors.array() });
  } else {
    const foundShow = await Show.findByPk(request.params.id);
    await foundShow.update({ rating: request.body.rating });
    response.json(await Show.findByPk(request.params.id));
  }
});

router.put(
  "/:statusID/update",
  check("status").trim().isLength({ min: 5, max: 25 }),
  async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.json({ errors: errors.array() });
    } else {
      const foundShow = await Show.findByPk(request.params.statusID);
      await foundShow.update({ status: request.body.status });
      response.json(await Show.findByPk(request.params.statusID));
    }
  }
);

router.delete("/:id", async (request, response) => {
  await Show.destroy({
    where: {
      id: request.params.id,
    },
  });
  response.send("Show deleted.");
});

module.exports = router;
