const express = require('express');
const Message = require('../models/messages');
const User = require('../models/users');
const router = new express.Router();
const auth = require('../middleware/auth');

router.post('/message/:id', auth, async(req, res) => {
    const receiverID = req.params.id;
    const user = await User.findById(receiverID);
    if(!user){
        return new Error('User could not be found');
    }

    const message = new Message({
        ...req.body,
        senderID: req.user._id,
        receiverID: req.params.id
    })

    try{
        await message.save();
        res.status(201).send(message);
    }catch(e){
        res.status(400).send(e);
    }
})

router.patch('/updatemessages/:id', auth, async(req, res) => {
    const updates = Object.keys(req.body);
    const isAllowed = ['message'];
    const isValidUpdates = updates.every((update) => isAllowed.includes(update));
    
    if(!isValidUpdates){
        return res.status(404).send({error: 'Invalid Update!'})
    }
    try{
        const message = await Message.findOne({_id: req.params.id, senderID: req.user._id});
        if(!message){
            return res.status(404).send();
        }

        updates.forEach((update)=>{
            message[update] = req.body[update];
        })
        await message.save();
        res.send(message);
    }catch(e){
        res.status(400).send(e);
    }
    
})

router.delete('/deletemessage/:id', auth, async(req, res) => {
    try{
        const message = await Message.findOneAndDelete({_id: req.params.id, senderID: req.user._id});
        if(!message){
            return res.status(404).send();
        }
        res.send(message);
    }catch(e){
        res.status(400).send(e);
    }
})



module.exports = router;