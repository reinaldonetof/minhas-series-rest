const express = require("express");
const router = express.Router();

const Serie = require("../models/serie");

router.get("/", async (req, res) => {
  const series = await Serie.find({});
  res.send(series);
});

router.post("/", async (req, res) => {
  const serie = new Serie(req.body);
  try {
    await serie.save();
    res.send(serie);
  } catch (e) {
    res.send({
      success: false,
      errors: Object.keys(e.errors),
    });
  }
});

router.delete("/:id", async (req, res) => {
  await Serie.remove({ _id: req.params.id });
  res.send({
    success: true,
  });
});

router.get("/:id", async (req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id });
  res.send(serie);
});

router.put("/:id", async (req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id });
  Object.keys(req.body).forEach((key) => {
    if (key === "comments") {
      serie[key].push(req.body[key]);
    } else {
      serie[key] = req.body[key];
    }
  });
  try {
    await serie.save();
    res.send(serie);
  } catch (e) {
    res.send({
      success: false,
      errors: Object.keys(e.errors),
    });
  }
});

module.exports = router;
