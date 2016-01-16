if (Meteor.isServer) {
    Meteor.startup(function() {
        smtp = {
            username: 'lakshmikanth.k.m@gmail.com',
            password: 'teoszfbtmcpswfxu',
            server: 'smtp.gmail.com',
            port: 25
        }

        process.env.MAIL_URL = 'smtp://'
        + encodeURIComponent(smtp.username)
        + ':'
        + encodeURIComponent(smtp.password)
        + '@'
        + encodeURIComponent(smtp.server)
        + ':'
        + smtp.port;
    });
}
