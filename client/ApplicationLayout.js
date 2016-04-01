Template.ApplicationLayout.onCreated(function () {
    Meteor.subscribe("chat_rooms");
});

Template.ApplicationLayout.events({
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

Template.ApplicationLayout.helpers({
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