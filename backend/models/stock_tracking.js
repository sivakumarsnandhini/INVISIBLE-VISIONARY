const cuid = require('cuid')

const db = require('../db')

const User = db.model('Stocks_Out_Tracker', {
  _id: { type: String, default: cuid },
  product_name: { type: String, required: true },
  person_name: { type: String, required: true },
  description: { type: String, required: true},
  qty: { type: Number, required: true},
  price: { type: Number, required: true},
  unit: { type: String, required: true},
  barcode: { type: String, required: true},
  client_id: { type: String, required: true},
  date: { type: String, required: true},
  time: { type: String, required: true},


})

module.exports = {
  get,
  list,
  create,
  edit,
  remove,
  get2,
  list_date,
  model: User
}

async function list_date (clientid,startDate,endDate) {
  const products = await User.find({ client_id:clientid,date: { $gte: startDate, $lte: endDate}})
  return products
}


async function list (client_id) {
  const user = await User.find({client_id:client_id})
  return user
}  


async function get (_id) {
  const product = await User.findById(_id)
  return product
}

  async function get2 (id) {
    const user = await User.findOne({ barcode:id })
    if(user==null)
    {
    return { success:false}
    }
    else
    {
      return { success:true,data:user}
    }
  }



async function create (fields) {

  //let temp = await get2(fields.barcode)

    const product = await new User(fields).save()
   // console.log(product)
    return product            
    

}

async function edit (_id, change) {
  const product = await get({ _id })
  Object.keys(change).forEach(function (key) {
    product[key] = change[key]
  })
  await product.save()
  return product
}


async function remove (_id) {
  await User.deleteOne({ _id })
}

