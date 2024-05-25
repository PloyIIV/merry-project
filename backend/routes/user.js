import express from "express";
import { supabase } from "../config/db.js";
import jwt from 'jsonwebtoken'

const userRouter = express.Router();

// TEST API
userRouter.get('/log', async (req, res) => {
    try {
        const { data, error } = await supabase.from('users').select();
        if (error) {
            return res.json({
                message: error
            })
        }
        return res.json({
            data: data
        })
    } catch (error) {
        console.log(error);
    }
})

userRouter.post('/login', async (req, res) => {
    const { password, username } = req.body;
    let lowerCaseEmail;
    if (req.body.email) {
        lowerCaseEmail = req.body.email.toLowerCase();
    }
    try {
        const { data, error } = await supabase.from('users').select('*').or(`email.eq.${lowerCaseEmail}, username.eq.${username}`);
        if (error) {
            return res.json({
                message: error
            })
        }
        if (!data[0]) {
            return res.status(404).json({
                message: `This email is not exists, Please sign up first.`
            })
        }
        if (password !== data[0].password) {
            return res.json({
                message: `Incorrect password. If you can't remember, Please reset password.`
            })
        }
        const token = jwt.sign(
            { id: data[0].id },
            process.env.SUPABASE_JWT,
            { expiresIn: "900000" }
        )
        return res.json({
            data: data[0],
            token
        })
    } catch (error) {
        console.error(error);
        res.json({
            message: `ERROR: There's something wrong, Can't login right now. ${error}`
        })
    }
})

userRouter.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const lowerCaseEmail = email.toLowerCase();
    try {
        const checkUser = await supabase.from('users').select('*').eq('email', lowerCaseEmail);
        if (checkUser.data[0]) {
            return res.json({
                message: "This email is already in used"
            })
        }
        const { data, error } = await supabase.from('users').insert([{
            email: lowerCaseEmail, password, username
        }]).select();
        if (error) {
            return res.json({
                message: error
            })
        }
        return res.json({
            message: "Created new account successfully",
            data: data[0]
        })
    } catch (error) {
        console.error(error);
        res.json({
            message: `ERROR: There's something wrong, Can't register right now. ${error}`
        })
    }
})

export default userRouter