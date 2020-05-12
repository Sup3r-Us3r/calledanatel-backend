// import ProtocolModel from '../models/Protocol';
const ProtocolModel = require('../models/Protocol');

class ProtocolController {
  async registerDataProtocol(req, res) {
    const { anatelProtocol, helpdeskCalled } = req.body;

    const protocolExists = await ProtocolModel.findOne({ anatelProtocol });
    const helpdeskCalledExists = await ProtocolModel.findOne({
      helpdeskCalled,
    });

    if (protocolExists || helpdeskCalledExists) {
      return res.status(400).json({ error: 'Protocol already exists.' });
    }

    const data = await ProtocolModel.create(req.body);

    if (!data) {
      return res.status(400).json({ error: 'Error saving records.' });
    }

    return res.json(data);
  }

  async updateProtocol(req, res) {
    const { id } = req.params;

    const protocol = await ProtocolModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );

    if (!protocol) {
      return res.status(400).json({ error: 'Error updating protocol.' });
    }

    return res.json(protocol);
  }

  async deleteProtocol(req, res) {
    const { id } = req.params;

    const protocol = await ProtocolModel.findByIdAndDelete({
      _id: id,
    });

    if (!protocol) {
      return res.status(400).json({ error: 'Error deleting protocol.' });
    }

    return res.send();
  }

  async listAllProtocols(req, res) {
    const protocols = await ProtocolModel.find({}, '-__v').sort({
      name: 'ASC',
      calledDuration: 'ASC',
    });

    if (!protocols) {
      return res.status(400).json({ error: 'Error listing protocols.' });
    }

    return res.json(protocols);
  }

  async listProtocol(req, res) {
    const { anatelprotocol } = req.params;

    const protocol = await ProtocolModel.findOne(
      {
        anatelProtocol: anatelprotocol,
      },
      '-__v'
    );

    if (!protocol) {
      return res.status(400).json({ error: 'Error listing protocol.' });
    }

    return res.json(protocol);
  }
}

// export default new ProtocolController();
module.exports = new ProtocolController();
