const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
var https = require('https');
var fs = require('fs');




const product_creation_api = require('./api/product_creation_api')
const return_creation_api = require('./api/return_api')
const material_creation_api = require('./api/grouping_material_api')
const admin_users_api = require('./api/admin_users_api')
const stock_tracker_api = require('./api/stock_tracking_api')
const user_creation_api = require('./api/user_ceration_api')


var cors = require('cors')
const middleware = require('./middleware')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

app.post('/product_creation_api_list', product_creation_api.listProducts)
app.get('/product_creation_api_list_all', product_creation_api.listProductsAll)
app.get('/product_creation_api/:id', product_creation_api.getuserbyid)
app.post('/product_creation_api', product_creation_api.createProduct)
app.put('/product_creation_api/:id', product_creation_api.editProduct1)
app.delete('/product_creation_api/:id', product_creation_api.deleteProduct)
app.get('/add_new_column/', product_creation_api.add_new_column)

app.post('/return_creation_api_list', return_creation_api.listProducts)
app.get('/return_creation_api_list_all', return_creation_api.listProductsAll)
app.get('/return_creation_api/:id', return_creation_api.getuserbyid)
app.post('/return_creation_api', return_creation_api.createProduct)
app.put('/return_creation_api/:id', return_creation_api.editProduct1)
app.delete('/return_creation_api/:id', return_creation_api.deleteProduct)

app.post('/material_grouping_creation_api_list', material_creation_api.listProducts)
app.post('/material_grouping_creation_api_list_group_name', material_creation_api.listProductsByGroupName)
app.get('/material_grouping_creation_api/:id', material_creation_api.getuserbyid)
app.post('/material_grouping_creation_api', material_creation_api.createProduct)
app.put('/material_grouping_creation_api/:id', material_creation_api.editProduct)
app.delete('/material_grouping_creation_api/:id', material_creation_api.deleteProduct)

app.get('/admin_users_api', admin_users_api.listProducts)
app.get('/admin_users_api/:id', admin_users_api.getuserbyid)
app.post('/admin_users_api', admin_users_api.createProduct)
app.put('/admin_users_api/:id', admin_users_api.editProduct)
app.delete('/admin_users_api/:id', admin_users_api.deleteProduct)
app.post('/admin_creation_api_validate', admin_users_api.user_validate)

app.post('/stock_tracker_api_list', stock_tracker_api.listProducts)
app.get('/stock_tracker_api/:id', stock_tracker_api.getuserbyid)
app.post('/stock_tracker_api', stock_tracker_api.createProduct)
app.put('/stock_tracker_api/:id', stock_tracker_api.editProduct)
app.delete('/stock_tracker_api/:id', stock_tracker_api.deleteProduct)
app.post('/stock_tracker_getbydate', stock_tracker_api.listOrders)

app.post('/user_creation_api_list', user_creation_api.listProducts)
app.get('/user_creation_api/', user_creation_api.getuserbyid)
app.get('/user_creation_get_by_id/:id', user_creation_api.get_by_id)
app.post('/user_creation_api', user_creation_api.createProduct)
app.put('/user_creation_api/:id', user_creation_api.editProduct1)
app.put('/user_creation_api_one/:id', user_creation_api.editProduct)
app.delete('/user_creation_api/:id', user_creation_api.deleteProduct)
app.post('/user_creation_api_validate', user_creation_api.validate_user)
app.get('/user_add_column', user_creation_api.add_new_column)


app.use(middleware.handleValidationError)
app.use(middleware.handleError)
app.use(middleware.notFound)


const server = app.listen(5008, () =>
  console.log(`Server listening on port ${5008}`)
)

if (require.main !== module) {
  module.exports = server
}


