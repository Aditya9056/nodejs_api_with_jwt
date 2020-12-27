const router = require('express').Router();
const User = require('../model/User');
const { register_val, login_val } = require('../routes/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
  
    //Validation before making the user
    const {error} = register_val(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    // Checking if already exist
    const emailExist = await User.findOne({email: req.body.email});
    if( emailExist ){
        return res.status(400).send('Email already Exist');
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt); 


    // Create a new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(404).send(err);
    }
});

//Login
router.post('/login', async (req, res) => {

    //Validation before user login
    const {error} = login_val(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    // Checking if email exist
    const user = await User.findOne({email: req.body.email});
    if( !user ){
        return res.status(400).send('Email or Password is wrong.');
    }

    // if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if( !validPass ){
        return res.status(400).send('Email or Password is wrong');
    }

    // Create and assign user a JsonToken

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    res.send('Sucess');

});

module.exports = router;