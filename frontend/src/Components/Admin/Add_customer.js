import React, { useState, useEffect } from 'react';
// import MaterialTable from "material-table";
import Modal from 'react-modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { USER_CREATION, PRODUCT_CREATION, PRODUCT_LIST, USER_CREATION_EDIT, USER_CREATION_GET_ID } from '../../Api'

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
    const [ids, setid] = useState('')
    const [val, setval] = useState('')
    const [location, setlocation] = useState([])
    let userdata = JSON.parse(localStorage.getItem('userdata'))


    useEffect(() => {
        const username = JSON.parse(localStorage.getItem("userdata"));

        const getStocksData = {
            url: PRODUCT_LIST,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: { client_id: username._id }
        };

        axios(getStocksData)
            .then(async response => {
                const processedIds = new Set();
                console.log(response);

                for (const values of response.data) {
                    for (const valin of values.current_sale) {
                        const option = {
                            url: `${USER_CREATION}?_id=${valin.id}&search=your_orders`,
                            method: "GET"
                        };
                        console.log(option);
                        console.log(valin);

                        try {
                            const res = await axios(option);
                            console.log(res);

                            for (const aaa of res.data.items) {
                                for (const bbb of res.data.data) {


                                    // console.log(res.data.data);
                                    // console.log(res);

                                    if(bbb.client_id ==userdata._id){

                                        if (aaa.id === bbb._id && !processedIds.has(aaa.id)) {
                                            processedIds.add(aaa.id);
    
                                            setitem(prevItems => [...prevItems, aaa]);
                                            setdata(prevData => [...prevData, bbb]);
                                        }
                                    }
                                   
                                }
                            }
                        } catch (error) {
                            console.error('Error fetching user orders:', error);
                        }
                    }
                }
            })
            .catch(function (e) {
                if (e.message === 'Network Error') {
                    alert("No Internet Found. Please check your internet connection");
                } else {
                    alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.");
                }
            });
    }, []);


    const handleSave = () => {

        const updateUserOption = {
            url: `${USER_CREATION_GET_ID}/${name.sale_id}`,
            method: "get",
        };

        axios(updateUserOption)
            .then((res) => {
                console.log(res.data);
                let orders=[]
                res.data.your_orders.map((obj)=>{
                    if(obj.id == ids){
                        orders.push({...obj,location:[...obj.location,val]})
                    }else{
                        orders.push(obj)
                    }
                })

                console.log(orders);

                const update_user = {
                    url: `${USER_CREATION_EDIT}/${res.data._id}`,
                    method: "put",
                    data:{your_orders:orders}
                };

                axios(update_user)
                    .then((res) => {
                        console.log(res.data);
                        setval('')
                        setshow(!show)


                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });

            })
            .catch((error) => {
                console.error('Error:', error);
            });
        
    };




    const handleLocationChange = (e) => {
        setval(e.target.value);
    };


    let list = data.map((val, i) => {
        console.log(data, 'dshbdshb');
        console.log(userdata,'00');
        console.log(item);




        const currentItem = item[i] || {};

        // 
        return (
            <tr key={i}>
                <td style={{ padding: '10px', color: 'black' }}>{i + 1}</td>
                <td style={{ padding: '10px', color: 'black' }}>{val.product_name}</td>
                <td style={{ padding: '10px', color: 'black' }}>{currentItem.qty}</td>
                <td style={{ padding: '10px', color: 'black' }}>{currentItem.date}</td>
                <td style={{ padding: '10px', color: 'black' }}>
                    {Number(currentItem.qty) * Number(val.price)}
                </td>
                <td>



                    <EditIcon style={{ color: 'blue', marginLeft: "20px", cursor: "pointer" }} onClick={() => {
                        setshow(!show)
                        console.log(currentItem._id);
                        console.log(val._id);
                        setid(val._id)
                        val.current_sale.map((ww) => {
                            console.log(ww.id, '%%%%');
                            setname({ name: val.product_name, qty: currentItem.qty, amount: currentItem.date, id: val._id, location_status: val.location_status, sale_id: ww.id });

                        })
                    }} />
                </td>






            </tr>
        );
    });



    function closeModal() {
        setshow(false)

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
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" value={name.name} disabled placeholder="Product Name" />
                        </Form.Group>
                        <Form.Group style={{ width: "49%", marginLeft: "20px" }} className="mb-4" controlId="formBasicPassword2">
                            <Form.Label>Product Quantity</Form.Label>
                            <Form.Control value={name.qty} type="text" disabled placeholder="Product Quantity" />
                        </Form.Group>
                    </div>


                    <div style={{ display: "flex" }}>

                        <Form.Group style={{ width: "49%", }} className="mb-4" controlId="formBasicPassword2">
                            <Form.Label>Date</Form.Label>
                            <Form.Control value={name.amount} type="text" placeholder="Product Quantity" disabled />
                        </Form.Group>

                        <Form.Group style={{ width: "49%", marginLeft: "20px" }} className="mb-4" controlId="formBasicPassword1">
                            <Form.Label>Product in</Form.Label>
                            <Form.Control value={val} type="text" onChange={handleLocationChange} placeholder="Product Name" />
                        </Form.Group>
                    </div>
                    <Button onClick={handleSave}>Save</Button>
                    <Button style={{ marginLeft: "20px" }} onClick={() => setshow(!show)}>Close</Button>




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

                    <div style={{ width: '100%', minHeight: '90vh', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: '15px', padding: '10px', zIndex: 0, }}>
                        <div style={{ display: 'flex', marginLeft: "30px" }}>

                        </div>
                        <table style={{ width: '100%' }}>
                            <tr style={{ borderBottom: '1px solid grey', fontWeight: 'bolder' }}>
                                <th style={{ padding: '10px', color: 'black' }}>S.no</th>
                                <th style={{ padding: '10px', color: 'black' }}>Product Name</th>
                                <th style={{ padding: '10px', color: 'black' }}>Qty</th>
                                <th style={{ padding: '10px', color: 'black' }}>Date of Order</th>
                                <th style={{ padding: '10px', color: 'black' }}>Amount</th>
                                <th style={{ padding: '10px', color: 'black' }}>Action</th>




                            </tr>
                            {
                                list
                            }
                        </table>
                    </div>
                </div>

            </div>
        )
    }
}

export default CustomEditComponent;

