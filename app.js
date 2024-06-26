const express = require("express");

const app = express();
const bodyParser = require("body-parser");

const productsRoutes = require("./api/routes/products");
const ordersRoutes = require("./api/routes/orders");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);

app.use((req, res, next) => {
  const error = new Error(
    "The requested service was not found on this server."
  );
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
