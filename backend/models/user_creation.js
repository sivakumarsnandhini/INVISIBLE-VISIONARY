const cuid = require('cuid')
const moment = require('moment')
const product_creation = require('./product_creation')

const db = require('../db')
const axios = require('axios')

const User = db.model('user_Creation', {
    _id: { type: String, default: cuid },
    mail: { type: String, required: true },
    user_name: { type: String, required: true },
    password: { type: String, required: true },
    client_id: { type: String, required: true },
    type: { type: String, required: true },
    bank_name: { type: String, default: 'None' },
    account_number: { type: String, default: 'None' },
    address: { type: String, default: 'None' },
    cart: { type: Array, default: [] },
    wishlist: { type: Array, default: [] },
    your_orders: { type: Array, default: [] },
})



module.exports = {
    get,
    list,
    create,
    edit1,
    edit,
    remove,
    validate,
    add_new_column,
    get_by_id,
    model: User
}

async function add_new_column() {
    const user = await User.updateMany({}, { $set: { address: 'Chennai' } })
    return user
}

async function list(client_id) {
    console.log(client_id);
    const user = await User.find({ client_id: client_id })
    return user
}

async function validate(user_name, password) {
    const user = await User.find()

    let chk = false
    let data = ''
    for (let i = 0; i < user.length; i++) {
        if (user_name.toUpperCase() === user[i].user_name.toUpperCase() && password.toUpperCase() === user[i].password.toUpperCase()) {
            chk = true
            data = user[i]
            break

        } else {
            chk = false
        }
    }

    if (chk === false) {
        return { status: false }
    } else {
        return { status: true, data: data }
    }
}



async function get(_id, search) {
    const product = await User.findById(_id)

    let value = []
    product[search].map((val) => {
        value.push(String(val.id))
    })

    const products1 = await product_creation.model.find({ $and: [{ _id: { $in: value } }] })
    console.log(product[search], 'hghfgfgffdf');
    return { data: products1, items: product[search] }
}

async function get_by_id(_id) {
    const product = await User.findById(_id)
    return product
}



async function create(fields) {
    const product = await new User(fields).save()
    // console.log(product)
    return product
}

async function edit1(_id, change) {
    const product = await User.findById(_id)
    Object.keys(change).forEach(function (key) {
        if (key == 'cart') {
            product[key] = [...product[key], change[key]]
        } else if (key == 'wishlist') {
            product[key] = [...product[key], change[key]]
        } else if (key == 'your_orders') {
            product[key] = [...product[key], change[key]]
        } else {
            product[key] = change[key]
        }
    })
    await product.save()
    return product
}

async function edit(_id, change) {
    const product = await User.findById(_id)
    Object.keys(change).forEach(function (key) {
        product[key] = change[key]
    })
    await product.save()
    return product
}


async function remove(_id) {
    await User.deleteOne({ _id })
}

