Template.template_subscribe.rendered = function() {
    $('#subscribeConfirmation').hide();
}

Template.template_subscribe.created = function() {
    // loading
    this.loading = new ReactiveVar();
    this.loading.set(false);
}

Template.template_subscribe.helpers({
    loading: function() {
        return Template.instance().loading.get();
    }
});

Template.template_subscribe.events({
    'submit #subscribeForm': function(e, t) {
        e.preventDefault();
        console.log('Template.subscribe.events submit');
        var subscribeForm = $(e.currentTarget),
            email = trimInput(subscribeForm.find('#subscribeEmail').val().toLowerCase());
        console.log(email);
        var data = {
            email: email
        }
        var emptyError = "";
        if (isNotEmpty(email)) {} else {
            emptyError = "Email cannot be Empty."
        }

        // show loading
        if (isNotEmpty(email) && isEmail(email)) {
            Template.instance().loading.set(true);
            Meteor.call('subscribeMethod', data, function(err) {
                if (err) {
                    if (err.message === 'User not found [403]') {
                        console.log('This email does not exist.');
                    } else {
                        console.log('We are sorry but something went wrong.');
                    }
                    $("#subscribeForm")
                        .find(".alert")
                        .html("Error! " + err["reason"])
                        .fadeIn()
                        .delay(5000)
                        .fadeOut();
                } else {
                    subscribeForm.find("input").val("");
                    console.log(' Congradulations, you are now subscribed. ');
                }
            });
        } else {
            subscribeForm
                .find(".alert")
                .html("Error! " + emptyError)
                .fadeIn()
                .delay(5000)
                .fadeOut();
        }
        return false;
    }
});
