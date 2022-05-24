const res = require('express/lib/response');
const {users} = require('../models');

const usersControl = {
    createUsers ({body}, ras) {
        users.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    getAllUsers (req,res) {
        users.find({})
        .populate({path: 'thoughts', select: '__v'})
        .populate({path: 'friends', select: '__v'})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    getUsersById ({params},res){
        users.findOne({_id: params.id})
        .populate({path: 'thoughts', select: '__v'})
        .populate({path: 'friends', select: '__v'})
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'no users with this id'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    updateUsers({params, body}, res) {
        users.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'no users with this id'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    deleteUsers({params}, res){
        users.findOneAndDelete({_id:params.id})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'no users with this id'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    addFriend({params}, res){
        users.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select:'-__v'})
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'no users with this id'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err));
    },
    deleteFriend({params},res){
        users.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select:'-__v'})
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'no users with this id'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = usersControl;