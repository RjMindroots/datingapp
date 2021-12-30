import express from "express";
const router = express.Router();

router.post('/register', (req, res) => {
    const { user_name, user_password } = req.body
    
    res.send("working fine")
})


router.post('/login', (req, res) => {
    const { user_name, user_password } = req.body
    res.send("working fine")
})


export default router