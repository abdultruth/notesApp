// const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')


app.use(express.json())
app.use(cors())

morgan.token('body', req => {
    return JSON.stringify(req.body)
  })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]


// const app = http.createServer((request, response) => {
//     response.writeHead(200, {'Content-Type':'application/json'})
//     response.end(JSON.stringify(notes))
// })

// const PORT = 3002
// app.listen(PORT)
// console.log(`Server running on port ${PORT} ....`)

const getAllNotes = (req, res) => {

    
    // res.status(200).json({
    //     status: 'Success',
    //     result: notes.length,
    //     data: {
    //         notes
    //     }
    //     });
    res.status(200).json(notes);
}

const getOneNote = (req, res) => {
    const id = req.params.id * 1
    const note = notes.find(n => n.id == id)
    
    if(note) {
        res.status(200).json({
            status: 'Success',
            data: {
                note
            }})
    } else {
        res.status(404).json({
            message:`Note with id of '${id}' Not Found`,
            status: 404
        })
    }
}


const createOneNote = (req, res) => {
    const note = req.body
    res.status(201).json({note})
}

const updateOneNote = (req, res) => {
    const id = req.params.id * 1
    const note = {
        id: id,
        content: req.body.content,
        important: req.body.important
    }

    res.status(301).json({
        status:'Success',
        data:{
            note
        }
    });
}

const deleteOneNote = (req, res) => {
    const id = req.params.id * 1
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
}


// app.get('/api/v1/notes', getAllNotes)
// app.get('/api/v1/notes/:id', getOneNote)
// app.post('/api/v1/notes', createOneNote)
// app.patch('/api/v1/notes/:id', updateOneNote)
// app.delete('api/v1/note/:id', deleteOneNote)



app
.route('/api/v1/notes')
.get(getAllNotes)
.post(createOneNote)

app
.route('/api/v1/notes/:id')
.get(getOneNote)
.patch(updateOneNote)
.delete(deleteOneNote)




const PORT = process.env.PORT || 8080


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})




