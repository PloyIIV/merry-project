import express from "express";
import { supabase } from "../config/db.js";

const userRouter = express.Router();

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
    const { username, password } = req.body
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