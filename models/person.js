require('dotenv').config();
const mongoose = require('mongoose');

// mongo-stuff


const url = process.env.MONGODB_URI;
mongoose.connect(url)
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch(error => {
        console.log('Error connecting to MongoDB', error.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

// to delte _id and _v from person object
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema);

