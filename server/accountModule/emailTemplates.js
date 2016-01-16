Accounts.emailTemplates = {
  from: "Greymesh Accounts <no-reply@greymesh.com>",
  siteName: "www.greymesh.com",

  resetPassword: {
    subject: function(user) {
      return "Reset Password for " + Accounts.emailTemplates.siteName;
    },
    text: function(user, url) {
      var greeting = (user.profile && user.profile.name) ?
            ("Hello " + user.profile.name + ",") : "Hello,";
      return greeting + "\n"
        + "\n"
        + "To reset your password, simply click the link below.\n"
        + "\n"
        + url + "\n"
        + "\n"
        + "Thanks.\n"
        + "Team Greymesh \n";
    }
  },
  verifyEmail: {
    subject: function(user) {
      return "Welcome to " + Accounts.emailTemplates.siteName;
    },
    text: function(user, url) {
      var greeting = (user.profile && user.profile.name) ?
            ("Hello " + user.profile.name + ",") : "Hello,";
      return greeting + "\n"
        + "\n"
        + "To verify your account email, simply click the link below.\n"
        + "\n"
        + url + "\n"
        + "\n"
        + "Thanks.\n"
        + "Team Greymesh \n";
    }
  },
};