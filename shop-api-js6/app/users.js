const express = require("express");
const User = require("./models/User");
const router = express.Router();
const auth = require('./middleware/auth');

const createRouter = () => {
    router.get("/", async (req, res) => {
       res.send(await User.find());
    });
    router.post("/", async (req, res) => {
       try {
           const user = new User(req.body);

           user.generateToken();
           await user.save();
           res.send(user);
       } catch(e) {
           res.status(400).send(e);
       }
    });

    router.post("/sessions", async (req, res) => {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            return res.status(400).send({error: "Username not found"});
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            return res.status(400).send({error: "Password is wrong"});
        }

        user.generateToken();

        await user.save({validateBeforeSave: false});

        res.send(user);
    });

    router.delete('/sessions', auth, async (req, res) => {
        const user = req.user;
        const message = {message: 'Success'};

        user.token = '';
        await user.save({validateBeforeSave: false});
        res.send(message);
    });

    return router;
};

module.exports = createRouter;