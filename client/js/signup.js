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
            phone = signUpForm.find('#form-phone').val();
        var emptyError = "";

        if (isNotEmpty(phone)) {} else {
            emptyError = "Phone cannot be Empty."
        }
        if (isNotEmpty(password)) {} else {
            emptyError = "Password cannot be Empty."
        }
        if (isNotEmpty(email)) {} else {
            emptyError = "Email cannot be Empty."
        }
        if (isNotEmpty(name)) {} else {
            emptyError = "Name cannot be Empty."
        }

        if (isNotEmpty(email) && isNotEmpty(password) && isNotEmpty(name) && isNotEmpty(phone) && isEmail(email)) {
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
        } else {
            signUpForm
                .find(".alert")
                .html("Error! " + emptyError)
                .fadeIn()
                .delay(5000)
                .fadeOut();
        }
        return false;
    },
    'hide.bs.modal #dosignup': function(e) {
        console.log('hide.bs.modal #dosignup');
        Meteor.setTimeout(function() {
            Session.set('s_signupLoading', false);
            Session.set('s_signupVisible', false);
            Session.set('s_signupEmailID', null);
        }, 2000);
        Template.instance().find("form").reset();
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
