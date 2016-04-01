Router.configure({
    layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
    this.render('home');
});

Router.route('/chat/:_id', function () {
    this.render('chat', {
        data: function () {
            return Messages.find({
                room: this.params._id
            });
        }
    });
}, {
    name: "chat"
});

Router.onRun(function () {
    ChatRooms.update(this.params._id, {
        $inc: {
            users: 1
        }
    });

    this.next();
}, {
    only: ['chat']
});

Router.onStop(function () {
    ChatRooms.update(this.params._id, {
        $inc: {
            users: -1
        }
    });
}, {
    only: ['chat']
})