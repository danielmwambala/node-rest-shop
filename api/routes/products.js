const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling products GET Requests",
  });
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling products POST Requests",
  });
});

router.get("/:prodId", (req, res, next) => {
  const id = req.params.prodId;
  if (id === "special") {
    res.status(200).json({
      message: "You selected a special product",
      id: id,
    });
  } else {
    res.status(200).json({
      message: "You selected a normal product",
    });
  }
});

router.patch("/:prodId", (req, res, next) => {
  res.status(200).json({
    message: "Product updated",
  });
});

router.delete("/:prodId", (req, res, next) => {
  res.status(200).json({
    message: "Product deleted",
  });
});

module.exports = router;
