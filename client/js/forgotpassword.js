Template.template_forgotpassword.events({
    'submit #forgotPasswordForm': function(e, t) {
        e.preventDefault();
        console.log('Template.ForgotPassword.events submit');
        var forgotPasswordForm = $(e.currentTarget),
            email = trimInput(forgotPasswordForm.find('#forgotPasswordEmail').val().toLowerCase());
        console.log(email);
        var emptyError = "";
        if (isNotEmpty(email)) {} else {
            emptyError = "Email cannot be Empty."
        }
        if (isNotEmpty(email) && isEmail(email)) {
            var data = {
                email: email
            }
            Session.set('s_forgotPasswordLoading', true);
            Meteor.call('forgotPasswordMethod', data, function(err) {
                Session.set('s_forgotPasswordLoading', false);
                if (err) {
                    if (err.message === 'User not found [403]') {
                        console.log('This email does not exist.');
                    } else {
                        console.log('We are sorry but something went wrong.');
                    }
                    $("#forgotPasswordForm")
                        .find(".alert")
                        .html("Error! " + err["reason"])
                        .fadeIn()
                        .delay(5000)
                        .fadeOut();
                } else {
                    forgotPasswordForm.find("input").val("");
                    Session.set('s_forgotPasswordEmailID', email);
                    Session.set('s_forgotPasswordVisible', true);
                    console.log('Email Sent. Check your mailbox.');
                }
            });
        } else {
            $("#forgotPasswordForm")
                .find(".alert")
                .html("Error! " + emptyError)
                .fadeIn()
                .delay(5000)
                .fadeOut();
        }
        return false;
    },
    'hide.bs.modal #doforgotpassword': function(e) {
        console.log('hide.bs.modal #doforgotpassword');
        Meteor.setTimeout(function() {
            Session.set('s_forgotPasswordLoading', false);
            Session.set('s_forgotPasswordVisible', false);
            Session.set('s_forgotPasswordEmailID', null);
        }, 2000);
        console.log(Session.get('s_forgotPasswordLoading'));
        console.log(Session.get('s_forgotPasswordVisible'));
        console.log(Session.get('s_forgotPasswordEmailID'));
    }
});

Template.template_forgotpassword.helpers({
    getforgotPasswordVisible: function() {
        return Session.get('s_forgotPasswordVisible');
    },
    getforgotPasswordEmailID: function() {
        return Session.get('s_forgotPasswordEmailID');
    },
    getforgotPasswordLoading: function() {
        return Session.get('s_forgotPasswordLoading');
    },
});
