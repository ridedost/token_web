var firebaseAdmin = require("firebase-admin");

var mydb = require("./maindb.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(mydb),
  databaseURL: "https://token-app-b2c6b-default-rtdb.firebaseio.com",
});

function sendNotification(type, user, title, msg) {
  const formattedTime = new Date(Date.now()).toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
  });
  return new Promise((resolve, reject) => {
    var notifications = firebaseAdmin.database().ref("notifications/" + user);
    notifications
      .push({ title: title, msg: msg, time: formattedTime, type: type })
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        console.error("Error sending notification:", error);
        reject(false);
      });
  });
}

module.exports = { firebaseAdmin, sendNotification };
