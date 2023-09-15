const mongoose = require('mongoose');

// Define the Notification schema
const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,

  },
  message: {
    type: String,
    required: true,
  },
  sendor_name:{
    type:String,
    required:true,
  },
  recipient: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

// Create the Notification model
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
