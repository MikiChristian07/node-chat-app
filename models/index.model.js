import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
  name: {
    type: String,
    requried: true
  },

  message: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;
