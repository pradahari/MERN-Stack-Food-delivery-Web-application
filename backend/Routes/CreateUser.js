const express = require("express");
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const jwtSecrete="my name hari";
router.post('/createuser',
    body('email').isEmail(),
    body('name').isLength({min:5}),
    body('password','Incorrect password').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt=await bcrypt.genSalt(10);
        const secPassword=await bcrypt.hash(req.body.password,salt);
        try {
            await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: secPassword
            })
            
            res.json({ sucess: true});

        } catch (error) {
            console.log(error);
            res.json({ sucess: false });
        }
    })

    router.post('/loginuser', body('email').isEmail(),
    body('password','Incorrect password').isLength({ min: 5 }),
    async (req, res) => {
       let email= req.body.email;
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
       }
        try {
            const userData=await User.findOne({email})
            if(!userData)
            {
                return res.status(400).json({ errors: "Enter valid credentials" });
            }
            const pwdData=await bcrypt.compare(req.body.password,userData.password)
            if(!pwdData)
            {
                return res.status(400).json({ errors: "Enter valid credentials" });
            }
            const data={
                user:{
                    id:userData.id
                }
            } 
            const authToken=jwt.sign(data,jwtSecrete)
            return res.json({sucess: true,authToken:authToken}) 

        } catch (error) {
            console.log(error);
            res.json({ sucess: false });
        }
    })
module.exports = router;