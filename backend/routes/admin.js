import { supabase } from "../config/db.js";
import express from "express";
import jwt from 'jsonwebtoken'

const adminRouter = express.Router();

adminRouter.get('/test', async (req, res) => {
    return res.json({
        message: "API is working"
    })
})

adminRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const lowerCaseEmail = email.toLowerCase();
    console.log(lowerCaseEmail);
    try {
        const { data, error } = await supabase.from('admin').select('*').eq('email', lowerCaseEmail);
        if (error) {
            return res.json({
                message: error
            })
        }
        if (!data[0]) {
            return res.json({
                message: "Email not found"
            })
        }
        if (password !== data[0].password) {
            return res.json({
                message: "Password incorrect"
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

adminRouter.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const lowerCaseEmail = email.toLowerCase();
    try {
        const checkUser = await supabase.from('admin').select('*').eq('email', lowerCaseEmail)
        if (checkUser.data[0]) {
            return res.json({
                message: "This email is already in used"
            })
        };
        const { data, error } = await supabase.from('admin').insert([{
            email: lowerCaseEmail, password: password
        }]).select();
        if (error) {
            return res.json({
                message: error
            })
        }
        return res.json({
            message: "Created new admin account successfully",
            data: data[0]
        })
    } catch (error) {
        console.error(error);
        res.json({
            message: `ERROR: There's something wrong, Can't register right now. ${error}`
        })
    }
})

// adminRouter.post('/register', async (req, res) => {
//     const { email, password, name } = req.body;
//     try {
//         const { data, error } = await supabaseAdmin.auth.admin.createUser({
//             email: email,
//             password: password,
//             user_metadata: {
//                 name: name
//             }
//         })
//         if (error) {
//             return res.json({
//                 message: error
//             })
//         }
//         return res.json({
//             message: "Created new account successfully"
//         })
//     } catch (error) {
//         console.error(error);
//         res.json({
//             message: "ERROR: There's something wrong, Can't register right now."
//         })
//     }
// })

export default adminRouter