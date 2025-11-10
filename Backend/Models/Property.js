let mongoose=require("mongoose")

const propertySchema = new mongoose.Schema(
  {
    // user reference (property owner or agent)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HomzyUsers",
    },

    // property title
    title: {
      type: String,
      required:true,
    },

    // property type (1BHK, 2BHK, Villa, etc.)
    type: {
      type: String,
      required: true
    },

    // area (city area)
    area: {
      type: String,
      required:true
    },

    // city name
    city: {
      type: String,
      required:true,
    },

    // property price
    price: {
      type: Number,
      required: true,
    },

    // WhatsApp number for inquiries
    whatsappNumber: {
      type: Number,
      required:true
    },

    // multiple property images (URLs from Cloudinary)
    images: [
      {
        type: String,
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
);

const Property = mongoose.model("HomzyProperties", propertySchema);

module.exports=Property
