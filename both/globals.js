Messages = new Mongo.Collection('messages');

/*
    Messages
        _id string
        author "string
        content string
        private bool
        authorized array
*/

ChatRooms = new Mongo.Collection('chat_rooms');

/*
    ChatRooms
        _id string
        name string
        users int
        private bool
*/