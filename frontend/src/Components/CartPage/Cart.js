import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PRODUCT_CREATION, USER_CREATION, USER_CREATION_EDIT } from '../../Api'
import { USER_CREDENTAILS } from '../../store/action'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import axios from 'axios'
import Product_card from '../Header/Product_card/Product_card'
import moment from 'moment'
import './style.css'
import Webcam from 'react-webcam';
let datas = ''
export default function Cart() {
    const [data, setdata] = useState([])
    const [items, setitems] = useState([])
    const [model, setmodel] = useState(false)
    const [count, setcount] = useState(false)
    const [flag, setflag] = useState(1)
    const [pro_des, setprodes] = useState('')
    const [bank_name, setbank_name] = useState('')
    const [account_number, setaccount_number] = useState('')
    const [face, setface] = useState(false)
    const alan_data = useSelector((state) => state.alanreducer)
    const User_credentails = useSelector((state) => state.User_credentails)
    const navigate = useNavigate()

    const [show, setshow] = useState(false)
    const webcam = useRef(null)


if(show){

    setTimeout(() => {
        sendImageToBackend()
        setshow(false);
    }, 6000)
}
   
           
   



    const username = JSON.parse(localStorage.getItem("userdata"))
    console.log(username);
    const sendImageToBackend = () => {
        const imageSrc = webcam.current.getScreenshot();
        // console.log(img);
        const data = {
            uri: imageSrc,
            name: username.user_name,

        }


        const options = {
            method: 'POST',
            url: "http://localhost:5000/login",
            headers: {
                'Content-Type': 'application/json',

            },
            data: JSON.stringify(data),

        };
        console.log(options);
        axios(options).then((res) => {
            console.log(res.data, 'res');
            if (res.data.success == "true") {
                if (username.bank_name == User_credentails.user_name && username.account_number == User_credentails.mail && res.data.success =='true') {
                    place_order('place_order', '')
                } else {
                    user_credentails('sigIn', '', 'Bank Name and account Number is incorrect')
                }

            } else {
                user_credentails('sigIn', '', 'Face Authentication is Fail')

            }

        })
    };

    function user_credentails(name, data, msg) {
        if (alan_data) {
            alan_data.alaninstance.activate();
            alan_data.alaninstance.callProjectApi(name, {
                data: data,
                msg: msg
            }, function (error, result) { });
        }
    }

    function pass_data(name, keyfeature, number, length) {
        if (alan_data) {
            alan_data.alaninstance.activate();
            alan_data.alaninstance.callProjectApi(name, {
                keyfeature: keyfeature,
                number: number,
                length: length
            }, function (error, result) { });
        }
    }
    console.log(items);
    console.log(data);

    function place_order(value, number) {
        let userdata = JSON.parse(localStorage.getItem('userdata'));
        console.log(value, 'djdkd', number - 1);

        let full_value = [];
        if (number !== '') {
            items.forEach((aa, w) => {
                console.log(number, number - 1, w, aa);
                if (number - 1 !== w) {
                    full_value.push(aa);
                }
            });
            console.log(full_value, '0');
        }

        let itemvalue = [];
        console.log(full_value, '^^^^^^');

        items.forEach((val) => {
            itemvalue.push({ id: val.id, qty: val.qty, date: moment(new Date()).format('YYYY-MM-DD') ,location:[]});
        });
        console.log(itemvalue, '&&&&&');


        if (value === 'place_order') {
            data.forEach((res) => {
                // let ids = res._id;
                // let datas = 0; 
                console.log(res);
                const todayDate = new Date();

                items.forEach((val) => {
                    // datas += Number(val.qty);

                    if (res._id == val.id) {
                        const productOptions = {
                            url: `${PRODUCT_CREATION}/${res._id}`,
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
                            },
                            data: { current_sale: [...res.current_sale, { "qty": val.qty, 'id': userdata._id, order_date:todayDate }] }
                        };

                        console.log(productOptions, 'eooeo');

                        axios(productOptions)
                            .then(productResponse => {
                                console.log(productResponse.data);
                                // localStorage.setItem('userdata', JSON.stringify(response.data))
                                // user_credentails('sigIn', '', "return placed successfully")
                            })
                            .catch(function (e) {
                                console.log(e);
                            });

                    }


                });
            });
        }


        const options = {
            url: value === 'place_order' ? `${USER_CREATION_EDIT}/${userdata._id}` : `${USER_CREATION_EDIT}/${userdata._id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
            },
            data: value === 'place_order' ? { your_orders: [...userdata.your_orders, ...itemvalue], cart: [] } : { cart: full_value }

        };

        console.log(options, '*****!!!!!!!!!!!!!!');

        axios(options)
            .then(response => {

                console.log(response.data);
                if (value === 'place_order') {

                    user_credentails('sigIn', '', `Your order has been placed successfully. To see your orders, go to the orders page.`);

                } else {
                    user_credentails('sigIn', '', `Removed successfully`);


                }
                setcount(!count);
            })
            .catch(function (e) {
                console.log(e);
                if (e.message === 'Network Error') {
                    alert("No Internet Found. Please check your internet connection");
                } else {
                    alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.");
                }
            });
    }



    useEffect(() => {
        let str = alan_data.page.split(' ')
        if (str[1] === 'number' && data.length >= Number(str[0])) {
            pass_data('listkeyfeature', `Product Name is ${data[Number(str[0]) - 1].product_name}, and the key feature is ${data[Number(str[0]) - 1].key_feature}, price ${data[Number(str[0]) - 1].price}`, Number(str[0]), data.length)
        } else if (str[1] === 'view_number' && data.length >= Number(str[0])) {
            setprodes(data[Number(str[0]) - 1])
            setflag(0)
            pass_data('listkeyfeature', `Product Name ${data[Number(str[0]) - 1].product_name}, key feature ${data[Number(str[0]) - 1].key_feature}, colour ${data[Number(str[0]) - 1].color}, brand ${data[Number(str[0]) - 1].brand_name}, price ${data[Number(str[0]) - 1].price}, location ${data[Number(str[0]) - 1].location},Comments ${data[Number(str[0]) - 1].review.length} Comments, description ${data[Number(str[0]) - 1].description}`, Number(str[0]), data.length)
        }
        else if (str[1] === 'remove_number' && data.length >= Number(str[0])) {
            console.log(str[1], str[0]);
            console.log(data);
            place_order('remove_number', str[0])
        }
        else if (str[1] != undefined && str[1] != 'user') {
            pass_data('listkeyfeature', '', Number(str[0]), data.length)
        }
        else if (str[0] === 'homepage') {
            navigate('/')
            user_credentails('sigIn', '', 'Here is your Home page')
        } else if (str[0] === 'bank_name') {
            setbank_name(User_credentails.user_name)
            user_credentails('sigIn', '', `your bank name is ${User_credentails.user_name}`)
        } else if (str[0] === 'account_number') {
            setaccount_number(User_credentails.mail)
            user_credentails('sigIn', '', `your account number is ${User_credentails.mail}`)
        } else if (str[0] === 'scan_face') {
            if (User_credentails.user_name != '' && User_credentails.mail != '') {
                setshow(true)
                setmodel(false)
            } else {
                user_credentails('sigIn', '', `Give the Bank Name and Account Number`)

            }




        } else if (str[0] === 'place_order') {
            if (bank_name !== '' && account_number !== '' && face != false) {
                place_order('place_order', '')
            } else {
                user_credentails('sigIn', '', `authorization fail,  verify your bank name, account number, and face authentication`)
            }
        }
        else if (str[0] === 'buy') {
            setmodel(true)
            user_credentails('sigIn', '', 'give bank name, account number, and scan your face to verify')
        }

    }, [alan_data, User_credentails])

    useEffect(() => {
        let str = alan_data.page.split('_')
        console.log(str);
        if (str[1] === 'cartnumber') {

            let qty = {};
            console.log(str[0] - 1);
            items.map((val, i) => {
                data.map((value, index) => {
                    if (i == str[0] - 1 && index == str[0] - 1) {
                        console.log(val.qty);
                        user_credentails('sigIn', '', `the name i ${value.product_name} Quantity is ${val.qty} and the price is ${Number(value.price * val.qty)}`)
                    }

                })


            });
        }

    }, [alan_data])

    useEffect(() => {
        let userdata = JSON.parse(localStorage.getItem('userdata'))
        console.log(userdata, 'd');
        const options = {
            url: `${USER_CREATION}?_id=${userdata._id}&search=cart`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
            },
        };
        console.log(options);
        axios(options)
            .then(response => {
                console.log(response.data.data, '030303');
                setdata(response.data.data);

                setitems(response.data.items)
                setflag(1)
                user_credentails('sigIn', '', 'Here is your cart page')
                user_credentails('sigIn', '', `${response.data.data.length} products in your cart`)

                let total = 0;



                response.data.items.forEach((item) => {
                    response.data.data.forEach((val) => {
                        if (item.id === val._id) {
                            total += Number(val.price) * Number(item.qty);
                        }
                    });
                });





                console.log(total);

                // Display total price using user_credentials
                user_credentails('sigIn', '', `${total} is your cart amount`);


                // user_credentails('sigIn', '', `${full_data.product_name}, Quantity ${User_credentails.cart} added to cart`)
                // dispatch({ type: USER_CREDENTAILS, click: 'cart', cart: '' })
            })

            .catch(function (e) {
                console.log(e);
                if (e.message === 'Network Error') {
                    alert("No Internet Found. Please check your internet connection")
                }

                else {

                    alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.")
                }


            });
    }, [count])
    return (
        <div>
            {
                flag === 0 && pro_des !== '' ?
                    <Product_card full_data={pro_des} />
                    :
                    <div style={{ position: 'relative', }}>
                        <div style={{ backgroundColor: 'yellow', padding: '15px', display: 'flex', justifyContent: 'space-between' }}>
                            <h1 className='h1class'>Your Cart</h1>
                            <Button variant="primary" onClick={() => setmodel(true)}>BUY NOW</Button>
                        </div>
                        <div style={{ display: model ? 'block' : 'none' }}>
                            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.61)', width: '100%', height: '90vh', position: 'absolute', zIndex: 1, left: 0, right: 0, marginLeft: 0, marginRight: 0, display: 'flex', justifyContent: 'center' }}>
                                <div>
                                    <div
                                        className="modal show"
                                        style={{ display: 'block', position: 'initial', width: 500, overflow: 'hidden' }}
                                    >
                                        <Modal.Dialog>
                                            <Modal.Header >
                                                <Modal.Title>Account Details</Modal.Title>
                                            </Modal.Header>

                                            <Modal.Body>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>BANK NAME *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter Bank Name"
                                                        value={bank_name}
                                                        onChange={(event) => { setbank_name(event.target.value) }}
                                                    />
                                                </Form.Group>

                                                <Form.Group controlId="formBasicEmail" style={{ marginTop: 10 }}>
                                                    <Form.Label>ACCOUNT NUMBER *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter account number"
                                                        value={account_number}
                                                        onChange={(event) => { setaccount_number(event.target.value) }}
                                                    />
                                                </Form.Group>

                                                <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center' }}>
                                                    <Button variant="primary">Scan Face</Button>
                                                </div>
                                            </Modal.Body>

                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={() => setmodel(false)}>Close</Button>
                                                <Button variant="primary">Buy</Button>
                                            </Modal.Footer>
                                        </Modal.Dialog>

                                    </div>
                                </div>
                            </div>

                        </div>

                        {
                            show ? (
                                <>
                                    {show && (
                                        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.61)', width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <div style={{ width: '500px', background: '#fff', padding: '20px', borderRadius: '8px', overflow: 'hidden' }}>
                                                <Modal.Dialog>
                                                    <Webcam
                                                        audio={false}
                                                        height={500}
                                                        ref={webcam}
                                                        screenshotFormat="image/jpeg"

                                                    />

                                                </Modal.Dialog>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : null
                        }



                        <div style={{ zIndex: 0 }}>
                            {
                                data.map((val) => (
                                    <div className='bodyclass'>
                                        <div>
                                            <div className='mainclass'>
                                                <img style={{ width: '30%', height: '100%' }} crossOrigin='anonymous' src={val.image} alt="headphones set with pink color" />

                                                <div id="cart-text" style={{ width: '70%' }}>
                                                    <button class="free-shipping">Free shipping</button>
                                                    <h1 className='h1class'>{val.product_name}</h1>
                                                    <div style={{ display: 'flex' }}>

                                                        <h2 className='h2class'>QTY: {
                                                            items.reduce((totalQty, item) => {
                                                                if (item.id === val._id) {
                                                                    totalQty += parseInt(item.qty);
                                                                }
                                                                return totalQty;
                                                            }, 0)
                                                        }</h2>


                                                        <h2 style={{ marginLeft: "10px" }} className='h2class'>Total price: {
                                                            items.reduce((totalPrice, item) => {
                                                                if (item.id === val._id) {
                                                                    totalPrice += parseInt(item.qty) * parseFloat(val.price);
                                                                }
                                                                return totalPrice;
                                                            }, 0).toFixed(2)
                                                        }</h2>
                                                    </div>



                                                    <h4 className='h4class'>{val.description}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
            }

        </div>



    )
}
