Template.template_signup.rendered = function() {
    $('#dosignup').hide();
}
Template.template_signup.events({
    'submit .register-form': function(e, t) {
        e.preventDefault();
        console.log('Template.template_signup.events register-form');
        var signUpForm = $(e.currentTarget),
            name = trimInput(signUpForm.find('#form-username').val().toLowerCase()),
            email = trimInput(signUpForm.find('#form-email').val().toLowerCase()),
            password = signUpForm.find('#form-password').val(),
            passwordConfirm = signUpForm.find('#form-confirm-password').val(),
            phone = signUpForm.find('#form-phone').val();

        if (isNotEmpty(email) && isNotEmpty(password) && isEmail(email)) {
            var data = {
                username: name,
                email: email,
                password: password,
                profile: {
                    "email": email,
                    "phone": phone,
                    "name": name
                }
            }
            Session.set('s_signupLoading', true);
            console.log(Session.get("s_signupLoading"));
            Meteor.call('createNewUser', data, function(err, result) {
                Session.set('s_signupLoading', false);
                console.log(err);
                if (err) {
                    console.log('createNewUser Login failed');
                    signUpForm
                        .find(".alert")
                        .html("Error! " + err["reason"])
                        .fadeIn()
                        .delay(5000)
                        .fadeOut();
                } else {
                    Session.set('s_signupEmailID', email);
                    Session.set('s_signupVisible', true);
                    console.log(Session.get("s_signupEmailID"));
                    console.log(Session.get("s_signupVisible"));
                    signUpForm.find("input").val("");
                }
            })
        }
        return false;
    },
    'click #signupModal_close': function() {
        console.log('click #signupModal_close');
        Meteor.setTimeout(function() {
            Session.set('s_signupLoading', false);
            Session.set('s_signupVisible', false);
            Session.set('s_signupEmailID', null);
        }, 2000);
        console.log(Session.get('s_signupLoading'));
        console.log(Session.get('s_signupVisible'));
        console.log(Session.get('s_signupEmailID'));
    }
});

Template.template_signup.helpers({
    getsignupLoading: function() {
        return Session.get("s_signupLoading");
    },
    getsignupEmailID: function() {
        return Session.get('s_signupEmailID');
    },
    getsignupVisible: function() {
        return Session.get('s_signupVisible');
    },
})

Accounts.onEmailVerificationLink(function(token, done) {
    console.log('verify Email Token Accounts onEmailVerificationLink');
    Accounts.verifyEmail(token, function(error) {
        if (!error) {
            Session.set('verifiedEmailToken', true);
        }
    });
});
