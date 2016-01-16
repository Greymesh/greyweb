
Router.route('/', function () {
    this.render('/home');
});
 
Router.route('/home', function () {
    this.render('home');
});
