import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_CREATION, USER_CREATION_EDIT, RETURN_CREATION, PRODUCT_CREATION } from '../../Api'
import { USER_CREDENTAILS } from '../../store/action'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import axios from 'axios'
import moment from 'moment'
import Product_card from '../Header/Product_card/Product_card'
import './style.css'
let userdata = JSON.parse(localStorage.getItem('userdata'))

const currentDate1 = new Date();
export default function Cart() {
    let userdata = JSON.parse(localStorage.getItem('userdata'))
    const [data, setdata] = useState([])
    const [items, setitems] = useState([])
    const [count, setcount] = useState(false)
    const [flag, setflag] = useState(1)
    const [pro_des, setprodes] = useState('')
    const alan_data = useSelector((state) => state.alanreducer)
    const User_credentails = useSelector((state) => state.User_credentails)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [show, setshow] = useState(false)
    const [filter, setfilter] = useState('year')
    const [date, setdate] = useState(false)
    const [values, setvalues] = useState([])


    const futureDate = new Date(currentDate1);
futureDate.setDate(currentDate1.getDate() + 5);

// Format the future date
const futureDay = futureDate.getDate().toString().padStart(2, '0');
const futureMonth = (futureDate.getMonth() + 1).toString().padStart(2, '0');
const futureYear = futureDate.getFullYear();

// Construct the formatted date string
const formattedFutureDate = `${futureDay}:${futureMonth}:${futureYear}`;


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
            data.map((val, i) => {
                if (Number(number) !== i) {
                    full_value.push()
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

    // function add_to_cart() {
    //     let userdata = JSON.parse(localStorage.getItem('userdata'))
    //     const options = {
    //         url: `${USER_CREATION}/${userdata._id}`,
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
    //         },
    //         data: { cart: { id: full_data._id, qty: User_credentails.cart } }

    //     };
    //     axios(options)
    //         .then(response => {

    //             user_credentails('sigIn', '', `${full_data.product_name}, Quantity ${User_credentails.cart} added to cart`)
    //             dispatch({ type: USER_CREDENTAILS, click: 'cart', cart: '' })

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
    // }





    // function returnfunction(value, number) {

    //     number -= 1;

    //     let userdata = JSON.parse(localStorage.getItem('userdata'));
    //     let ids = '';
    //     let qty=''
    //     let client_id_1=''

    //     console.log(number, value);

    //     data.map((res, i) => {
    //         console.log(res, '00');
    //         console.log(i, number, i == number);
    //         if (i == number) {
    //             ids = res._id;
    //            res.current_sale.map((bb,i)=>{
    //             console.log(bb,'ll');
    //             qty = bb.qty
    //             client_id_1=bb.id
    //            })
    //         }

    //     });

    //     console.log(ids);
    //     let returndata
    //     let todayDate
    //     data.map((res, i) => {
    //         returndata = new Date(res.return_limit);
    //         todayDate = new Date();

    //     });
    //     if (returndata > todayDate) {

    //         const options = {
    //             url: `${PRODUCT_CREATION}/${ids}`,
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
    //             },
    //             data: { return:{'qty':qty,'id':userdata._id,"client_id":client_id_1}}
    //             // data: { current_sale: [...res.current_sale, { "qty": val.qty, 'id': userdata._id, order_date:todayDate }] }
    //         };

    //         console.log(options, 'eooeo');


    //         axios(options)
    //             .then(response => {
    //                 console.log(response.data);
    //                 user_credentails('sigIn', '', `return placed successfully`)
    //                 // localStorage.setItem('userdata', JSON.stringify(response.data))
    //             })
    //             .catch(function (e) {
    //                 console.log(e);
    //                 if (e.message === 'Network Error') {
    //                     alert("No Internet Found. Please check your internet connection");
    //                 } else {
    //                     alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.");
    //                 }
    //             });
    //     }

    // }
    function returnfunction(value, number) {
        number -= 1;

        let userdata = JSON.parse(localStorage.getItem('userdata'));
        let returndata;
        let todayDate;

        // Find the corresponding id, qty, and client_ids
        if (data[number]) {
            const res = data[number];
            const ids = res._id;
            let qty;
            let client_ids;

            res.current_sale.forEach(ee => {
                qty = ee.qty;
                client_ids = res.client_id;
            });

            returndata = new Date(res.return_limit);
            todayDate = new Date();

            console.log(ids);

            if (returndata >= todayDate) {
                const options = {
                    url: `${PRODUCT_CREATION}/${ids}`,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
                    },
                    data: {
                        return: [
                            ...res.return,
                            {
                                "qty": qty,
                                "id": userdata._id,
                                "aaa": client_ids,
                            }
                        ]
                    }
                };

                console.log(options, 'eooeo');

                axios(options)
                    .then(response => {
                        console.log(response.data);
                        user_credentails('sigIn', '', `return placed successfully and pick up date is ${currentDate1.getDate()+5}`);
                      setTimeout(() => {
                        location.reload();
                      }, 5000);
                    })
                    .catch(function (e) {
                        console.log(e);
                    });
            }
            else{
                user_credentails('sigIn', `sorry that particular product return date is expired`);
            }
        } 
    }

 
    useEffect(() => {
        console.log(data);
        console.log(items);
        console.log(alan_data.page);
        let str = alan_data.page.split(' ')
     

        if (str[1] === 'number' && data.length >= Number(str[0])) {
            console.log(items[Number(str[0]) - 1]);
            pass_data('listkeyfeature', `Product Name is ${data[Number(str[0]) - 1].product_name}, and the key feature is ${data[Number(str[0]) - 1].key_feature}, price ${data[Number(str[0]) - 1].price} the delivery address is ${userdata.address} and date of product Delivery${formattedFutureDate}, your product  current location ${items[Number(str[0]) - 1].location[items[Number(str[0]) - 1].location.length - 1]}`, Number(str[0]), data.length)
            console.log(items[Number(str[0]) - 1].location[-1]);
            console.log(items[Number(str[0]) - 1].location[items[Number(str[0]) - 1].location.length - 1]);
            console.log(items[Number(str[0]) - 1]);
            console.log(items);
        } else if (str[1] === 'view_number' && data.length >= Number(str[0])) {
            setprodes(data[Number(str[0]) - 1])
            setflag(0)
            pass_data('listkeyfeature', `Product Name ${data[Number(str[0]) - 1].product_name}, key feature ${data[Number(str[0]) - 1].key_feature}, colour ${data[Number(str[0]) - 1].color}, brand ${data[Number(str[0]) - 1].brand_name}, price ${data[Number(str[0]) - 1].price},the delivery address is ${userdata.address} and date of product Delivery${formattedFutureDate}, location ${data[Number(str[0]) - 1].location},Comments ${data[Number(str[0]) - 1].review.length} Comments, description ${data[Number(str[0]) - 1].description} your current location ${items[Number(str[0]) - 1].location[items[Number(str[0]) - 1].location.length - 1]}`, Number(str[0]), data.length)
        }
        // else if (str[1] === 'remove_number' && data.length >= Number(str[0])) {
        //     place_order('remove_number', str[0])
        // }
        else if (str[1] != undefined && str[1] != 'user') {
            pass_data('listkeyfeature', '', Number(str[0]), data.length)
        }
        else if (str[0] === 'homepage') {
            navigate('/')
            user_credentails('sigIn', '', 'Here is your Home page')
        }
        else if (str[0] === 'return') {

            if (data.length == 0) {
                user_credentails('sigIn', '', `no orders`)
            } else if (Number(User_credentails.full_current) > data.length) {
                user_credentails('sigIn', '', `${data.length} orders are there`)
            } else {
                returnfunction('', Number(User_credentails.full_current))

            }
        } else if (alan_data.page == 'weekly') {
            setfilter('weekly')
            console.log('******');
            user_credentails('sigIn', '', `filter by weekly`)
        } else if (alan_data.page == 'monthly') {
            console.log('******1');
            setfilter('monthly')
            user_credentails('sigIn', '', `filter by monthly`)
        } else if (alan_data.page == 'yearly') {
            console.log('******3');
            setfilter('yearly')
            user_credentails('sigIn', '', `filter by yearly`)

        }
        // else if (str[0] === 'cart') {    
        //     if (User_credentails.cart !== '') {
        //         add_to_cart()
        //     } else {
        //         user_credentails('sigIn', '', 'How many items do you want ?')
        //     }
        // }

    }, [alan_data, User_credentails])

    useEffect(() => {
        let userdata = JSON.parse(localStorage.getItem('userdata'))
        const options = {
            url: `${USER_CREATION}?_id=${userdata._id}&search=your_orders`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
            },
        };
        axios(options)
            .then(response => {
                console.log(response.data);
                setdata(response.data.data)
                setitems(response.data.items)
                setflag(1)
                user_credentails('sigIn', '', 'Here is your orders page')
                user_credentails('sigIn', '', `${response.data.data.length} products in your orders`)

                let total = 0
                response.data.data.map((val) => {
                    total = total + Number(val.price)
                })
                user_credentails('sigIn', '', `${total} is your order amount`)
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


    const filteredData = data.filter((val, i) => {
        const currentDate = new Date();
        const currentdata = items[i] || {}
        console.log(items[i]);
        console.log(currentDate);
        const orderDate = new Date(currentdata.date);

        // console.log(orderDate);
        // console.log(currentDate);
        // console.log(val,'000');
        switch (filter) {
            case 'yearly':
                return orderDate.getFullYear() === currentDate.getFullYear();
            case 'monthly':
                return orderDate.getMonth() === currentDate.getMonth() && orderDate.getFullYear() === currentDate.getFullYear();
            case 'weekly':
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                return orderDate >= oneWeekAgo && orderDate <= currentDate;

            default:
                return true;
        }
    });

    return (
        <div>
            {
                flag === 0 && pro_des !== '' ?
                    <Product_card full_data={pro_des} />
                    :
                    <div style={{ position: 'relative', }}>
                        <div style={{ backgroundColor: 'yellow', padding: '15px', display: 'flex', justifyContent: 'space-between' }}>
                            <h1 className='h1class'>Your Orders</h1>


                            <Button style={{ width: "100px", height: "40px", marginLeft: "20px" }} onClick={() => setshow(!show)}>filter</Button>

                            {show && (
                                <div style={{
                                    backgroundColor: 'white',
                                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                    padding: '15px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'absolute',
                                    zIndex: 1,
                                    marginLeft: "76.6rem",
                                    marginTop: "40px"
                                }}>
                                    <a style={{ color: "black", cursor: "pointer" }} className="dropdown-item" onClick={() => setfilter('yearly')}>
                                        Yearly
                                    </a>
                                    <a style={{ marginTop: "10px", color: "black", cursor: "pointer" }} className="dropdown-item" onClick={() => setfilter('monthly')}>
                                        Monthly
                                    </a>
                                    <a style={{ marginTop: "10px", color: "black", cursor: "pointer" }} className="dropdown-item" onClick={() => setfilter('weekly')}>
                                        Weekly
                                    </a>
                                </div>
                            )}


                        </div>

                        <div style={{ zIndex: 0 }}>

                            {
                                filteredData.map((val) => (
                                    <div className='bodyclass' style={{ marginBottom: "20px" }}>
                                        <div>
                                            <div className='mainclass'>
                                                <img style={{ width: '30%', height: '100%' }} crossOrigin='anonymous' src={val.image} alt="headphones set with pink color" />

                                                <div id="cart-text" style={{ width: '80%', height: "196px" }}>
                                                    <div style={{ flex: "row", flexDirection: "row" }}>
                                                        <button class="free-shipping">Free shipping</button>


                                                        {
                                                            val.return.map((value) => {
                                                                if (value.id == userdata._id) {
                                                                    return (
                                                                        <div style={{ display: "flex", flexDirection: "row", width: "fit-content", height: "20px" }}>
                                                                            <p>the product collects this date :</p>
                                                                            <p style={{ fontSize: "18px", fontWeight: "bold", marginLeft: "10px", color: "red" }}>
                                                                                {(() => {
                                                                                    const currentDate = new Date();
                                                                                    const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 5));
                                                                                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                                                                                    return futureDate.toLocaleDateString('en-US', options);
                                                                                })()}
                                                                            </p>
                                                                        </div>
                                                                    );

                                                                }
                                                            })


                                                        }






                                                    </div>


                                                    <h1 className='h1class'>{val.product_name}</h1>
                                                    <div style={{ display: 'flex', margin: "0px" }}>
                                                        {Object.entries(
                                                            items.reduce((acc, value) => {
                                                                if (val._id === value.id) {
                                                                    // Check if the ID exists in the accumulator
                                                                    if (!acc.hasOwnProperty(value.id)) {
                                                                        acc[value.id] = {
                                                                            totalQty: 0,
                                                                            totalPrice: 0,
                                                                            date: value.date // assuming date is the same for all items with the same ID
                                                                        };
                                                                    }
                                                                    // Update total quantity and total price
                                                                    acc[value.id].totalQty += Number(value.qty);
                                                                    acc[value.id].totalPrice += Number(val.price) * Number(value.qty);
                                                                }
                                                                return acc;
                                                            }, {})
                                                        ).map(([id, item]) => (
                                                            <div key={id}>
                                                                <h2 className='h2class' style={{ marginRight: '10px', marginBottom: '5px' }}>Rs {item.totalPrice}</h2>
                                                                <h2 className='h2class' style={{ marginBottom: '5px' }}>QTY {item.totalQty}</h2>
                                                                <h6 style={{}}>Date of Order : {item.date}</h6>
                                                                <h4 className='h4class'>{val.description}</h4>
                                                            </div>
                                                        ))}
                                                    </div>


                                                    <div style={{ bottom: "800px", display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
                                                        {items.map((data99, index) => (
                                                            data99.location.map((data1, dataIndex) => (
                                                                data99.id === val._id ?
                                                                    <div key={`${index}-${dataIndex}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "20px" }}>
                                                                        <div style={{ position: "relative", width: "50px" }}>
                                                                            <p style={{ margin: "0", borderBottom: "1px solid black", width: "100%", position: "absolute", top: "50%", transform: "translateY(-50%)" }}>✔🚓</p>
                                                                            {/* <p style={{ fontSize: "24px", margin: "0", color: "red", position: "absolute", top: "50%", left: "calc(50% - 12px)", transform: "translateY(-50%)" }}>🔴</p> */}
                                                                        </div>
                                                                        <p style={{ textAlign: "center", margin: "5px 0", marginTop: '15px', fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>{data1}</p>
                                                                    </div>
                                                                    : ''
                                                            ))
                                                        ))}
                                                    </div>

                                                    {
                                                        items.map((inval) => {
                                                            console.log(inval.location);
                                                            inval.location.map((ww) => {
                                                                console.log(ww);
                                                            })
                                                        })
                                                    }




















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
