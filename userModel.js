const mongoose = require('mongoose')

const Person = new mongoose.Schema(
    {
        uid: Number,
        name: String,
        connections: [Number]
    }
)
const People = mongoose.model("People", Person);

module.exports = People;