const User = require('../models/return')
const autoCatch = require('../lib/auto-catch')

module.exports = autoCatch({
  getuserbyid,
  listProducts,
  listProductsAll,
  createProduct,
  editProduct1,
  deleteProduct,
 
})

async function getuserbyid (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)
  const { id } = req.params
  const user = await User.get(id)
  if (!user) return next()
  res.json(user)
}

async function listProducts (req, res, next) {
  const products1 = await User.list(req.body.user_id)
  res.json(products1)
}

async function listProductsAll (req, res, next) {
  const products1 = await User.list_all()
  res.json(products1)
}

async function createProduct (req, res, next) {
  //console.log(req.body)
  const user = await User.create(req.body)
  res.json(user)
}

async function editProduct1 (req, res, next) {
  const change = req.body
  const user = await User.edit1(req.params.id, change)
  res.json(user)
}

async function deleteProduct (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)
  await User.remove(req.params.id)
  res.json({ success: true })
}

function forbidden (next) {
  const err = new Error('Forbidden')
  err.statusCode = 403
  return next(err)
}
