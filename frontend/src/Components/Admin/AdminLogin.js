import React, { useState, useEffect } from 'react';
// import MaterialTable from "material-table";
import Modal from 'react-modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { USER_CREATION, PRODUCT_CREATION, ADMIN_USER_CREATION, CUSTOMER_ADMIN_LIST } from '../../Api'
import { v4 as uuidv4 } from 'uuid';

import {
  Button, Form,

} from 'react-bootstrap';


const customStyles = {

  overlay: { zIndex: 1000 },
  overflow: 'scroll'
};

const customStyles2 = {

  overlay: { zIndex: 1000 },
  overflow: 'scroll'
};

// Modal.setAppElement('#root')

function CustomEditComponent(props) {

  const [loader, setloader] = useState(1);
  const [flag, setflag] = useState('');
  const [data, setdata] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editmodalIsOpen, seteditmodalIsOpen] = useState(false);
  const [item, setitem] = useState([]);
  const [show, setshow] = useState(false)
  const [name, setname] = useState({})
  const [id, setid] = useState('')
  const [val, setval] = useState('')
  const [location, setlocation] = useState([])
  const [createusername, setcreateUsername] = useState('');
  const [createpassword, setcreatePassword] = useState('');
  let userdata = JSON.parse(localStorage.getItem('userdata'))
  const [mail, setmail] = useState('')
  const [render, setrender] = useState(false)
  const [editdata, seteditdata] = useState({})



  useEffect(() => {
    axios.post('http://localhost:5008/user_creation_api_list', {
      'client_id': '1'
    })
      .then((res) => {
        console.log(res.data);
        setdata(res.data)

      })
      .catch((e) => {
        console.log(e);
      })
  }, [render])





  // let list = data.map((val, i) => {
  //     console.log(data, 'dshbdshb');
  //     console.log(item);




  //     // 
  //     return (
  //         <tr key={i}>
  //             <td style={{ padding: '10px', color: 'black' }}>{i + 1}</td>
  //             <td style={{ padding: '10px', color: 'black' }}>{val.product_name}</td>
  //             <td style={{ padding: '10px', color: 'black' }}>{currentItem.qty}</td>



  //                 <EditIcon style={{ color: 'blue', marginLeft: "20px", cursor: "pointer" }} onClick={() => {
  //                     setshow(!show)
  //                     console.log(currentItem._id);
  //                     console.log(val._id);
  //                     setid(val._id)
  //                     setname({ name: val.product_name, qty: currentItem.qty, amount: currentItem.date  , id: val._id});
  //                 }} />
  //             </td>






  //         </tr>
  //     );
  // });



  function closeModal() {
    setshow(false)

  }


  function closeModal2() {
    seteditmodalIsOpen(false)
  }

  function getResponse(result) {
    setIsOpen(false);
    seteditmodalIsOpen(false)
    setflag(!flag)
  }


  if (loader == 0) {

    return (
      <div>
        <div style={{ backgroundColor: 'white' }}>
          {/* <CircularProgress color="secondary" size={70} /> */}
          <h1 style={{ marginLeft: 40 }}>Loading...</h1>
        </div>
      </div>
    )
  }

  else {
    return (
      <div>
        <Modal
          isOpen={show}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={props.windowWidth >= 700 ? customStyles : customStyles2}
          contentLabel="Example Modal"
          backdrop="static"
          shouldCloseOnOverlayClick={false}
        >
          <div style={{ display: "flex" }}>
            <Form.Group style={{ width: "49%" }} className="mb-4" controlId="formBasicPassword1">
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" value={createusername} onChange={(e) => { setcreateUsername(e.target.value) }} placeholder="User Name" />
            </Form.Group>
            <Form.Group style={{ width: "49%", marginLeft: "20px" }} className="mb-4" controlId="formBasicPassword2">
              <Form.Label>User Password</Form.Label>
              <Form.Control type="text" value={createpassword} onChange={(e) => { setcreatePassword(e.target.value) }} placeholder="User password" />
            </Form.Group>
          </div>
          <div style={{ display: "flex" }}>
            <Form.Group style={{ width: "49%" }} className="mb-4" controlId="formBasicPassword1">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" value={mail} onChange={(e) => { setmail(e.target.value) }} placeholder="Email" />
            </Form.Group>

          </div>



          <Button onClick={() => {
            let val = {
              user_name: createusername,
              password: createpassword,
              mail: mail,
              client_id: '1',
              user_type: '',
              type: 'client_admin',
            }


            const option = {
              url: USER_CREATION,
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              data: val,
            };
            console.log(option);
            axios(option).then((res) => {
              console.log(res.data);
              alert(`Your user name is ${createusername} and password is ${createpassword}`)
              setshow(!show)
              setcreateUsername("")
              setcreatePassword("")
              setmail("")
              setrender(!render)
            }).catch((err) => {
              console.log(err);
            })

          }}>save</Button>
          <Button style={{ marginLeft: "20px" }} onClick={() => { setshow(false) }}>Cancel</Button>







        </Modal>

        {/* wqhdqjwdh */}
        <Modal
          isOpen={editmodalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal2}
          style={props.windowWidth >= 700 ? customStyles : customStyles2}
          contentLabel="Example Modal"
          backdrop="static"
          shouldCloseOnOverlayClick={false}
        >
          <div style={{ display: "flex" }}>
            <Form.Group style={{ width: "49%" }} className="mb-4" controlId="formBasicPassword1">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                name="name"
                value={editdata.name}
                onChange={(e) => seteditdata({ ...editdata, name: e.target.value })} 
                placeholder="User Name"
              />
            </Form.Group>
            <Form.Group style={{ width: "49%", marginLeft: "20px" }} className="mb-4" controlId="formBasicPassword2">
              <Form.Label>User Password</Form.Label>
              <Form.Control
                name='pass'
                type="text"
                value={editdata.password}
                onChange={(e) => seteditdata({ ...editdata, password: e.target.value })} 
                placeholder="User password"
              />
            </Form.Group>
            <Form.Group style={{ width: "49%", marginLeft: "20px" }} className="mb-4" controlId="formBasicPassword2">
              <Form.Label>User Email</Form.Label>
              <Form.Control
                name='pass'
                type="text"
                value={editdata.mail}
                onChange={(e) => seteditdata({ ...editdata, mail: e.target.value })} 
                placeholder="User password"
              />
            </Form.Group>

          </div>




          <Button onClick={() => {


 const options={
  url:`${USER_CREATION}/${editdata.id}`,
  method:"PUT",
  data:{
    user_name: editdata.name,
    password: editdata.password,
    mail: editdata.mail,
    client_id: '1',
    user_type: '',
    type: 'client_admin',
  }
 }
 console.log(options);
 axios(options).then((res)=>{
  console.log(res.data);
  setrender(!render)
  seteditmodalIsOpen(false) 

 })


          }}>save</Button>
          <Button style={{ marginLeft: "20px" }} onClick={() => { seteditmodalIsOpen(false) }}>Cancel</Button>







        </Modal>
        {/* 
                <Modal
                    isOpen={editmodalIsOpen}
                    onRequestClose={closeModal}
                    style={props.windowWidth >= 700 ? customStyles : customStyles2}
                    contentLabel="Example Modal"
                    backdrop="static"
                    shouldCloseOnOverlayClick={false}
                >

                </Modal> */}

        <div>
          <div style={{ width: '100%', minHeight: '90vh', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: '15px', padding: '10px', zIndex: 0 }}>
            <div style={{ display: 'flex', marginLeft: "30px", alignItems: "center", justifyContent: "center" }}>
              <Button onClick={() => setshow(true)}>ADD USER</Button>
            </div>
            <table style={{ width: '100%' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid grey', fontWeight: 'bolder' }}>
                  <th style={{ padding: '10px', color: 'black' }}>S.no</th>
                  <th style={{ padding: '10px', color: 'black' }}>User Name</th>
                  <th style={{ padding: '10px', color: 'black' }}>Password</th>
                  <th style={{ padding: '10px', color: 'black' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((val, i) => (
                  <tr key={val._id}>
                    <td style={{ padding: '10px', color: 'black' }}>{i + 1}</td>
                    <td style={{ padding: '10px', color: 'black' }}>{val.user_name}</td>
                    <td style={{ padding: '10px', color: 'black' }}>{val.password}</td>
                    <td style={{ display: 'flex', flexDirection: 'row', marginLeft: "10px" }}>
                      <EditIcon
                        style={{ color: 'blue', marginRight: '10px', cursor: 'pointer' }}
                        onClick={() => {

                          seteditdata({ name: val.user_name, password: val.password, id: val._id ,mail:val.mail})
                          seteditmodalIsOpen(true)

                        }}
                      />
                      <DeleteIcon
                        style={{ color: 'red', cursor: 'pointer' }}
                        onClick={() => {
                          const option = {
                            url: `${USER_CREATION}/${val._id}`,
                            method: "DELETE",

                          }
                          console.log(option, 'alalalalala', val._id);
                          axios(option).then((res) => {
                            console.log(res.data);

                            if (res.data.success == true) {
                              setrender(!render)

                            }
                            else {
                              alert('some think is wrong')
                            }
                          })
                        }}
                      />
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    )
  }
}

export default CustomEditComponent;

