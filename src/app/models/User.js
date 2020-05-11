import mongoose from 'mongoose';

class User {
  schema() {
    const userSchema = new mongoose.Schema(
      {
        name: {
          type: String,
          required: true,
          lowercase: true,
        },
        agent: {
          type: Number,
          required: true,
          unique: true,
        },
      },
      { timestamps: true }
    );

    return mongoose.model('User', userSchema);
  }
}

export default new User().schema();
