const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();

const User = require('../models/User');

//@route    POST api/users
//@desc     User Registration
//@access   Public
router.post('/', async (req,res)=>{
    const { email,password } = req.body;

    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg:'User already exist'});
        }
        user = new User({
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        await user.save();

        const payload = {
            user:{
                id:user.id
            }
        }

        jwt.sign(payload,config.get('jwtSecret'),
            {
                expiresIn:360000
            },
            (err,token)=>{
                if(err) throw err;
                res.json({token});
            }
        )

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;