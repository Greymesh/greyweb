Template.template_signin.rendered = function() {
    $('#dosignin').hide();
}

Template.template_signin.events({
    'submit .login-form': function(e, t) {
        console.log('Template.template_signin.events login-form');
        e.preventDefault();

        var signInForm = $(e.currentTarget),
            email = trimInput(signInForm.find('#form-username').val().toLowerCase()),
            password = signInForm.find('#form-password').val();

        if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password) && isValidPassword(password)) {

            Meteor.loginWithPassword(email, password, function(err) {
                if (err) {
                    console.log('These credentials are not valid.');
                } else {
                    $("#dosignin").modal('hide');
                    $('.modal-backdrop').remove();
                    if (Meteor.userId()) {
                        Router.go('/home');
                    }
                }
            });
        }
        return false;
    },
    "click #login-facebook": function(e, tmpl) {
        console.log('Template.template_signin.events login-facebook');
        Meteor.loginWithFacebook({
            requestPermissions: ['public_profile', 'email']
        }, function(err) {
            if (err) {
                console.log('facebook login failed.');
            } else {
                $("#dosignin").modal('hide');
                $('.modal-backdrop').remove();
                if (Meteor.userId()) {
                    Router.go('/home');
                }
            }
        });
    },
    "click #login-twitter": function(e, tmpl) {
        console.log('Template.template_signin.events login-twitter');
        Meteor.loginWithTwitter({}, function(err) {
            if (err) {
                console.log('twitter login failed.');
            } else {
                $("#dosignin").modal('hide');
                $('.modal-backdrop').remove();
                if (Meteor.userId()) {
                    Router.go('/home');
                }
            }
        });
    },
    "click #login-google": function(e, tmpl) {
        console.log('Template.template_signin.events login-google');
        Meteor.loginWithGoogle({}, function(err) {
            if (err) {
                console.log('google login failed.');
            } else {
                $("#dosignin").modal('hide');
                $('.modal-backdrop').remove();
                if (Meteor.userId()) {
                    Router.go('/home');
                }
            }
        });
    },
});
