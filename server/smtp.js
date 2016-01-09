Meteor.startup(function () {
  smtp = {
    username: 'lakshmikanth.k.m@gmail.com',   // eg: server@gentlenode.com
    password: '9964466926',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.gmail.com',  // eg: mail.gandi.net
    port: 25
  }
  Subscription = new Mongo.Collection('subscriptions');
  

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});