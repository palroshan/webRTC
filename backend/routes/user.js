const router = require('express').Router();
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/verifyToken')

// register and login api
router.post('/login', async (req, res) => {
    const { email, name } = req.body;
    if (!name || !email) {
        return res.status(401).json({ message: "Please add all the fields" });
    }
    try {
        //find user by email
        const user = await User.findOne({ email: email })
        const token = jwt.sign({ email: email, name: name }, process.env.jwt_secret)
        if (!user) {
            const newUser = new User({
                name: name,
                email: email,
            })
            const savedUser = await newUser.save()
            res.status(200).json(token, { user: savedUser })
        } else {
            res.status(200).json({ token, user })
        }
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router;