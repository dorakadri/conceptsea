const { models, model, Schema } = require("mongoose");

const UserSchema = new Schema({
    userclerk:{
    type: String,
    unique: [true, "email already exists"],
    },
  email: {
    type: String,
    required: [true, "email is requested"],
    unique: [true, "email already exists"],
  },

  lastName: {
    type: String,
    required: [true, "username is requested"],
  },
  firstName:{
    type: String,
    required: [true, "username is requested"],
  },
 image:{
    type: String,
    default:"https://acsmmontreal.qc.ca/wp-content/uploads/2020/09/blank-profile-picture-973460_1280-2.png"
 }
});

const User =models.User  || model("User",UserSchema);

export default User ;


