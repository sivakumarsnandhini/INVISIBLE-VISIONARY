import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import { USER_CREATION, USER_CREATION_EDIT, RETURN_CREATION } from '../../Api'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReplyIcon from '@mui/icons-material/Reply';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function Account() {
    let userdata = JSON.parse(localStorage.getItem('userdata'))
    const [model, setmodel] = useState(false)
    const [name, setname] = useState('')
    const [account, setaccount] = useState('')
    const [Location,setLoaction]=useState('')
    const [count, setcount] = useState(false)
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

    useEffect(() => {
        user_credentails('sigIn', '', `user name is ${userdata.user_name}, your mail id is ${userdata.mail}@gmail.com,  ${userdata.cart.length} product in your cart, ${userdata.wishlist.length} product in your wishlist, and ${userdata.your_orders.length} product in your orders, ${userdata.bank_name} is your bank name, and ${userdata.account_number} is your account number`)
    }, [])

    useEffect(() => {
        let str = alan_data.page.split(' ')
        console.log(str);
        console.log(User_credentails.address);
        if (str[0] === 'bankopen') {
            
            setmodel(true)
            
            user_credentails('sigIn', '', 'give bank name , and account number')
            console.log('sjsj');
        }
        else if (str[0] === 'homepage') {
            navigate('/')
            user_credentails('sigIn', '', 'Here is your Home page')
        } else if (str[0] === 'bank_name') {
            setname(User_credentails.user_name)
            user_credentails('sigIn', '', `your bank name is ${User_credentails.user_name}`)
        } else if (str[0] === 'address') {
            setLoaction(User_credentails.address)
            user_credentails('sigIn', '', `your address is ${User_credentails.address}`)
        }else if (str[0] === 'account_number') {
            setaccount(User_credentails.mail)
            user_credentails('sigIn', '', `your account number is ${User_credentails.mail}`)
        } else if (str[0] === 'save_bank_details') {
            if (name !== '' && account !== '') {
                add_bank_details()
            } else {
                user_credentails('sigIn', '', `give bank name, and account Number`)
            }
        }

    }, [alan_data, User_credentails])

   console.log(Location);
   console.log(User_credentails);

    function add_bank_details() {
        let userdata = JSON.parse(localStorage.getItem('userdata'))
        const options = {
            url: `${USER_CREATION_EDIT}/${userdata._id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
            },
            data: { bank_name: User_credentails.user_name, account_number: User_credentails.mail,address:Location }

        };


        axios(options)
            .then(response => {
                localStorage.setItem('userdata', JSON.stringify(response.data))
                localStorage.setItem('location',Location)
                user_credentails('sigIn', '', `saved Successfully`)
                setcount(!count)
                setmodel(false)

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
    return (
        <div style={{ backgroundColor: '#4f93ff', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '99vh' }}>
            <div style={{ width: '300px', borderRadius: '5px', backgroundColor: 'white', padding: '10px' }}>
                <h3 style={{ textAlign: 'center' }}>Your Account</h3>
                <hr></hr>

                <h6 style={{ textAlign: 'center' }}>User Name : {userdata.user_name}</h6>
                <h6 style={{ textAlign: 'center' }}>Mail : {userdata.mail}@gmail.com</h6>

                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                    <div style={{ backgroundColor: 'blue', padding: '5px', borderRadius: '5px' }}>
                        <h6 style={{ textAlign: 'center', color: 'white' }}>Cart</h6>
                        <h6 style={{ textAlign: 'center', color: 'white' }}>{userdata.cart.length}</h6>
                    </div>

                    <div style={{ backgroundColor: 'blue', padding: '5px', borderRadius: '5px' }}>
                        <h6 style={{ textAlign: 'center', color: 'white' }}>Wishlist</h6>
                        <h6 style={{ textAlign: 'center', color: 'white' }}>{userdata.wishlist.length}</h6>
                    </div>

                    <div style={{ backgroundColor: 'blue', padding: '5px', borderRadius: '5px' }}>
                        <h6 style={{ textAlign: 'center', color: 'white' }}>Orders</h6>
                        <h6 style={{ textAlign: 'center', color: 'white' }}>{userdata.your_orders.length}</h6>
                    </div>
                </div>

                <hr></hr>

                <h6 style={{ textAlign: 'center' }}>Bank Name: {userdata.bank_name}</h6>
                <h6 style={{ textAlign: 'center' }}>Account Number: {userdata.account_number}</h6>

                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <Button variant="primary" onClick={() => { setmodel(true) }}>Edit Bank Details</Button>
                </div>

            </div>

            <div style={{ display: model ? 'block' : 'none' }}>
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.61)', width: '100%', height: '95vh', position: 'absolute', zIndex: 1, left: 0, right: 0, top: 0, marginLeft: 0, marginRight: 0, display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <div
                            className="modal show"
                            style={{ display: 'block', position: 'initial', width: 500, overflow: 'hidden' }}
                        >
                            <Modal.Dialog>
                                <Modal.Header >
                                    <Modal.Title>Bank Details</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Bank Name *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter bank name"
                                            value={name}
                                            onChange={(event) => { setname(event.target.value) }}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail" style={{ marginTop: 10 }}>
                                        <Form.Label>Account Number *</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter Account Number"
                                            value={account}
                                            onChange={(event) => { setaccount(event.target.value) }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail" style={{ marginTop: 10 }}>
                                        <Form.Label>Location *</Form.Label>
                                        <Form.Control
                                           
                                            placeholder="Enter Account Number"
                                            value={Location}
                                            onChange={(event) => { setLoaction(event.target.value) }}
                                        />
                                    </Form.Group>
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setmodel(false)}>Close</Button>
                                    <Button variant="primary" onClick={() => { add_bank_details() }}>ADD BANK</Button>
                                </Modal.Footer>
                            </Modal.Dialog>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
