Router.route('/', function() {
    this.render('/home');
});

Router.route('/home', function() {
    this.render('home');
});

Router.route('/home/edit', {

    name: 'home.edit',
    layoutTemplate: 'layout',
    template: 'home',
    yieldTemplates: {
        'dosignin': {
            to: 'modal'
        },
    },
    action: function() {
        $('#dosignin').modal('show');
        this.render();
    },

    onStop: function() {
        $('#dosignin').modal('hide');
    }

});
