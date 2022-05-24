const {schema, model} = require('mongoose');
const reactionSchema = require('../models/reaction');

const thoughtsSchema = new schema(
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
        reaction: [reactionSchema]
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

const thoughts = model('thoughts', thoughtsSchema);

module.exports = {thoughts};