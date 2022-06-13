const mongoose = require('mongoose');

// if (process.argv.length < 5) {
//     console.log('give all arguments')
//     process.exit(1)
// }
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://SaaraL:${password}@cluster0.5lzlx.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
})

const Person = mongoose.model('Person', personSchema)
if (process.argv.length === 5) {
    const person = new Person({
        name: name,
        phoneNumber: number,
    })

    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}
else if (process.argv.length === 3) {
    Person
        .find({})
        .then(result => {
            console.log('phonebook:')
            result.forEach(person => {
                console.log(person.name, person.phoneNumber)
            })
            mongoose.connection.close()
        })
}