const cuid = require('cuid')
const moment = require('moment')

const db = require('../db')
const axios = require('axios')

const User = db.model('return_Creation', {
    _id: { type: String, default: cuid },
    product_id: { type: String, required: true },
    user_id: { type: String, required: true },
})



module.exports = {
    get,
    list,
    list_all,
    create,
    edit1,
    remove,
    model: User
}

async function list_all() {
    const user = await User.find()
    return user
}

async function list(client_id) {
    const user = await User.find({ user_id: client_id })
    return user
}



async function get(_id) {
    const product = await User.findById(_id)
    return product
}



async function create(fields) {
    const product = await new User(fields).save()
    // console.log(product)
    return product
}

async function edit1(_id, change) {
    const product = await get({ _id })
    Object.keys(change).forEach(function (key) {
        product[key] = change[key]
    })
    await product.save()
    return product
}


async function remove(_id) {
    console.log(_id);
    await User.deleteOne({ _id })
}

