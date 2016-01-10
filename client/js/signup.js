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
            Meteor.call('createNewUser', data, function(err) {
                if (err) {
                    console.log('Login failed');
                } else {
                    Meteor.loginWithPassword(name, password, function(err) {
                        if (!err) {
                            console.log('createNewUser Meteor call loginWithPassword');
                            $('.modal-backdrop').remove();
                            if (Meteor.userId()) {
                                Router.go('/home');
                            }
                        }
                    })
                }
            })
        }
        return false;
    },

});


trimInput = function(value) {
    return value.replace(/^\s*|\s*$/g, '');
};

isNotEmpty = function(value) {
    if (value && value !== '') {
        return true;
    }
    console.log('Please fill in all required fields.');
    return false;
};

isEmail = function(value) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(value)) {
        return true;
    }
    console.log('Please enter a valid email address.');
    return false;
};

isValidPassword = function(password) {
    if (password.length < 6) {
        console.log('Your password should be 6 characters or longer.');
        return false;
    }
    return true;
};

areValidPasswords = function(password, confirm) {
    if (!isValidPassword(password)) {
        return false;
    }
    if (password !== confirm) {
        console.log('Your two passwords are not equivalent.');
        return false;
    }
    return true;
};
