var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BHc9AmJeFh7TOYu_L1ZM9V8aDoKoEe9ud57ec0DyszBm6eZG17agbGyAW3Gllw46vzEqBFLJ9IVbajryrZ886NA",
   "privateKey": "Xes95-HaClEH0exMkYKyo2j15_jzpDoKF9YJBWRFd6A"
};
 
 
webPush.setVapidDetails(
   'izsalavandi@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/do_2b3d2Ink:APA91bGNxVlCjPg7MQASvDPPYQzQTgPeO2mJs9vWFubguq-Wkz_T3A0_LxXCL1EYBrAuIIzC7AxbgPMO91dlKF5wpjpElYt2kwvDawoizkHUWgyLENyDVtMMR-L4Wry4qM2vgAeLuicm",
   "keys": {
       "p256dh": "BAjYhajr4rEeAH70PSndNIKXzZfWcjPNKqmPUpgC3c/NIM7Z5JE++Ml/EzOAw8JAvGBM4xqN9eLG8xkFSSKWoKc=",
       "auth": "YoqS79H7+YRheeAraBTEQw=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '1019719802688',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);