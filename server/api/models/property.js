//Model represents data -object representation of property data

import mangoose from "mongoose";

//define the structure and properties of the JSON object for property
const uSchema = mangoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    listingType: {
      type: String,
      required: true,
    },
    rent: {
      type: String,
      required: true,
    },
    rentDuration: {
      type: String,
      required: true,
    },
    //required?
    owner: {
      type: Object,
    },
    propertyPhoto: {
      type: Array,
    },
    bedrooms: {
      type: Number,
    },
    bathrooms: {
      type: Number,
    },
    totalNumTenants: {
      type: Number,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipcode: {
      type: Number,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    lastModifiedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

//A virtual property named id will be copied and converted into hexa-decimal string
uSchema.virtual("id", () => {
  this._id.toHexString();
});

// Converting the virtual id to JSON
uSchema.set("toJSON", { virtuals: true });

//create a users model to export
const model = mangoose.model("user", uSchema);

export default model;
