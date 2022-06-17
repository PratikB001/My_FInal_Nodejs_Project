const express = require('express');
const User = require('../models/users');
const router = new express.Router();
const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/accounts');
const auth = require('../middleware/auth');

router.post('/users', async(req, res) => {
    const user = new User (req.body);

    try{
        await user.save();
        sendWelcomeEmail(user.email, user.name);
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    }catch(e){
        res.status(400).send(e);
    }
})

router.post('/users/login', async(req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).send({user, token});
    }catch(e){
        res.status(404).send(e);
    }
})

router.get('/users', auth, async(req,res) => {
    try{
        const users = await User.find({});
        res.status(200).send(users);
    }catch(e){
        res.send(e)
    }
})

router.patch('/users/me', auth, async(req, res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidUpdates = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidUpdates){
        return res.status(404).send({error: 'Invalid Update!'});
    }

    try{
        updates.forEach((update) => {
            req.user[update] = req.body[update];
        })

        await req.user.save();
        res.send(req.user);
    }catch(e){
        res.status(500).send(e);
    }
})

router.delete('/users/me', auth, async(req, res) => {
    try{
        await req.user.remove();
        sendCancellationEmail(req.user.email, req.user.name);
        res.send(req.user);
    }catch(e){
        res.status(500).send(e);
    }
})


module.exports = router;