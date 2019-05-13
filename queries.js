const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

//GET all Quantities

const getQuantities = (request, response) => {
    pool.query('SELECT * FROM quantity, types, warehouse WHERE quantity.id_t = types.t_id AND quantity.id_w = warehouse ORDER BY warehouse.adress', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

//GET a single quantity by warhaouse id

const getQuantityById = (request, response) => {
    const id_w = parseInt(request.params.id)
  
    pool.query('SELECT types.name, quantity.value FROM quantity, warehouse, types WHERE quantity.id_w = warehouse.w_id AND quantity.id_t = types.t_id and warehouse.w_id.w_id = $1', [id_w], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

//POST a new quantity

const createQuantity = (request, response) => {
    const { id_t, value, id_w } = request.body
  
    pool.query('INSERT INTO quantity (id_t, value, id_w) VALUES ($1, $2, $3)', [id_t, value, id_w], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Quantity added with id: ${result.insertId}`)
    })
  }

//PUT updated data in a existing quantity

const updateQuantity = (request, response) => {
    const id_q = parseInt(request.params.id)
    const { value } = request.body
  
    pool.query(
      'UPDATE quantity SET value = $1 WHERE id_q = $2',
      [value, id_q],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Quantity modified with ID: ${id}`)
      }
    )
  }


//DELETE a quantity

const deleteQuantity = (request, response) => {
    const id_q = parseInt(request.params.id)
  
    pool.query('DELETE FROM quantity WHERE id_q = $1', [id_q], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Quantity deleted with ID: ${id}`)
    })
  }

  module.exports = {
    getQuantities,
    getQuantityById,
    createQuantity,
    updateQuantity,
    deleteQuantity,
  }