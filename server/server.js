import { Meteor } from 'meteor/meteor';

Meteor.publish("messages", function () {
    // we need to search for ourselves since Meteor.user() is not availible in publish functions
    var user = Meteor.users.findOne(this.userId);

    if (this.userId) {
        return Messages.find({
            $or: [
                {
                    private: false // all public messages
                },
                {
                    private: true,
                    author: this.userId // all private messages we've sent
                },
                {
                    private: true,
                    authorized: {
                        $in: [
                            user.username // all private messages sent to us
                        ]
                    }
                }
            ]
        });
    }
});

Meteor.publish("userData", function () {
    return Meteor.users.find();
});

Meteor.publish("chat_rooms", function () {
    return ChatRooms.find();
});
