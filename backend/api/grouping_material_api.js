const User = require('../models/grouping_material')
const autoCatch = require('../lib/auto-catch')

module.exports = autoCatch({
    getuserbyid,
    listProducts,
    createProduct,
    editProduct,
    deleteProduct,
    listProductsByGroupName

})

async function getuserbyid(req, res, next) {
    // if (!req.isAdmin) return forbidden(next)
    console.log('jhjhf');
    const { id } = req.params
    const user = await User.get(id)
    if (!user) return next()
    res.json(user)
}

async function listProducts(req, res, next) {
    const products1 = await User.list(req.body.client_id)
    res.json(products1)
}

async function listProductsByGroupName(req, res, next) {
    const products1 = await User.listByGroupName(req.body.group_name,req.body.client_id)
    res.json(products1)
}

async function createProduct(req, res, next) {
    // console.log(req.body)
    const user = await User.create(req.body)
    res.json(user)
}


async function editProduct(req, res, next) {
    const change = req.body
    const user = await User.edit(req.params.id, change)
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
