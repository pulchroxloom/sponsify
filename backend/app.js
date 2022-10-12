require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const events = require('./event')
const orgs = require('./org')
const app = express()
const port = 3001

mongoose.connect(
    process.env.MONGODB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

// Access database connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error!!\n'))

app.get('/', (req, res) => {
    res.send('Hello! This is the default route for the backend server.')
})

app.get('/get-all-FAQ', (req, res) => {
    orgs.find({ name: 'Society of Women Engineers'})
        .select({ FAQ: 1 })
        .exec((err, result) => {
            if (err) {
                console.log("Error on getAllOrgs, " + err)
            }
            res.send(result[0].FAQ)
        }
    )
})

app.get('/update-FAQ', (req, res) => {
    res.send('This route will update an FAQ')
})

app.get('/create-FAQ', (req, res) => {
    res.send('This route will create a new FAQ')
})

app.get('/delete-FAQ', (req, res) => {
    res.send('This route will delete an FAQ')
})

app.get('/get-enabled-events', (req, res) => {
    events.find({ visible: true })
        .exec((err, result) => {
            if (err) {
                console.log("Error on getAllOrgs, " + err)
            }
            res.send(result)
        }
    )
})

app.get('/get-all-events', (req, res) => {
    events.find()
        .exec((err, result) => {
            if (err) {
                console.log("Error on getAllOrgs, " + err)
            }
            res.send(result)
        }
    )
})

app.get('/create-event', (req, res) => {
    res.send('Create event')
})

app.listen(port, () => {
    console.log(`App listening on port ${port} :)`)
})
app.get('/create-sponsor', (req,res) => {
    res.send('Create Sponsor')
})
app.get('/update-event', (req,res) => {
    res.send('Update Event')
})
app.get('/delete-event', (req,res) => {
    res.send('Delete Event')
})
app.get('/checkout', (req,res) => {
    res.send('Checkout')
})