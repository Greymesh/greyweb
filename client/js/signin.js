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
        if (isNotEmpty(password)) {} else {
            emptyError = "Password cannot be Empty."
        }
        if (isNotEmpty(email)) {} else {
            emptyError = "Email cannot be Empty."
        }

        if (isNotEmpty(email) && isNotEmpty(password) && isEmail(email)) {
            var data = {
                email: email,
                password: password,
            }
            Session.set('s_signinLoading', true);
            Meteor.loginWithPassword(email, password, function(err) {
                Session.set('s_signinLoading', false);
                if (err) {
                    console.log('These credentials are not valid.');
                    $("#dosignin")
                        .find(".alert")
                        .html("Error! " + err["reason"])
                        .fadeIn()
                        .delay(5000)
                        .fadeOut();
                } else {
                    $("#dosignin").find("input").val("")
                }
            });
        } else {
            $("#dosignin")
                .find(".alert")
                .html("Error! " + emptyError)
                .fadeIn()
                .delay(5000)
                .fadeOut();
        }
        return false;
    },
    'click #login-facebook': function(e, tmpl) {
        console.log('Template.template_signin.events login-facebook');
        Meteor.loginWithFacebook({
            requestPermissions: ['public_profile', 'email']
        }, function(err) {
            if (err) {
                console.log('facebook login failed.');
            }
        });
    },
    'click #login-google': function(e, tmpl) {
        console.log('Template.template_signin.events login-google');
        Meteor.loginWithGoogle({}, function(err) {
            if (err) {
                console.log('google login failed.');
            }
        });
    },
    'hide.bs.modal #dosignin': function(e) {
        console.log('hide.bs.modal #dosignin');
        Meteor.setTimeout(function() {
            Session.set('s_signinLoading', false);
        }, 2000);
        console.log(Session.get('s_signinLoading'));
    }
});

Template.template_signup.helpers({
    getsigninLoading: function() {
        return Session.get("s_signinLoading");
    }
})
