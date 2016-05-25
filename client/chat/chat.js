import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

const whisper = require('whisper-handler');

Template.chat.onCreated(function () {
    Meteor.subscribe("messages");
    Meteor.subscribe("userData");
});

Template.chat.events({
    "submit .message-form": function (event) {
        event.preventDefault();

        var authArr = [],
            str = event.target.message.value;

        var message = whisper(str);

        authArr.push(message.target);

        Messages.insert({
            author: Meteor.userId(),
            room: Router.current().params._id,
            content: message.message,
            private: message.private,
            authorized: authArr,
            created: new Date()
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
