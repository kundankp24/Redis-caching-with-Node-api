const redisClient= require('../redisClient');
const Profile= require('../models/profile');

const getProfile = async (username) => {
    try {
        const data = await redisClient.get(username);
        if (data) {
            console.log('Cache hit');
            return JSON.parse(data);
        }
        console.log('Cache miss');

        const profile = await Profile.findOne({ username });
        if (profile) {
            await redisClient.set(username, JSON.stringify(profile), 'EX', 3600);
        }
        return profile;
    } catch (error) {
        console.error('Error getting profile:', error);
        throw error; 
    }
}

const updateProfile= async(username, newData)=>{
    try {
        const updateProfileData= await Profile.findOneAndUpdate({username}, newData, {new: true});
        await redisClient.del(username);
        return updateProfileData;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const createProfile= async(profileData)=>{
    try {
        const newProfile= new Profile(profileData);
        await newProfile.save();
        await redisClient.set(profileData.username, JSON.stringify(newProfile), 'EX', 3600);
        return newProfile;
    } catch (error) {
        throw err;
    }
}

module.exports={getProfile, updateProfile, createProfile}