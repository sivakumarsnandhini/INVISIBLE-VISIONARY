const cuid = require('cuid')
const moment = require('moment')

const db = require('../db')
const axios = require('axios')

const User = db.model('Product_Creation', {
    _id: { type: String, default: cuid },
    manufacturer_name: { type: String, required: true },
    location: { type: String, required: true },
    material_number: { type: String, required: true },
    product_name: { type: String, required: true },
    brand_name: { type: String, required: true },
    purchaser_name: { type: String, required: true, default: 'NONE' },
    description: { type: String, required: true },
    key_feature: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    review: { type: Array, required: true, default: [] },
    available_qty: { type: Number, required: true, default: 0 },
    return: { type: Array, required: true, default: [] },
    current_sale: { type: Array, required: true, default: [] },
    image: { type: String, required: true },
    category: { type: String, required: true },
    return_limit: { type: String, required: true },
    order_date: { type: String,default:"none" },
    Active: { type: Number, default: 0 },
    client_id: { type: String, required: true },
    location_status: { type: Array, default: [] },
})



module.exports = {
    get,
    list,
    list_all,
    create,
    edit1,
    remove,
    add_new_column,
    model: User
}

async function add_new_column() {
    const user = await User.updateMany({}, { $set: { current_sale:[] } })
    return user
}

async function list_all() {
    const user = await User.find()
    return user
}

async function list(client_id) {
    console.log('data',client_id);
    const user = await User.find({ client_id: client_id })
    return user
}



async function get(_id) {
    const product = await User.findById(_id)
    if (product == null) {
        return []
    } else {
        return [product]
    }
}



async function create(fields) {
    const product = await new User(fields).save()
    // console.log(product)
    return product
}

async function edit1(_id, change) {
    const product = await get({ _id })

    Object.keys(change).forEach(function (key) {
        product[0][key] = change[key]
    })

    await product[0].save()
    return product
}


async function remove(_id) {
    console.log(_id);
    await User.deleteOne({ _id })
}

