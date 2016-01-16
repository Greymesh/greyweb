Template.home.rendered = function() {

    //open modal
    $('#logout').on('click', function(e) {
        console.log('Template.home.rendered logout ');
        e.preventDefault();
        Meteor.logout(function() {
            console.log('Bye Meteorite! Come back whenever you want!');
        });
        return false;
    });

    toggleLoginInOrSignUp = function() {
        console.log('toggleLoginInOrSignUp');
        $('#dosignin').modal('toggle');
        $('#dosignup').modal('toggle');
    }

}

Subscription = new Mongo.Collection('subscriptions');

Template.home.events({
    'submit .form-inline': function(e, t) {
        e.preventDefault()
        var val = $(".user_email").val();
        console.log(Subscription.find().fetch());
        if (isEmail(val))
            Subscription.insert({
                "email": val
            })
    },
    'click #logout': function(e, t) {
        Meteor.logout(function() {
            console.log('Bye Meteorite! Come back whenever you want!');
        });
        return false;
    }

})
