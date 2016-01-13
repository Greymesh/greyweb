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
                        }
                    })
                }
            })
        }
        return false;
    }
});
