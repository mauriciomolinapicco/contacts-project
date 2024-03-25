const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@description register
//@route POST /api/users/register
//@acces public
const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory"); 
    }

    //check if user already exists
    const userAvailable = await User.findOne({email});
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered!");
    }

    //Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log("User created succesfully", user);

    if (user) {
        res.status(201).json({_id: user.id, email: user.email})
    } else {
        res.status(400);
        throw new Error("User data was not valid");
    }
});

//@description login
//@route POST /api/users/login
//@acces public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    
    //check if user exists in my db
    const user = await User.findOne({ email });
    //compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accesToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        //Expiration time of the token(session)
        { expiresIn: "20m" }
        );
        res.status(200).json({ accesToken });
    } else {
        res.status(401);
        throw new Error("Email or password is not valid");
    }
});

//@description current user info
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});


module.exports = {registerUser,loginUser,currentUser};