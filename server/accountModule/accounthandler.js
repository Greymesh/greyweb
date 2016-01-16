/* pass in more information to the client*/
Accounts.onCreateUser(function(options, user) {
    console.log("loggggggggggggggggggggggggggggggg")
    console.log(options);
    console.log(user);
    if (options.profile)
        user.profile = options.profile

    if (user.services) {
        if (user.services.facebook) {
            var service = user.services.facebook;
            user.profile["email"] = service["email"];
        }
        if (user.services.google) {
            var service = user.services.google;
            user.profile["email"] = service["email"];
            user.profile["picture"] = service["picture"];

        }
    }
    console.log("this is user");
    console.log(user);
    return user;
})

Accounts.config({
    sendVerificationEmail: true,
    forbidClientAccountCreation: true
})

Meteor.methods({
    'createNewUser': function(userData) {
        console.log("hereeeeeeeeeeeeeeee")
        var user = Meteor.user();
        console.log(user)

        if (!userData.email)
            throw new Meteor.Error(422, 'Please include an email.');

        console.log("success")
        var userId = Accounts.createUser(userData);
        console.log(userId);
        Accounts.sendVerificationEmail(userId, userData.email);
        this.setUserId(userId);

        return {
            "email": userData.email
        }
    }
})

///
/// RESETTING VIA EMAIL
///

// Method called by a user to request a password reset email. This is
// the start of the reset process.
Meteor.methods({
    forgotPasswordMethod: function(options) {
        var email = options.email;
        console.log('@@@@@@forgotPasswordMethod');
        console.log(email);
        if (!email)
            throw new Meteor.Error(400, "Need to set options.email");

        var user = Meteor.users.findOne({
            "emails.address": email
        });
        if (!user)
            throw new Meteor.Error(403, "User not found");

        Accounts.sendResetPasswordEmail(user._id, email);
    }
});
