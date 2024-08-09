const express= require('express');
const {getProfile, updateProfile, createProfile}= require('../services/cache');
const Profile = require('../models/profile');

const router= express.Router();

router.get('/:username', async (req, res)=>{
    const username= req.params.username;
    console.log(username);
    try {
        const profile= await getProfile(username);
        if(profile){
            return res.json(profile);
        }
        else{
            return res.status(404).json({message: 'Profile not found'})
        }
    } catch (error) {
        return res.status(500).json({message: "Internal Server error", error: error.message})
    }
});

router.put('/:username', async (req, res)=>{
    const username= req.params.username;
    const newData= req.body;
    try {
        const updatedProfile= await updateProfile(username, newData);
        return res.status(200).json(updatedProfile);
    } catch (error) {
        return res.status(500).json({message: "Internal Server error", error: error.message});
    }
});

router.post("/", async (req, res)=>{
    const profile= req.body;
    try {
        const newProfile= await createProfile(profile);
        return res.status(200).json(newProfile);
    } catch (error) {
        return res.status(500).json({message: "Internal Server error", error: error.message})
    }
})

module.exports=router;