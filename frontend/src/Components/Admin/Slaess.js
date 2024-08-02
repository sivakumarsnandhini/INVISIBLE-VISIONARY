import React, { useState, useEffect } from 'react';
// import MaterialTable from "material-table";
import Modal from 'react-modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { USER_CREATION, PRODUCT_CREATION, PRODUCT_LIST } from '../../Api'

import {
    Button,

} from 'react-bootstrap';

import { CircularProgress } from '@mui/material';


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
    const [filter, setfilter] = useState('year')


    // useEffect(() => {
    //     const username = JSON.parse(localStorage.getItem("userdata"))

    // const getStocksData = {
    //   url: USER_CREATION,
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   data: { client_id: username._id }
    // }
    // // const getStocksData = {
    // //     url: `${USER_CREATION}?client_id=${username._id}&search=your_orders`,
    // //     method: 'GET',

    // //   }
    //     axios(getStocksData)
    //         .then(response => {
    //             console.log(response.data);
    //             setdata(response.data.data)
    //             setitem(response.data.items)


    //             let total = 0
    //             response.data.data.map((val) => {
    //                 total = total + Number(val.price)
    //             })
    //             // user_credentails('sigIn', '', `${total} is your order amount`)
    //             // console.log(response.data);
    //             // user_credentails('sigIn', '', `${full_data.product_name}, Quantity ${User_credentails.cart} added to cart`)
    //             // dispatch({ type: USER_CREDENTAILS, click: 'cart', cart: '' })
    //         })

    //         .catch(function (e) {
    //             console.log(e);
    //             if (e.message === 'Network Error') {
    //                 alert("No Internet Found. Please check your internet connection")
    //             }

    //             else {

    //                 alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.")
    //             }


    //         });
    // }, [])

    useEffect(() => {
        const username = JSON.parse(localStorage.getItem("userdata"))

        const getStocksData = {
            url: PRODUCT_LIST,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: { client_id: username._id }
        }
        axios(getStocksData)
            .then(response => {

                console.log(response.data)
                response.data.map((res) => {
                    console.log(res.current_sale, '8888');
                    if (res.current_sale.length > 0) {
                        setdata(response.data)
                        console.log('jhfgh');
                    }
                })

                response.data.map((val, i) => {
                    console.log(val.current_sale);
                })



            })
            .catch(function (e) {
                if (e.message === 'Network Error') {
                    alert("No Internet Found. Please check your internet connection")
                }
                else {
                    alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.")
                }

            });


    }, []);

    console.log(data);

    let list;

    if (filter === 'year') {
        const currentYear = new Date().getFullYear();
    
        list = data.map((val, i) => {
    
            if (Array.isArray(val.current_sale)) {
                return val.current_sale.map((res, index) => {
                    console.log(res.order_date);
                    const itemDate = new Date(res.order_date);
    
                    if (itemDate.getFullYear() === currentYear) {
                        return (
                            <tr key={index}>
                                <td style={{ padding: '10px', color: 'black' }}>{index + 1}</td>
                                <td style={{ padding: '10px', color: 'black' }}>{val.product_name}</td>
                                <td style={{ padding: '10px', color: 'black' }}>{res.qty}</td>
                                <td style={{ padding: '10px', color: 'black' }}>{itemDate.toDateString()}</td>
                                <td style={{ padding: '10px', color: 'black' }}>
                                    {Number(res.qty) * Number(val.price)}
                                </td>
                            </tr>
                        );
                    } else {
                        return null;
                    }
                });
            } else {
                console.error('val.current_sale is not an array');
                return null;
            }
        });
    }
    
    else if (filter === 'week') {
        const currentDate = new Date();
    
        const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
    
        list = data.map((val, i) => {
            console.log(val.current_sale); 
            console.log(val.order_date); 
    
            
            const salesWithinWeek = val.current_sale.filter(sale => {
                const itemDate = new Date(sale.order_date);
                return itemDate >= firstDayOfWeek && itemDate <= lastDayOfWeek;
            });
    
            console.log(salesWithinWeek); 
    
            return salesWithinWeek.map((sale, index) => (
                <tr key={index}>
                    <td style={{ padding: '10px', color: 'black' }}>{index + 1}</td>
                    <td style={{ padding: '10px', color: 'black' }}>{val.product_name}</td>
                    <td style={{ padding: '10px', color: 'black' }}>{sale.qty}</td>
                    <td style={{ padding: '10px', color: 'black' }}>{new Date(sale.order_date).toDateString()}</td>
                    <td style={{ padding: '10px', color: 'black' }}>
                        {Number(sale.qty) * Number(val.price)}
                    </td>
                </tr>
            ));
        });
    }
    
    else if (filter === 'month') {
        const currentMonth = new Date().getMonth() + 1;
    
        list = data.map((val, i) => {
    
            if (Array.isArray(val.current_sale)) {
                return val.current_sale.map((res, index) => {
                    console.log(res.order_date);
                    const itemDate = new Date(res.order_date);
    
                    if (itemDate.getMonth() + 1 == currentMonth) {
                        return (
                            <tr key={index}>
                                <td style={{ padding: '10px', color: 'black' }}>{index + 1}</td>
                                <td style={{ padding: '10px', color: 'black' }}>{val.product_name}</td>
                                <td style={{ padding: '10px', color: 'black' }}>{res.qty}</td>
                                <td style={{ padding: '10px', color: 'black' }}>{itemDate.toDateString()}</td>
                                <td style={{ padding: '10px', color: 'black' }}>
                                    {Number(res.qty) * Number(val.price)}
                                </td>
                            </tr>
                        );
                    } else {
                        return null;
                    }
                });
            } else {
                console.error('val.current_sale is not an array');
                return null;
            }
        });
    }
    
    else {
        const currentDate = new Date();
    
        const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
    
        list = data.map((val, i) => {
            console.log(val.current_sale); 
            console.log(val.order_date); 
    
            
            const salesWithinWeek = val.current_sale.filter(sale => {
                const itemDate = new Date(sale.order_date);
                return itemDate >= firstDayOfWeek && itemDate <= lastDayOfWeek;
            });
    
            console.log(salesWithinWeek); 
    
            return salesWithinWeek.map((sale, index) => (
                <tr key={index}>
                    <td style={{ padding: '10px', color: 'black' }}>{index + 1}</td>
                    <td style={{ padding: '10px', color: 'black' }}>{val.product_name}</td>
                    <td style={{ padding: '10px', color: 'black' }}>{sale.qty}</td>
                    <td style={{ padding: '10px', color: 'black' }}>{new Date(sale.order_date).toDateString()}</td>
                    <td style={{ padding: '10px', color: 'black' }}>
                        {Number(sale.qty) * Number(val.price)}
                    </td>
                </tr>
            ));
        });
        
    }
    



    function closeModal() {
        setIsOpen(false);

    }




    if (loader == 0) {

        return (
            <div>
                <div style={{ backgroundColor: 'white' }}>
                    <CircularProgress color="secondary" size={70} />
                    <h1 style={{ marginLeft: 40 }}>Loading...</h1>
                </div>
            </div>
        )
    }

    else {
        return (
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={props.windowWidth >= 700 ? customStyles : customStyles2}
                    contentLabel="Example Modal"
                    backdrop="static"
                    shouldCloseOnOverlayClick={false}
                >

                </Modal>

                <Modal
                    isOpen={editmodalIsOpen}
                    onRequestClose={closeModal}
                    style={props.windowWidth >= 700 ? customStyles : customStyles2}
                    contentLabel="Example Modal"
                    backdrop="static"
                    shouldCloseOnOverlayClick={false}
                >

                </Modal>

                <div>

                    <div style={{ width: '100%', minHeight: '90vh', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: '15px', padding: '10px', zIndex: 0, }}>
                        <div style={{ display: 'flex', marginLeft: "30px" }}>
                            <div>
                                <Button style={{ width: "90px", height: "40px", marginRight: '10px' }} onClick={() => { setshow(!show) }}>
                                    Filter
                                </Button>

                                {show && (
                                    <div style={{
                                        backgroundColor: 'white',
                                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                        padding: '15px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        position: 'absolute',
                                        zIndex: 1,
                                    }}>
                                        <a style={{ color: "black", cursor: "pointer" }} className="dropdown-item" onClick={() => { setfilter('year') }}>
                                            Yearly
                                        </a>
                                        <a style={{ marginTop: "10px", color: "black", cursor: "pointer" }} className="dropdown-item" onClick={() => { setfilter('month') }} >
                                            Monthly
                                        </a>
                                        <a style={{ marginTop: "10px", color: "black", cursor: "pointer" }} className="dropdown-item" onClick={() => { setfilter('week') }} >
                                            Weekly
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                        <table style={{ width: '100%' }}>
                            <tr style={{ borderBottom: '1px solid grey', fontWeight: 'bolder' }}>
                                <th style={{ padding: '10px', color: 'black' }}>S.no</th>
                                <th style={{ padding: '10px', color: 'black' }}>Product Name</th>
                                <th style={{ padding: '10px', color: 'black' }}>Qty</th>
                                <th style={{ padding: '10px', color: 'black' }}>Date of Order</th>
                                <th style={{ padding: '10px', color: 'black' }}>Amount</th>


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

