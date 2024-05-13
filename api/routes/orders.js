const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Fetched all orders",
  });
});

router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "Created an order",
  });
});

router.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  res.status(200).json({
    message: "Fetched a specific order",
    orderId: id,
  });
});

router.patch("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "Order updated",
  });
});

router.delete("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "Order deleted",
  });
});

module.exports = router;
