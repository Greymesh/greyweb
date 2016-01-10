/*pass in more information to the client*/
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
    console.log("this is user")
    console.log(user)
    return user;

})

// Accounts.validateNewUser(function(user) {
//     if (user.username && user.username.length >= 3)
//         return true;
//     throw new Meteor.Error(403, "Username must have at least 3 characters");
// });

Meteor.methods({
    'createNewUser': function(userData) {

        // if(!Meteor.userId()){
        //     throw new Meteor.Error("not authorized");
        // }
        console.log("hereeeeeeeeeeeeeeee")
        var user = Meteor.user();
        console.log(user)

        // if (!user) // you can also check this.userId here
        //     throw new Meteor.Error(401, 'Please login.');
        if (!userData.email)
            throw new Meteor.Error(422, 'Please include an email.');

        console.log("success")
        var userId = Accounts.createUser(userData)
        console.log(userId)
        this.setUserId(userId)
        // user = Meteor.users.findOne(userId)
        // Accounts.sendEnrollmentEmail(userId);
    }
})
