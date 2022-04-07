//Model represents data -object representation of data

import mangoose from "mongoose";

//define the structure and properties of the JSON object
const uSchema = mangoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
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
