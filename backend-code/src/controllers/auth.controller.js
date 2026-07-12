const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");


async function registerUser(req , res){

    const {name , email , password}= req.body;

        if(!name || !email || !password){
    return res.status(400).json({
        message:"All fields are required"
    })
}

    const isUserExists = await userModel.findOne({
        email,
    })

    if(isUserExists){
        return res.status(409).json({
             success: false,
            message : "user already exists"
        })
    }



    const hash = await bcrypt.hash(password , 10)

    const user = await userModel.create({
        name , 
        email, 
        password: hash,
    })

    const token = jwt.sign(
    {
        id: user._id
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d"
    }
);

    res.cookie("token",token)

    res.status(201).json({
        message:"User registered successfully",
         id: user._id,
        name: user.name,
        email: user.email

    })
}

async function loginUser(req , res) {
    const {email , password} = req.body

    if (!email || !password) {
    return res.status(400).json({
        success: false,
        message: "Email and password are required"
    });
}

    const user = await userModel.findOne({
        email,
    })

    if(!user){
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

  const isPasswordValid = await bcrypt.compare(password , user.password)

  if(!isPasswordValid){
        return res.status(401).json({message: "invalid credentials"})
    }

        const token = jwt.sign(
    {
        id: user._id
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d"
    }
);

    res.cookie("token",token)


      res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
        id: user._id,
        name: user.name,
        email: user.email
    }
});

}


async function logoutUser(req, res){
    
    res.clearCookie("token")

    return res.status(200).json({
    success: true,
    message: "User logged out successfully"
});
}

async function getLoggedInUser(req, res) {

    return res.status(200).json({
        success: true,
        user: req.user
    });

}



module.exports = {registerUser , loginUser ,logoutUser , getLoggedInUser  }
