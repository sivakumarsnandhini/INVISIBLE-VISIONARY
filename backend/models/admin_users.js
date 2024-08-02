const cuid = require('cuid')
const db = require('../db')


const User = db.model('Admin_users', {
  _id: { type: String, default: cuid },
  username: { type: String, required: true },
  password: { type: String, required: true},

})

module.exports = {
  get,
  list,
  create,
  edit,
  remove,
  user_validate,
  model: User
}


async function list () {
  const user = await User.find({})
  return user
} 
async function user_validate (name,pass) {
  const user = await User.findOne({ username:name,password:pass})
  console.log(user)
  if(user==null)
  {
  return { success:false}
  }
  else
  {
    return { success:true,data:user}
  }
} 

 

async function get2 (id) {
  const user = await User.findOne({  username:id })
  if(user==null)
  {
  return { success:false}
  }
  else
  {
    return { success:true,data:user}
  }
}




async function get (_id) {
  const product = await User.findById(_id)
  return product
}

async function create (fields) {

  let temp = await get2(fields.username)
  if(temp.success == false)
    {
    const product = await new User(fields).save()

    return product            
    }
  else
    {
      return "admin ID already exist"
    }
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
