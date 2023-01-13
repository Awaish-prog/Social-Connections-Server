const mongoose = require('mongoose')
const express = require('express')
const app = express()
const Person = require("./userModel")
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://Awaish17:LearnArabic@cluster0.catxjsk.mongodb.net/?retryWrites=true&w=majority")


app.post("/api/createPerson", async (req, res) => {
    await Person.create({
        uid: req.body.uid,
        name: req.body.personName,
        connections: []
     })
     res.status(201).send({status: "ok"})
})

app.post("/api/addConnection", async (req, res) => {
    const personOne = await Person.findOne({uid: req.body.uidOne})
    const personTwo = await Person.findOne({uid: req.body.uidTwo})
    personOne.connections.push(personTwo.uid)
    personTwo.connections.push(personOne.uid)
    personOne.save()
    personTwo.save()
    res.status(201).send({status: "ok"})
})

app.delete("/api/deleteAllPeople", async (req, res) => {
    await Person.deleteMany()
    res.status(202).send({status: "ok"})
})

app.get("/api/getAllPeople", async (req, res) => {
    const allpeople = await Person.find()
    const allPeople = []
    allpeople.forEach(person => {
        allPeople.push({
            id: person.uid,
            name: person.name,
            connections: person.connections
        })
    }) 
    res.status(200).send({allPeople: allPeople})
})

app.listen("3001", () => {
    console.log("server running");
})