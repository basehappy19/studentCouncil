require('dotenv').config();
const User = require('../Models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { getNextSequence } = require('../functions/Counter');
const secretKey = process.env.SECRET_KEY;

exports.register = async(req,res) => {
    try {
        const {username, password, fullName, displayName, roleId, accessId, profilePicture} = req.body;
        if (!username || !password || !fullName || !displayName || !roleId || !accessId) {
            return res.status(400).json({ message: 'Please provide all required fields: username, password, fullName, displayName, roleId, accessId.' });
        }
        
        let user = await User.findOne({username});
        if(user){
            return res.status(400).send('User Already Exists');
        } 

        const salt = await bcrypt.genSalt(10);
        const id = await getNextSequence('userId');

        console.log(req.body)
        user = new User({
            id,
            username,
            password,
            fullName,
            displayName,
            roleId,
            accessId,
            profilePicture,
        });
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Generate JWT
        const payload = {
            user: {
                id: user.id,
                username: user.username,
                roleId: user.roleId,
                accessId: user.accessId
            }
        };

        const token = jwt.sign(payload, secretKey, { expiresIn: '1d' });

        res.status(200).json({ token });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const users = await User.aggregate([
            { $match: { username: username } },
            { 
                $lookup: { 
                    from: "roles", 
                    localField: "roleId", 
                    foreignField: "id", 
                    as: "roleData" 
                } 
            },
            { 
                $project: { 
                    id: 1,
                    username: 1,
                    password: 1,
                    fullName: 1,
                    displayName: 1,
                    profilePicture: 1,
                    roleId: 1,
                    accessId: 1,
                    roleData: {
                        $map: {
                            input: "$roleData",
                            as: "role",
                            in: { id: "$$role.id", name: "$$role.name" }
                        }
                    }
                } 
            }            
        ]);
        if (users.length === 0) {
            return res.status(400).send("User Not Found!!!");
        }

        const user = users[0]; 

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Password Invalid!!");
        }

        const payload = {
            user: {
                id: user.id,
                username: user.username,
                roleId: user.roleId,
                accessId: user.accessId
            }
        };

        const token = jwt.sign(payload, secretKey, { expiresIn: '1d' });

        res.status(200).json({ 
            token, 
            id: user.id,
            username: user.username,
            fullName: user.fullName,
            displayName: user.displayName,
            profilePicture: user.profilePicture,
            accessId: user.accessId,
            role: user.roleData,
        });

    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};



