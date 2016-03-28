Meteor.publish("messages", function () {
    // we need to search for ourselves since Meteor.user() is not availible in publish functions
    var user = Meteor.users.findOne(this.userId);

    if (this.userId) {
        return Messages.find({
            $or: [
                {
                    private: false
                },
                {
                    private: true,
                    author: this.userId
                },
                {
                    private: true,
                    authorized: {
                        $in: [
                            user.username
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