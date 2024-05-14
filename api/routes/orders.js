const express = require("express");
const { productPricing } = require("../../constants/utilities");

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

router.post("/pricing", (req, res, next) => {
  // calculate pricing for each item
  const itemPricing = [];
  let totalPrice = 0;
  let totalVat = 0;
  const currency = "Kshs.";

  for (let i = 0; i < req.body.order?.items?.length; i++) {
    const element = req.body.order.items[i];
    let itemData = productPricing(element);
    itemPricing.push({
      productId: itemData.productId,
      pricePerUnit: `${currency}${itemData.pricePerUnit}`,
      quantity: itemData.quantity,
      totalPrice: `${currency}${itemData.totalPrice}`,
      vatRate: itemData.vatRate,
      vatPerUnit: `${currency}${itemData.vatPerUnit}`,
      totalVat: `${currency}${itemData.totalVat}`,
    });
    totalPrice += itemData.totalPrice;
    totalVat += itemData.totalVat;
  }

  const data = {
    totalPrice: `${currency}${totalPrice}`,
    totalVat: `${currency}${totalVat}`,
    itemPricing: itemPricing,
  };

  res.status(200);
  res.json({
    message: "Order Pricing",
    data: data,
  });
});

module.exports = router;
