const User_admin = require('../models/admin_users')
const autoCatch = require('../lib/auto-catch')

module.exports = autoCatch({
  getuserbyid,
  listProducts,
  createProduct,
  editProduct,
  deleteProduct,
  user_validate,
  

})



async function getuserbyid (req, res, next) {
  const { id } = req.params
  const user = await User_admin.get(id)
  if (!user) return next()
  res.json(user)
}

async function user_validate (req, res, next) {
  const user = await User_admin.user_validate(req.body.username,req.body.password)
  res.json(user)
}


async function listProducts (req, res, next) {
  const products1 = await User_admin.list()
  res.json(products1)
}


async function createProduct (req, res, next) {
  const user = await User_admin.create(req.body)
  res.json(user)
}

async function editProduct (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)
  const change = req.body
  const user = await User_admin.edit(req.params.id, change)
  res.json(user)
}

async function deleteProduct (req, res, next) {
  // if (!req.isAdmin) return forbidden(next)
  await User_admin.remove(req.params.id)
  res.json({ success: true })
}
