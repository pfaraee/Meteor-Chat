Template.chat.onCreated(function () {
    Meteor.subscribe("messages");
    Meteor.subscribe("userData");
});

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
    }
});

Template.chat.helpers({
    getUsername: function () {
        var user = Meteor.users.findOne(this.author);

        if (user && user.username) {
            return user.username;
        }
    },
    isYou: function () {
        return this.author == Meteor.userId();
    }
});