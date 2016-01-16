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
            Meteor.call('createNewUser', data, function(err, result) {
                if (err) {
                    console.log('createNewUser Login failed');
                } else {
                    var email = result["email"];
                    $('.modal').modal('hide');
                    Session.set("verificationEmail", email);

                    $("#email_verification").modal('show')
                }
            })
            signUpForm.find("input").val("");


        }
        return false;
    }
});

Template.template_email_verification.helpers({
    isEmailVerified: function() {
        var verifToken = Session.get('verifiedEmailToken');
        if (verifToken) {
            return true;
        } else {
            return false;
        }
    },
    email: function() {
        return Session.get("verificationEmail");
    }
})


Accounts.onEmailVerificationLink(function(token, done) {
    console.log('verify Email Token Accounts onEmailVerificationLink');
    Accounts.verifyEmail(token, function(error) {
        if (!error) {
            Session.set('verifiedEmailToken', true);
        }
    });
});
