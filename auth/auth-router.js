const bcryptjs = require('bcryptjs'); // <-- add this file
const { json } = require('express');
const router = require("express").Router();

const Users = require("../users/users-model.js");

router.post('/register', (req, res, next) => {
    let creds = req.body
    const rounds = process.env.HASH_ROUNDS || 4

    const hash = bcryptjs.hashSync(creds.password, rounds)

    creds.password = hash

    Users.add(creds)
        .then(saved => {
            res.status(201).json({ data: saved })
        })
        .catch(next)
})

router.post('/login', (req, res, next) => {
    //how to verify passwords?

    const { username, password } = req.body

    Users.findBy({ username })
        .then(users => {
            const user = users[0]
            if (user && bcryptjs.compareSync
                (password, user.password)) {
                    // store the session to the database
                    // product a cookie
                    // send bac
                    req.session.loggedIn = true
                    req.session.username = user.username
                    
                res.status(200).json({ message: 'Welcome!', session: req.session })
            } else {
                res.status(401).json({ message: 'Invalid credentials' })
            }
        })
        .catch(next)
})
router.post('/logout', (req, res, next) => {
    //how to verify passwords?

    let creds = req.body
    const rounds = process.env.HASH_ROUNDS || 4

    const hash = bcryptjs.hashSync(creds.password, rounds)

    creds.password = hash

    Users.add(creds)
        .then(saved => {
            res.status(201).json({ data: saved })
        })
        .catch(next)
})


module.exports = router