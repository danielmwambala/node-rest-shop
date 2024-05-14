const pricingData = {
  prices: [
    {
      product_id: 1,
      price: 599,
      vat_band: "standard",
    },
    {
      product_id: 2,
      price: 250,
      vat_band: "zero",
    },
    {
      product_id: 3,
      price: 250,
      vat_band: "zero",
    },
    {
      product_id: 4,
      price: 1000,
      vat_band: "zero",
    },
    {
      product_id: 5,
      price: 1250,
      vat_band: "standard",
    },
  ],
  vat_bands: {
    standard: 0.2,
    zero: 0,
  },
};

module.exports = {
  productPricing: function (item) {
    const productData = pricingData.prices.find(
      (el) => el.product_id == item.product_id
    );

    const vatRate =
      productData.vat_band == "standard"
        ? pricingData.vat_bands.standard
        : pricingData.vat_bands.zero;

    const itemPrice =
      (productData.price + productData.price * vatRate) * item.quantity;

    const vatPerItem =
      productData.vat_band == "standard"
        ? productData.price * pricingData.vat_bands.standard
        : productData.price * pricingData.vat_bands.zero;

    const totalVat =
      (productData.vat_band == "standard"
        ? productData.price * pricingData.vat_bands.standard
        : productData.price * pricingData.vat_bands.zero) * item.quantity;

    return {
      productId: item.product_id,
      pricePerUnit: Math.round(productData.price),
      quantity: item.quantity,
      totalPrice: Math.round(itemPrice),
      vatRate: vatRate,
      vatPerUnit: Math.round(totalVat),
      totalVat: Math.round(totalVat),
    };
  },
};
