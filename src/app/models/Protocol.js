// import mongoose from 'mongoose';
const mongoose = require('mongoose');

class Protocol {
  schema() {
    const anatelProtocolSchema = new mongoose.Schema(
      {
        name: {
          type: String,
          required: true,
        },
        anatelProtocol: {
          type: String,
          required: true,
          unique: true,
        },
        helpdeskCalled: {
          type: String,
          required: true,
          unique: true,
        },
        calledDuration: {
          type: Date,
          required: true,
        },
        situationCalled: {
          type: String,
          required: true,
        },
        sector: {
          type: String,
          required: true,
        },
        observations: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    );

    return mongoose.model('Protocol', anatelProtocolSchema);
  }
}

// export default new Protocol().schema();
module.exports = new Protocol().schema();
