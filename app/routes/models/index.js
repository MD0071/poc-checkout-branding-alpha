import mongoose from "mongoose";
// CheckoutCustomization.js
const checkoutCustomizationSchema = new mongoose.Schema({
  brandingid: String,
  customizations: {
    selected1: {
      type: String,
      required: true,
    },
    selected2: {
      type: String,
      required: true,
    },
    selected3: {
      type: String,
      required: true,
    },
    shop: {
      type: String,
      required: true,
    },
  },
});

export const CheckoutCustomization = mongoose.model('CheckoutCustomi', checkoutCustomizationSchema);

