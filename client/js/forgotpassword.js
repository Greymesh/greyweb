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
                    Session.set('s_forgotPasswordEmailID', email);
                    Session.set('s_forgotPasswordVisible', true);
                    console.log('Email Sent. Check your mailbox.');
                }
            });
        }
        return false;
    },
    'click #forgotPwdModal_close': function() {
        console.log('click #forgotPwdModal_close');
        Meteor.setTimeout(function() {
            Session.set('s_forgotPasswordVisible', false);
            Session.set('s_forgotPasswordEmailID', null);
        }, 2000);
        console.log(Session.get('s_forgotPasswordVisible'));
        console.log(Session.get('s_forgotPasswordEmailID'));
    }
});

Template.template_forgotpassword.helpers({
    getForgotPasswordVisible: function() {
        return Session.get('s_forgotPasswordVisible');
    },
    getforgotPasswordEmailID: function() {
        return Session.get('s_forgotPasswordEmailID');
    },

});
