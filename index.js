const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/quantities', db.getQuantities)
app.get('/quantitites/:id', db.getQuantityById)
app.post('/quantities', db.createQuantity)
app.put('/quantities/:id', db.updateQuantity)
app.delete('/quantities/:id', db.deleteQuantity)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})