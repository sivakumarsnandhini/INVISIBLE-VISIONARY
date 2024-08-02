const cuid = require('cuid')

const db = require('../db')
const axios = require('axios')

const User = db.model('grouping_Creation', {
    _id: { type: String, default: cuid },
    group_name: { type: String, required: true },
    created_date: { type: String, required: true },
    updated_date: { type: String, required: true },
    group_materials: { type: Array, required: true },
    client_id: { type: String, required: true },
})



module.exports = {
    get,
    list,
    create,
    edit,
    remove,
    listByGroupName,
    model: User
}

async function list(client_id) {
    const user = await User.find({ client_id: client_id })
    return user
}

async function listByGroupName(group_name, client_id) {
    const user = await User.find({ group_name: group_name, client_id: client_id })
    return user
}



async function get(_id) {
    const product = await User.findById(_id)
    return product
}

async function get2(id1, id) {
    const user = await User.findOne({ client_id: id1, group_name: id })
    if (user == null) {
        return { success: false }
    }
    else {
        return { success: true, data: user }
    }
}

async function create(fields) {

    let temp = await get2(fields.client_id, fields.group_name)
    if (temp.success == false) {
        const product = await new User(fields).save()
        // console.log(product)
        return product
    }
    else {
        return { status: "group name already exist", data: temp.data }
    }
}

async function edit(_id, change) {
    const product = await get({ _id })
    Object.keys(change).forEach(function (key) {
        product[key] = change[key]
    })
    await product.save()
    return product
}


async function remove(_id) {
    await User.deleteOne({ _id })
}

