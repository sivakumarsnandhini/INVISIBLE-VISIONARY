import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_CREATION, USER_CREATION_EDIT, RETURN_CREATION } from '../../Api'
import { USER_CREDENTAILS } from '../../store/action'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import axios from 'axios'
import Product_card from '../Header/Product_card/Product_card'
import './style.css'

export default function Cart() {
    const [data, setdata] = useState([])
    const [items, setitems] = useState([])
    const [count, setcount] = useState(false)
    const [flag, setflag] = useState(1)
    const [pro_des, setprodes] = useState('')
    const alan_data = useSelector((state) => state.alanreducer)
    const User_credentails = useSelector((state) => state.User_credentails)
    const navigate = useNavigate()
    const dispatch = useDispatch()

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

    function place_order(value, number) {
        let userdata = JSON.parse(localStorage.getItem('userdata'))

        let full_value = []
        if (number !== '') {
           items.map((val,i)=>{
            if (number - 1 !== i) {
                full_value.push(val);
            }
           })
        }
        const options = {
            url: `${USER_CREATION_EDIT}/${userdata._id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
            },
            data: { wishlist: full_value }

        };
        axios(options)
            .then(response => {
                user_credentails('sigIn', '', `removed successfully`)
                setcount(!count)
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
    }



    function add_to_cart() {
        let userdata = JSON.parse(localStorage.getItem('userdata'))
        const options = {
            url: `${USER_CREATION_EDIT}/${userdata._id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
            },
            data: { cart: [...userdata.cart, { id: pro_des._id, qty: User_credentails.cart }], wishlist: [] }

        };
        axios(options)
            .then(response => {

                user_credentails('sigIn', '', `${pro_des.product_name}, Quantity ${User_credentails.cart} added to cart`)
                dispatch({ type: USER_CREDENTAILS, click: 'cart', cart: '' })
                setcount(!count)

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
            place_order('remove_number', str[0])
        }
        else if (str[1] != undefined && str[1] != 'user') {
            pass_data('listkeyfeature', '', Number(str[0]), data.length)
        }
        else if (str[0] === 'homepage') {
            navigate('/')
            user_credentails('sigIn', '', 'Here is your Home page')
        } else if (str[0] === 'cart') {
            if (User_credentails.cart !== '') {
                add_to_cart()
            } else {
                user_credentails('sigIn', '', 'How many items do you want ?')
            }
        }

    }, [alan_data, User_credentails])
    useEffect(() => {
        let str = alan_data.page.split('_')
        console.log(str);
        if (str[1] === 'cartnumber') {

            let qty = {};
            console.log(str[0] - 1);
            items.map((val, i) => {
                data.map((value,index)=>{
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
        const options = {
            url: `${USER_CREATION}?_id=${userdata._id}&search=wishlist`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
            },
        };
        axios(options)
            .then(response => {
                setdata(response.data.data)
                setitems(response.data.items)
                setflag(1)
                user_credentails('sigIn', '', 'Here is your wishlist page')
                user_credentails('sigIn', '', `${response.data.data.length} products in your wishlist`)
                let total = 0;
                response.data.items.forEach((item) => {
                    response.data.data.forEach((val) => {
                        if (item.id === val._id) {
                            total += Number(val.price) * Number(item.qty);
                        }
                    });
                });
                user_credentails('sigIn', '', `${total} is your wishlist amount`)
                console.log(response.data);
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
                            <h1 className='h1class'>Your Wishlist</h1>
                            <Button variant="primary" onClick={() => { }}>ADD TO CART</Button>
                        </div>

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
