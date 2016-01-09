  layout = new Iron.Layout({ /* template: 'MyTemplate', data: myDataFunc */ });

  Accounts.onLogin(function onSuccessfulLogin() {
      console.log('onSuccessfulLogin');
      Router.go('/home');
  })

  Accounts.onLoginFailure(function onFailedLogin() {
      console.log('onFailedLogin');
  })

  Template.home.events({
      'click #logout': function(e, t) {
          Meteor.logout(function() {
              console.log('Bye Meteorite! Come back whenever you want!');
          });
          return false;
      }
  });

  