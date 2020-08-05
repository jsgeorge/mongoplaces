const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaceSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      requried: true,
      type: String,
      maxlength: 500,
    },
    description: {
      requried: true,
      type: String,
      maxlength: 1000,
    },
    createdAt: {
      type: Date,
    },
    city: {
      requried: true,
      type: String,
      maxlength: 500,
    },
    state: {
      requried: true,
      type: String,
      maxlength: 500,
    },
    country: {
      requried: true,
      type: String,
      maxlength: 500,
    },
    likes: {
      requried: true,
      type: Number,
      default: 0,
    },
    tag: {
      required: true,
      type: String,
      maxlength: 50,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    comments: {
      type: Array,
      default: [],
    },
    images: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
const Place = mongoose.model("Place", PlaceSchema);

module.exports = Place;
