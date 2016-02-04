Template.template_drawer.events({
    'click #navbar_close': function() {
        console.log('click #navbar_close');
        $('.mdl-layout__drawer').toggleClass("toggled");
    }
});