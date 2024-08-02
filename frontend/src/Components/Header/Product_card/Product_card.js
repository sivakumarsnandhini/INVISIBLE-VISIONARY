import React, { useEffect, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReplyIcon from '@mui/icons-material/Reply';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { USER_CREATION, PRODUCT_CREATION, USER_CREATION_EDIT } from '../../../Api'
import { USER_CREDENTAILS } from '../../../store/action'
import axios from 'axios'
import './style.css'

export default function Product_card({ product_data, full_data }) {
    const User_credentails = useSelector((state) => state.User_credentails)
    let userdata = JSON.parse(localStorage.getItem('userdata'))
    const alan_data = useSelector((state) => state.alanreducer)
    const [start, setstart] = useState(0)
    const [review, setreview] = useState('')
    const [model, setmodel] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (alan_data.page === 'wishlist' && User_credentails.full_current === 'view_number') {
            if (window.location.pathname != '/cart' && window.location.pathname != '/wishlist') {
                if (User_credentails.wishlist !== '') {
                    add_to_cart()
                } else {
                    user_credentails('sigIn', '', 'How many items do you want ?')
                }
            }
        } else if (User_credentails.page === 'cart' && User_credentails.full_current !== 'view_number') {
            user_credentails('sigIn', '', 'you have to select a product to add wishlist')
        }
        else if (alan_data.page === 'cart' && User_credentails.full_current === 'view_number') {
            if (window.location.pathname != '/cart' && window.location.pathname != '/wishlist') {
                if (User_credentails.cart !== '') {
                    add_to_cart()
                } else {
                    user_credentails('sigIn', '', 'How many items do you want ?')
                }
            }
        } else if (User_credentails.page === 'cart' && User_credentails.full_current !== 'view_number') {
            user_credentails('sigIn', '', 'you have to select a product to add cart')
        } else if (alan_data.page === 'write_review') {
            setmodel(true)
            user_credentails('sigIn', '', 'give start and review')
        } else if (alan_data.page === 'close_review') {
            setmodel(false)
            user_credentails('sigIn', '', 'review model closed.')
        } else if (alan_data.page === 'start') {
            setstart(User_credentails.start)
            user_credentails('sigIn', '', `your rating is ${Number(User_credentails.start)}`)
        } else if (alan_data.page === 'review') {
            setreview(User_credentails.review)
            user_credentails('sigIn', '', `your review is ${User_credentails.review}`)
        } else if (alan_data.page === 'post_review') {
            review_start()
        } else if (alan_data.page === 'review_one') {

            if (full_data.length == 0) {
                user_credentails('sigIn', '', `no reviews`)
            } else if (Number(User_credentails.full_current) > full_data.length) {
                user_credentails('sigIn', '', `${full_data.length} reviews are there`)
            } else {
                user_credentails('sigIn', '', `reviewer name is ${full_data.review[Number(User_credentails.full_current - 1)].name}, reviewer star is ${full_data.review[Number(User_credentails.full_current - 1)].star} star, reviewer description is ${full_data.review[Number(User_credentails.full_current - 1)].description}`)
            }
        }
    }, [alan_data])

    function user_credentails(name, data, msg) {
        if (alan_data) {
            alan_data.alaninstance.activate();
            alan_data.alaninstance.callProjectApi(name, {
                data: data,
                msg: msg
            }, function (error, result) { });
        }
    }

    function post_review() {
        let userdata = JSON.parse(localStorage.getItem('userdata'))
        const options = {
            url: `${USER_CREATION}/${userdata._id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
            },
            data:
                alan_data.page === 'wishlist' ?
                    { wishlist: { id: full_data._id, qty: User_credentails.wishlist } }
                    :
                    { cart: { id: full_data._id, qty: User_credentails.cart } }

        };

        console.log(options);
        axios(options)
            .then(response => {
                if (alan_data.page === 'wishlist') {
                    user_credentails('sigIn', '', `${full_data.product_name}, Quantity ${User_credentails.wishlist} added to wishlist`)
                    dispatch({ type: USER_CREDENTAILS, click: 'wishlist', wishlist: '' })
                } else {
                    user_credentails('sigIn', '', `${full_data.product_name}, Quantity ${User_credentails.cart} added to cart`)
                    dispatch({ type: USER_CREDENTAILS, click: 'cart', cart: '' })
                }

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

    function review_start() {
        const stock_details = {
            review: [...full_data.review, { name: userdata.user_name, star: start, description: review }]
        }

        const options = {
            url: `${PRODUCT_CREATION}/${full_data._id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
            },
            data: stock_details
        };
        axios(options)
            .then(response => {
                user_credentails('sigIn', '', `your review posted. thankyou for your review`)

                setTimeout(() => {
                    window.location.reload()
                }, 3000)

            })

            .catch(function (e) {
                if (e.message === 'Network Error') {
                    alert("No Internet Found. Please check your internet connection")
                }

                else {

                    alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.")
                }


            });
    }

    function add_to_cart() {
        if (full_data.available_qty >= User_credentails.cart) {


            let userdata = JSON.parse(localStorage.getItem('userdata'))
            const options = {
                url: `${USER_CREATION_EDIT}/${userdata._id}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
                },
                data:
                    alan_data.page === 'wishlist' ?
                        { wishlist: [...userdata.wishlist, { id: full_data._id, qty: User_credentails.wishlist }] }
                        :
                        { cart: [...userdata.cart, { id: full_data._id, qty: User_credentails.cart ,location:[]}] }


            };


            axios(options)
                .then(response => {
                    if (alan_data.page === 'wishlist') {
                        user_credentails('sigIn', '', `${full_data.product_name}, Quantity ${User_credentails.wishlist} added to wishlist`)
                        dispatch({ type: USER_CREDENTAILS, click: 'wishlist', wishlist: '' })
                    } else {
                        user_credentails('sigIn', '', `${full_data.product_name}, Quantity ${User_credentails.cart} added to cart `)
                        dispatch({ type: USER_CREDENTAILS, click: 'cart', cart: '' })
                    }

                    localStorage.setItem('userdata', JSON.stringify(response.data))

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
        else {
            user_credentails('sigIn', '', `Sorry No more Product`)
        }

    }
    return (
        <div>
            <div class="codepen-container" style={{ position: 'relative' }}>
                <div class="content-container">
                    <div class="left-container" style={{ width: '30%' }}>
                        <div class="triangle-topleft">
                            <div class="back-arrow" id="buy-toaster"><ReplyIcon style={{ fontSize: 40 }} /></div>
                        </div>
                        <div class="product-image--container">
                            <img class="product-image--featured" id="featured" crossOrigin='anonymous' src={full_data.image} alt="toaster" />
                            {/* <ul class="product-image--list">
                                <li class="item-selected"><img src="http://ecx.images-amazon.com/images/I/71f3p1o62FL._SX522_.jpg" class="product-image--item" /></li>
                                <li><img src="http://ecx.images-amazon.com/images/I/71RE0VKOGlL._SX522_.jpg" class="product-image--item" /></li>
                                <li><img src="http://ecx.images-amazon.com/images/I/81ArwBkmXYL._SX522_.jpg" class="product-image--item" /></li>
                                <li><img src="http://ecx.images-amazon.com/images/I/71TUY7pyVWL._SX522_.jpg" class="product-image--item" /></li>
                                <li><img src="http://ecx.images-amazon.com/images/I/71wQlvYuuHL._SX522_.jpg" class="product-image--item" /></li>
                            </ul> */}
                        </div>
                    </div>
                    <div class="right-container" style={{ width: '70%' }}>
                        <div>
                            <h1 class="title">{full_data.product_name}</h1>
                            <h2 class="subtitle subtitle-container">{full_data.key_feature}</h2>

                            <div>
                                <span class="rating">
                                    <input type="radio" class="rating-input" id="rating-input-1-5" name="rating-input-1" />
                                    <label for="rating-input-1-5" class="rating-star"></label>
                                    <input type="radio" class="rating-input"
                                        id="rating-input-1-4" name="rating-input-1" />
                                    <label for="rating-input-1-4" class="rating-star"></label>
                                    <input type="radio" class="rating-input"
                                        id="rating-input-1-3" name="rating-input-1" />
                                    <label for="rating-input-1-3" class="rating-star"></label>
                                    <input type="radio" class="rating-input"
                                        id="rating-input-1-2" name="rating-input-1" />
                                    <label for="rating-input-1-2" class="rating-star"></label>
                                    <input type="radio" class="rating-input"
                                        id="rating-input-1-1" name="rating-input-1" />
                                    <label for="rating-input-1-1" class="rating-star"></label>
                                </span>
                                <span>|</span>
                                <span>
                                    <a href="#" class="reviews">
                                        {full_data.review.length} customer reviews
                                    </a>
                                </span>
                            </div>
                        </div>
                        <span>
                            <p>Price:
                                <span class="emphasize">{full_data.price}</span>
                            </p>
                            {/* <label for="quantity">Quantity:</label>
                            <select name="quantity" class="select-dropdown">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select> */}
                        </span>
                        <div>
                            <h2 class="title">Product Description</h2>
                            <div class="subtitle-container">
                                <span>Size: {full_data.size}</span>
                                <span>|</span>
                                <span>Color: {full_data.color}</span>
                            </div>
                            <p>
                                {full_data.description}
                            </p>
                        </div>
                        <div>
                            <button class="my-btn flex-btn" onClick={() => {
                                add_to_cart()
                            }}>
                                <span>
                                    <ShoppingCartIcon />
                                </span>
                                <span class="btn-text">Add to Cart
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 'bolder' }}>Top reviews from India</p>
                        <Button variant="secondary" onClick={() => setmodel(true)}>Write Review</Button>
                    </div>




                    {
                        full_data.review.map((val) => {

                            let arr = []
                            for (let index = 0; index < Number(val.star); index++) {
                                arr.push(<span class="d-block">⭐</span>)
                            }
                            return (
                                <div>
                                    <div class="d-flex align-items-start">
                                        {/* <img src="./img/JayeHannah-150x150.jpeg" class="img-fluid rounded-circle" alt="" /> */}
                                        <div class="d-block">
                                            <span class="d-block">by <a class="h6" href="#">{val.name}</a></span>
                                            <div style={{ display: 'flex' }}>
                                                {arr}
                                            </div>
                                            <span class="d-block">{val.description}</span>
                                        </div>
                                    </div>
                                    <hr></hr>
                                </div>
                            )
                        })
                    }
                </div>
                <div style={{ display: 'flex' }}>
                    <div className="product-card" style={{ cursor: 'pointer', marginRight: '20px' }}>
                        <div className="product-tumb">
                            <img crossOrigin='anonymous' src='https://www.giftsmyntra.com/wp-content/uploads/2021/03/peterenglandshirt10a.jpg' alt="" />
                        </div>
                        <div className="product-details">
                            <span className="product-catagory">Cloth</span>
                            <h4><a href="">BETTER ENGLAND PREMIUM SHIRT </a></h4>
                            <p>Get extra 40% discount on Peter England Men Slim fit Formal Shirt - Blue.Buy Peter England Men Slim fit Formal Shirt - Blue Online at Rs. 779 only.  </p>
                            <div className="product-bottom-details">
                                <div className="product-price"><small>799</small>3000</div>
                                <div className="product-links">
                                    <a className='a' href=""><i className="fa fa-heart"></i></a>
                                    <a className='a' href=""><i className="fa fa-shopping-cart"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="product-card" style={{ cursor: 'pointer', marginRight: '20px' }}>
                        <div className="product-tumb">
                            <img crossOrigin='anonymous' src='https://5.imimg.com/data5/SELLER/PDFImage/2023/7/321974106/PG/IF/ND/188924882/oppo-mobile-phones.png' alt="" />
                        </div>
                        <div className="product-details">
                            <span className="product-catagory">Mobile</span>
                            <h4><a href="">OPPO A78</a></h4>
                            <p>The OPPO A78 is a sleek and powerful smartphone designed to meet your everyday needs. With its stunning design, powerful performance.</p>
                            <div className="product-bottom-details">
                                <div className="product-price"><small>17999</small>19999</div>
                                <div className="product-links">
                                    <a className='a' href=""><i className="fa fa-heart"></i></a>
                                    <a className='a' href=""><i className="fa fa-shopping-cart"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="product-card" style={{ cursor: 'pointer' }}>
                        <div className="product-tumb">
                            <img crossOrigin='anonymous' src='https://d2xamzlzrdbdbn.cloudfront.net/products/2e95f434-3853-4d0f-be50-27cb89923c9322271248_416x416.jpg' alt="" />
                        </div>
                        <div className="product-details">
                            <span className="product-catagory">Electrical</span>
                            <h4><a href="">Power Bank</a></h4>
                            <p> Stay charged up on-the-go with the MI Power Bank. With a capacity of 10000mAh, this power bank ensures you never run out of battery when you need it the most.</p>
                            <div className="product-bottom-details">
                                <div className="product-price"><small>1000</small>5000</div>
                                <div className="product-links">
                                    <a className='a' href=""><i className="fa fa-heart"></i></a>
                                    <a className='a' href=""><i className="fa fa-shopping-cart"></i></a>
                                </div>
                            </div>
                        </div>
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
                                        <Modal.Title>Review</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Star *</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter Start"
                                                value={start}
                                                onChange={(event) => { setstart(event.target.value) }}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicEmail" style={{ marginTop: 10 }}>
                                            <Form.Label>Review *</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                placeholder="Write Review"
                                                value={review}
                                                onChange={(event) => { setreview(event.target.value) }}
                                            />
                                        </Form.Group>
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setmodel(false)}>Close</Button>
                                        <Button variant="primary" onClick={() => { review_start() }}>ADD REVIEW</Button>
                                    </Modal.Footer>
                                </Modal.Dialog>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
