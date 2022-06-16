require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const Person = require('./models/person')


// morgan token
morgan.token('postPerson', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.static('build'))
app.use(express.json())

app.use(requestLogger)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postPerson'))
app.use(cors())


// let persons =
//     [
//         {
//             name: "Arto Hellas",
//             number: "040-123456",
//             id: 1
//         },
//         {
//             name: "Ada Lovelace",
//             number: "39-44-5323523",
//             id: 2
//         },
//         {
//             name: "Dan Abramov",
//             number: "12-43-234345",
//             id: 3
//         },
//         {
//             name: "Mary Poppendieck",
//             number: "39-23-6423122",
//             id: 4
//         }
//     ];


//helper functions
// const newValue = () => {
//   const randomInteger = Math.floor(Math.random() * 1000)
//   if (persons.find(person => person.id === randomInteger)) {
//     return (newValue())
//   }
//   else {
//     return randomInteger
//   }
// }
// const isUnique = (name) => {
//   if (persons.find(person => person.name.toLowerCase() === name.toLowerCase())) {
//     return false
//   }
//   return true
// }

// functionalities
app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then(people => {
      response.json(people)
    })
})

app.get('/info', (request, response) => {
  Person
    .find({})
    .then(people => {
      console.log('hello', people)
      const timeStamp = Date()
      const contacts = people.length
      response.send(`<p>Phonebook has info for ${contacts} people. </p>
    <p>${timeStamp}</p>`)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  // const id = +request.params.id;
  // const person = persons.find(person => person.id === id);
  // if (person) {
  //     response.json(person)
  // } else {
  //     response.status(404).end()
  // }
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
  //before using next:
  // {
  //     console.log(error)
  //     response.status(400).send({ error: 'malformatted id}' })
  // })
})

app.delete('/api/persons/:id', (request, response, next) => {
  // const id = +request.params.id;
  // persons = persons.filter(person => person.id !== id)
  // response.status(204).end();
  Person.findByIdAndDelete(request.params.id)
    .then(() => { response.status(204).end() })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  // if (!body.name) {
  //     return response.status(400).json({
  //         error: 'name is missing'
  //     })
  // } else if (!body.number) {
  //     return response.status(400).json({
  //         error: 'number is missing'
  //     })
  // } else if (!isUnique(body.name)) {
  //     return response.status(400).json({
  //         error: 'name must be unique'
  //     })
  // }
  // const newId = newValue();

  // const newperson = {
  //     name: body.name,
  //     number: body.number,
  //     id: newId
  // }
  // persons = [...persons, newperson]
  // response.json(newperson)
  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})
//update 3.17
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  console.log(name, number, { name, number })
  // const person = {
  //     name: body.name,
  //     number: body.number
  // };
  Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, context: 'query' })
    .then(updatePerson => {
      response.json(updatePerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// error handler middleware
const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
//registery of errorHandler middleware after all others!!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`)
})