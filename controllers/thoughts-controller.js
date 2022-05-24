const { thoughts, users} = require('../models');

const thoughtsControl = {
    createThoughts({params, body}, res) {
        thoughts.create(body)
        .then (({_id}) => {
            return users.findOneAndUpdate({_id: params.userId}, {$push: {thoughts: _id}}, {new: true});
        })
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'no thoughts with this id'});
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.json(err));
    },
    getAllThoughts (req,res){
        thoughts.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select ('-__v')
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        });
    },
    getThoughtsById({params}, res) {
        thoughts.findOne({_id: params.id})
        .populate({path: 'reactions', select: '-__v'})
        .select ('-__v')
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'no thoughts with this id'});
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        });
    },
    updateThoughts({params, body}, res) {
        thoughts.findOneAndUpdate({_id: params.id}, body, {new:true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select ('-__v')
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'no thoughts with this id'});
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.json(err));
    },
    deleteThoughts({params}, res) {
        thoughts.findOneAndDelete({_id: params.id})
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'no thoughts with this id'});
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.json(err));
    },
    addReaction({params, body}, res){
        thoughts.findOneAndUpdate ({_id: params.thoughtsId}, {$push: {reactions: body}}, {new: true, runValidators:true})
        .populate({path: 'reactions', select: '-__v'})
        .select ('-__v')
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'no thoughts with this id'});
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.status(400).json(er))
    },
    deleteReaction({params}, res){
        thoughts.findOneAndUpdate ({_id: params.thoughtsId}, {$push: {reactions: body}}, {new: true, runValidators:true})
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'no thoughts with this id'});
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.status(400).json(er))
    }
};

module.exports = thoughtsControl;