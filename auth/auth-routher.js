const byscryptjs = require('bycryptjs') // <-- add this file
const router = require("express").Router();

const Users = require("../users/users-model.js");

router.post('/register', (req, res) => {
    let creds = req.body
    const rounds = process.env.HASH_ROUNDS || 4

    const hash = bycryptjs.hawshSync(creds.password, rounds)

    creds.password = hash

    Users.add(creds)
        .then(saved => {
            res.status(201).json({ data: saved })
        })
        .catch( error)
})