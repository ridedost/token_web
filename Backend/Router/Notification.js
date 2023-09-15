const express = require("express");
const Notification = require("../model/Notification");
const { loginAuth } = require("../midleware/auth");
const { userAuth } = require("../midleware/userAuth");
const notification = express.Router();



//vendor/superAdmin
notification.get('/unread-count',loginAuth, async (req, res) => {
    try {
      const id = req.body.vendorId;
      const count = await Notification.countDocuments({ recipient: id,isRead: false });
      res.json({ count });
    } catch (error) {
      console.error('Error fetching unread notification count:', error);
      res.status(500).json({ error: 'An error occurred while fetching the count.' });
    }
});

//user
notification.get('/unread-count/user',userAuth, async (req, res) => {
    try {
      const id = req.body.userId;
      const count = await Notification.countDocuments({ recipient: id,isRead: false, });
      res.json({ count });
    } catch (error) {
      console.error('Error fetching unread notification count:', error);
      res.status(500).json({ error: 'An error occurred while fetching the count.' });
    }
});



//vendor superadmin
notification.put('/mark-as-read', loginAuth, async (req, res) => {
    const id = req.body.vendorId;
    try {
      // Update notifications as read
      await Notification.updateMany(
        {
          recipient: id,
          isRead: false,
        },
        {
          $set: {
            isRead: true,
          },
        }
      );
  
      // Fetch the updated notifications
      const updatedNotifications = await Notification.find({
        recipient: id,
        isRead: true, // Fetch only the notifications that were marked as read
      });
  
      res.json({
        message: 'Notifications marked as read successfully',
        updatedNotifications,
      });
    } catch (error) {
      console.error('Error marking notifications as read:', error);
      res.status(500).json({ error: 'An error occurred while marking notifications as read.' });
    }
  });
  

  //user
notification.put('/mark-as-read/user', userAuth, async (req, res) => {
    const id = req.body.userId;
    try {
      // Update notifications as read
      await Notification.updateMany(
        {
          recipient: id,
          isRead: false,
        },
        {
          $set: {
            isRead: true,
          },
        }
      );
  
      // Fetch the updated notifications
      const updatedNotifications = await Notification.find({
        recipient: id,
        isRead: true, // Fetch only the notifications that were marked as read
      });
  
      res.json({
        message: 'Notifications marked as read successfully',
        updatedNotifications,
      });
    } catch (error) {
      console.error('Error marking notifications as read:', error);
      res.status(500).json({ error: 'An error occurred while marking notifications as read.' });
    }
});
  





  module.exports = { notification};