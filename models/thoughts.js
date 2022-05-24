const {Schema, Model} = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const thoughtsSchema = new Schema(
    {
        thoughtsText: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true  
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        reactions:[reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

thoughtsSchema.virtual('reactionCount').get(function(){
    return this.reaction.length
});

const thoughts = Model('thoughts', thoughtsSchema);

module.exports = {thoughts};