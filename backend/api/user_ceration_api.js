const User = require('../models/user_creation')
const autoCatch = require('../lib/auto-catch')

module.exports = autoCatch({
  getuserbyid,
  listProducts,
  createProduct,
  editProduct1,
  editProduct,
  deleteProduct,
  validate_user,
  add_new_column,
  get_by_id

})

async function add_new_column(req, res, next) {
  const products1 = await User.add_new_column()
  res.json(products1)
}

async function getuserbyid(req, res, next) {
  // if (!req.isAdmin) return forbidden(next)
  const user = await User.get(req.query._id,req.query.search)
  if (!user) return next()
  res.json(user)
}

async function listProducts(req, res, next) {
  const products1 = await User.list(req.body.client_id)
  res.json(products1)
}

async function validate_user(req, res, next) {
  const products1 = await User.validate(req.body.user_name, req.body.password)
  console.log(products1);
  res.json(products1)
}

async function createProduct(req, res, next) {
  //console.log(req.body)
  const user = await User.create(req.body)
  res.json(user)
}

async function editProduct1(req, res, next) {
  const change = req.body
  const user = await User.edit1(req.params.id, change)
  res.json(user)
}

async function editProduct(req, res, next) {
  const change = req.body
  const user = await User.edit(req.params.id, change)
  res.json(user)
}

async function get_by_id(req, res, next) {
  const user = await User.get_by_id(req.params.id)
  res.json(user)
}



async function deleteProduct(req, res, next) {
  // if (!req.isAdmin) return forbidden(next)
  await User.remove(req.params.id)
  res.json({ success: true })
}

function forbidden(next) {
  const err = new Error('Forbidden')
  err.statusCode = 403
  return next(err)
}
