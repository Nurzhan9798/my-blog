const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const User = require('./models/User')
const jwt = require('jsonwebtoken')

const jwtSecret = 'jfdaeda324fdsfasef'
const salt = bcrypt.genSaltSync(10);

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json())
const PORT = 4000;

mongoose.connect('mongodb+srv://root:xBfMOBnL006NkQ9c@cluster0.6orb3jn.mongodb.net/?retryWrites=true&w=majority');

app.get("/", async (req, res) => {

    res.json("OK")
})

app.post('/registration', async (req, res) => {
    const {username, password} = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt)
        });
        res.json(userDoc);
    } catch (e) {
        res.status(400).json(e.message)
    }
})

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    console.log(username, password);
    try {
        const userDoc = await User.findOne({username})
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign(
                {username, id: userDoc._id},
                jwtSecret,
                {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json({user: userDoc, passOk});
                }
            )
        } else {
            res.status(400).json('wrong crediential')
        }

    } catch (e) {
        res.status(400).json(e.message);
    }
})

app.listen(PORT);
//mongodb+srv://root:xBfMOBnL006NkQ9c@cluster0.6orb3jn.mongodb.net/?retryWrites=true&w=majority

//
