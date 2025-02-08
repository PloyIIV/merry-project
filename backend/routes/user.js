import express from "express";
import { supabase } from "../config/db.js";
import jwt from 'jsonwebtoken'
import { protect } from "../middlewares/protect.js";

const userRouter = express.Router();

// TEST API
userRouter.get('/log', protect, async (req, res) => {
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

userRouter.get('/:id', protect, async (req, res) => {
    try {
        const { data, error } = await supabase.from('users').select('*').eq('id', req.params.id);
        if (error) {
            return res.json({
                message: error
            })
        }
        return res.json({
            data: data[0]
        })
    } catch (error) {
        console.log(error);
        res.json({
            message: `ERROR: There's something wrong, Can't login right now. ${error}`
        })
    }
})

userRouter.post('/login', async (req, res) => {
    console.log(req.body)
    const { password, username } = req.body;
    let lowerCaseEmail;
    if (req.body.username.includes('@')) {
        lowerCaseEmail = req.body.username.toLowerCase();
        console.log(lowerCaseEmail)
    }
    try {
        const { data, error } = await supabase.from('users').select('*').or(`email.eq.${lowerCaseEmail}, username.eq.${username}`);
        if (error) {
            return res.json({
                message: error
            })
        }
        if (!data[0]) {
            return res.json({
                message: `This email is not exists, Please sign up first.`
            })
        }
        if (password !== data[0].password) {
            return res.json({
                status: 404,
                message: `Incorrect password. If you can't remember, Please reset your password.`
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