Template.template_resetpassword.rendered = function() {
    $('#doresetpassword').hide();
}

Template.template_resetpassword.events({
    'submit #resetPasswordForm': function(e, t) {
        console.log('Template.home.rendered logout');
        e.preventDefault();

        var resetPasswordForm = $(e.currentTarget),
            password = resetPasswordForm.find('#resetPassword').val(),
            passwordConfirm = resetPasswordForm.find('#resetPasswordconfirm').val();

        if (isNotEmpty(password) && areValidPasswords(password, passwordConfirm)) {
            var data = {
                password: password,
                token: Session.get('resetPasswordToken'),
            }
            Meteor.call('resetPasswordMethod', data, function(err) {
                if (err) {
                    console.log('resetPasswordMethod Login failed');
                    console.log(error);
                } else {
                    Session.set('resetPasswordToken', null);
                    Session.set('justResetPassword', true);
                }
            });
        }
        return false;
    },
    'click #resetModal_close': function() {
        console.log('click #resetModal_close');
        Session.set('resetPasswordToken', null);
        Session.set('justResetPassword', false);
    }
});

Template.template_resetpassword.helpers({
    visible: function() {
        return Session.get('justResetPassword');
    },
    getResetPasswordToken: function() {
        return Session.get('resetPasswordToken');
    },

});

Accounts.onResetPasswordLink(function(token, done) {
    console.log('resetpassword Accounts onResetPasswordLink');
    Session.set("resetPasswordToken", token);
    console.log(token);
    $("#doresetpassword").modal();
    console.log(Session.get('resetPasswordToken'));
});

Accounts.onEmailVerificationLink(function(token, done) {
    console.log('verify Email Token Accounts onEmailVerificationLink');
    Accounts.verifyEmail(token, function(error) {
        if (!error) {
            Session.set('verifiedEmailToken', true);
        }
    });
});
