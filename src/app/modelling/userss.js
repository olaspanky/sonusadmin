import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  CompanyName: {
    type: String,
    unique: true,
    required: true, 
  },
  Email: {
    type: String,
    required: true, 
    validate: {
      validator: (email) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Invalid email format",
    },
  },
  Location: String, 
  AdminName: String, 
  Telephone: String, 
  email2: String, 
  subscription: {
    type: [String], 
    required: true, 
  },
  subscriptionYear: String,
  therapyArea1: String,
  therapyArea2: String,
  numOfUsers: String,
  password: String,
  confirmPassword: String,
  userId: {
    type: String,
    unique: true, 
    required: true, 
  },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  const { CompanyName, Email, userId } = this;

  const existingUsers = await User.find({
    $or: [
      { CompanyName },
      { Email },
      { userId },
    ],
  });

  if (existingUsers.length > 0) {
    const existingFields = existingUsers.map((user) => {
      if (user.CompanyName === CompanyName) return 'CompanyName';
      if (user.Email === Email) return 'Email';
      if (user.userId === userId) return 'userId';
    });

    throw new Error(`Duplicate field(s): ${existingFields.join(', ')}`);
  }

  next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;