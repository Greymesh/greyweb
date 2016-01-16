Template.template_forgotpassword.rendered = function() {
    $('#doforgotpassword').hide();
}

Template.template_forgotpassword.events({
    'submit #forgotPasswordForm': function(e, t) {
        e.preventDefault();
        console.log('Template.ForgotPassword.events submit');
        var forgotPasswordForm = $(e.currentTarget),
            email = trimInput(forgotPasswordForm.find('#forgotPasswordEmail').val().toLowerCase());
        document.getElementById("forgotPasswordEmail").value = "";
        console.log(email);
        if (isNotEmpty(email) && isEmail(email)) {
            var data = {
                email: email
            }
            Meteor.call('forgotPasswordMethod', data, function(err) {
                console.log(err);
                if (err) {
                    if (err.message === 'User not found [403]') {
                        console.log('This email does not exist.');
                    } else {
                        console.log('We are sorry but something went wrong.');
                    }
                } else {
                    console.log('Email Sent. Check your mailbox.');
                }
            });
        }
        return false;
    }
});
