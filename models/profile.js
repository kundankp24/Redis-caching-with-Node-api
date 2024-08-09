const mongoose= require('mongoose');

const profileSchema= new mongoose.Schema(
    {
        username: String,
        email: String,
        bio: String,
    }
);
const Profile= mongoose.model('Profile', profileSchema);

module.exports=Profile;