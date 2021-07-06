const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const auth = require('../middleware/auth')

const User = require('../models/User');

//@route    GET api/auth
//@desc     Get logged in user
//@access   Private
router.get('/', auth, async (req,res)=>{
    try {
        //Get user details except the password
        const user = await User.findById(req.user.id).select('-password');  
        res.json(user); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    POST api/auth
//@desc     Auth user and get token(login)
//@access   Public
router.post('/',
    async (req,res)=>{

    const {email,password} = req.body;
    
    try {
        let user = await User.findOne({email});

        if(!user){
            return res.status(500).json({msg:"Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(500).json({msg:"Password invalid"});
        }

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
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

module.exports = router;