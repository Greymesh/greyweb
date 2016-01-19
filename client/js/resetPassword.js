Template.template_resetpassword.rendered = function() {
    if (Session.get('resetPwdToken')) {
        $(".modal").hide();
        $("#doresetpassword").modal('show');
    }
}

Template.template_resetpassword.events({
    'submit #resetPasswordForm': function(e, t) {
        console.log('Template.home.rendered logout');
        e.preventDefault();

        var resetPasswordForm = $(e.currentTarget),
            password = resetPasswordForm.find('#resetPassword').val(),
            passwordConfirm = resetPasswordForm.find('#resetPasswordconfirm').val();

        if (isNotEmpty(password) && areValidPasswords(password, passwordConfirm)) {
            Accounts.resetPassword(Session.get('resetPwdToken'), password,
                function(error) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('resetPwdToken complete');
                        Session.set('resetPwdToken', null);
                        Session.set('justResetPwd', true);
                    }
                });
        }
        return false;
    },
    'click #resetModal_close': function() {
        console.log('click #resetModal_close');
        Meteor.setTimeout(function() {
            Session.set('resetPwdToken', null);
            Session.set('justResetPwd', false);
        }, 2000);
    }
});

Template.template_resetpassword.helpers({
    visible: function() {
        return Session.get('justResetPwd');
    },
    getResetPasswordToken: function() {
        return Session.get('resetPwdToken');
    },

});

if (Meteor.isClient) {
    Accounts.onResetPasswordLink(function(token, done) {
        console.log('resetpassword Accounts onResetPasswordLink');
        Session.set("resetPwdToken", token);
    });
}


