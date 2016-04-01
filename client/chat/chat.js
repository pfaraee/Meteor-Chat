Meteor.subscribe("messages");
Meteor.subscribe("userData");
Meteor.subscribe("chat_rooms");

Template.chat.events({
    "submit .message-form": function (event) {
        event.preventDefault();

        var authArr = [],
            str = event.target.message.value,
            private = false;

        // "/tell" command code
        if (str.indexOf("/tell") === 0) {
            // so we can separate the command, from the target, from the message
            str = str.split(" ");
            // adds target to authorized list
            authArr.push(str[1]);
            // sets our string to the message
            str = str.slice(2);
            str = str.join(" ");
            // sets message to private
            private = true;
        }

        Messages.insert({
            author: Meteor.userId(),
            room: Router.current().params._id,
            content: str,
            private: private,
            authorized: authArr
        });

        event.target.message.value = "";
    },
    "submit .create-room": function (event) {
        event.preventDefault();

        var room = ChatRooms.insert({
            name: event.target.name.value,
            users: 0,
            private: false
        });

        event.target.name.value = "";

        Router.go("chat", {
            _id: room
        });
    }
});

Template.chat.helpers({
    messages: function () {
        console.log(this.fetch());
        return this;
    },
    getUsername: function () {
        var user = Meteor.users.findOne(this.author);

        if (user && user.username) {
            return user.username;
        }
    },
    isYou: function () {
        return this.author == Meteor.userId();
    },
    chatRooms: function () {
        return ChatRooms.find();
    }
});

Template.chatroom.events({
    "click .join-room": function (event) {
        event.preventDefault();

        Router.go("chat", {
            _id: this._id
        });
    }
});