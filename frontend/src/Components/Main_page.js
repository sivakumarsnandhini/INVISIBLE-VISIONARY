import React, { useEffect, useState } from 'react'
import Header from './Header/Header'
import Product_card from './Header/Product_card/Product_card';
import Mini_product_card from './Header/Product_card/Mini_product_card';
import Button from 'react-bootstrap/Button';
import { PRODUCT_LIST_ALL } from '../Api'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { USER_CREDENTAILS, ALANINSTANCE } from '../store/action'

export default function Main_page() {

    const [full_data, setfull_data] = useState([])
    const [full_date_change, setfull_date_change] = useState([])
    const [flag, setflag] = useState(0)
    const alan_data = useSelector((state) => state.alanreducer)
    const User_credentails = useSelector((state) => state.User_credentails)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [data, setdata] = useState({
        'mobile': [],
        'tv': [],
        'furniture': [],
        'shoe': [],
        'cloth': []
    })

    const [brand, setbrand] = useState({
        'mobile': [],
        'tv': [],
        'furniture': [],
        'shoe': [],
        'cloth': []
    })

    function pass_data(name, data, length) {
        if (alan_data) {
            alan_data.alaninstance.activate();
            alan_data.alaninstance.callProjectApi(name, {
                brand: data,
                length: length
            }, function (error, result) { });
        }
    }

    function user_credentails(name, data, msg) {
        if (alan_data) {
            alan_data.alaninstance.activate();
            alan_data.alaninstance.callProjectApi(name, {
                data: data,
                msg: msg
            }, function (error, result) { });
        }
    }



    const [sortedData, setSortedData] = useState(full_data);

    const handleSortLowToHigh = () => {
        const sortedLowToHigh = [...full_data].sort((a, b) => a.price - b.price);
        setSortedData(sortedLowToHigh);
        console.log(sortedLowToHigh);

    };
    console.log(sortedData);


    const handleSorthighTolow = () => {
        const sortedLowToHigh = [...full_data].sort((a, b) => b.price - a.price);
        setSortedData(sortedLowToHigh);
        console.log(sortedLowToHigh);
        console.log(sortedData);
    };
    function pass_data(name, data) {
        if (alan_data) {
            alan_data.alaninstance.activate();
            alan_data.alaninstance.callProjectApi(name, {
                brand: data
            }, function (error, result) { });
        }
    }

    useEffect(() => {
        let str = alan_data.page.split(' ')
        console.log(alan_data.page);

        if (str[1] === 'view_number') {
            setflag(1)
        } else if (alan_data.page === 'signin' || alan_data.page === 'login') {
            navigate('/sign-up')
            dispatch({ type: USER_CREDENTAILS, click: 'type', val: alan_data.page })
            dispatch({ type: USER_CREDENTAILS, click: 'page', page: 'sign-up' })
            if (alan_data.page === 'signin') {
                user_credentails('sigIn', '', 'provide user name, mail, and password')
            } else if (alan_data.page === 'login') {
                user_credentails('sigIn', '', 'provide user name, and password')
            }
        } else if (alan_data.page === 'logout') {
            navigate('/sign-up')
            user_credentails('sigIn', '', 'user logout')
            user_credentails('sigIn', '', 'provide user name, and password')
            dispatch({ type: USER_CREDENTAILS, click: 'type', val: 'login' })
            dispatch({ type: ALANINSTANCE, click: 'page', page: 'login' })
        } else if (alan_data.page === 'all_mobile_brands') {
            pass_data('listProduct', 'mobile', data.mobile.length)
            setfull_data(data.mobile)
        } else if (alan_data.page === 'all_tv_brands') {
            pass_data('listProduct', 'TV', data.tv.length)
            setfull_data(data.tv)
        } else if (alan_data.page === 'all_furniture_brands') {
            pass_data('listProduct', 'furniture', data.furniture.length)
            setfull_data(data.furniture)
        } else if (alan_data.page === 'all_cloth_brands') {
            pass_data('listProduct', 'cloth', data.cloth.length)
            setfull_data(data.cloth)
        } else if (alan_data.page === 'all_shoe_brands') {
            pass_data('listProduct', 'shoe', data.shoe.length)
            setfull_data(data.shoe)
        } else if (str[str.length - 1] === 'mobiles') {
            let brand_name = ''
            str.map((val, i) => {
                if (i !== str.length - 1) {
                    brand_name = brand_name + val
                }
            })
            let mobiles = []
            data.mobile.map((val) => {
                if (val.brand_name.replace(/\s/g, "") === brand_name.replace(/\s/g, "")) {
                    mobiles.push(val)
                }
            })
            pass_data('listProduct', alan_data.page, mobiles.length)
            setfull_data(mobiles)
        } else if (str[str.length - 1] === 'tvs') {
            let brand_name = ''
            str.map((val, i) => {
                if (i !== str.length - 1) {
                    brand_name = brand_name + val
                }
            })
            let tv = []
            data.tv.map((val) => {
                if (val.brand_name.replace(/\s/g, "") === brand_name.replace(/\s/g, "")) {
                    tv.push(val)
                }
            })
            pass_data('listProduct', alan_data.page, tv.length)
            setfull_data(tv)
        } else if (str[str.length - 1] === 'furnitures') {
            let brand_name = ''
            str.map((val, i) => {
                if (i !== str.length - 1) {
                    brand_name = brand_name + val
                }
            })
            let furnitures = []
            data.furniture.map((val) => {
                if (val.brand_name.replace(/\s/g, "") === brand_name.replace(/\s/g, "")) {
                    furnitures.push(val)
                }
            })
            pass_data('listProduct', alan_data.page, furnitures.length)
            setfull_data(furnitures)
        } else if (str[str.length - 1] === 'shoes') {
            let brand_name = ''
            str.map((val, i) => {
                if (i !== str.length - 1) {
                    brand_name = brand_name + val
                }
            })
            let shoes = []
            data.shoe.map((val) => {
                if (val.brand_name.replace(/\s/g, "") === brand_name.replace(/\s/g, "")) {
                    shoes.push(val)
                }
            })
            pass_data('listProduct', alan_data.page, shoes.length)
            setfull_data(shoes)
        } else if (str[str.length - 1] === 'cloths') {
            let brand_name = ''
            str.map((val, i) => {
                if (i !== str.length - 1) {
                    brand_name = brand_name + val
                }
            })
            let cloths = []
            data.cloth.map((val) => {
                if (val.brand_name.replace(/\s/g, "") === brand_name.replace(/\s/g, "")) {
                    cloths.push(val)
                }
            })
            pass_data('listProduct', alan_data.page, cloths.length)
            setfull_data(cloths)
        } else if (alan_data.page === 'cartpage') {
            navigate('/cart')
        }
        else if (alan_data.page === 'wishlistpage') {
            navigate('/wishlist')
        }
        else if (alan_data.page === 'helppage') {
            navigate('/Helpline')
        }
        else if (alan_data.page === 'orderspage') {
            navigate('/orders')
        }
        else if (alan_data.page === 'accountpage') {
            navigate('/account')
        }
        else if (alan_data.page === 'homepage') {
            navigate('/')
            window.location.reload()
        }
    }, [alan_data])



    useEffect(() => {
        if (User_credentails.page === 'mainpage') {
            user_credentails('sigIn', '', 'your not in sigin page or log in page are you want to go to sigin page or login page tell go to sigin page or go to login page')
        } else if (User_credentails.full_current) {
            if (flag == 0) {
                if (alan_data.search_value !== '') {
                    search(alan_data.search_value)
                } else {
                    user_credentails('sigIn', '', 'search input is empty')
                }
            }
        }
    }, [alan_data, User_credentails])


    useEffect(() => {

        // const username = localStorage.getItem("Client_Id")
        const username = 'admin'

        const getStocksData = {
            url: PRODUCT_LIST_ALL,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        axios(getStocksData)
            .then(response => {

                console.log(response.data)

                response.data.map((val) => {
                    if (val.category === 'mobile') {
                        if (brand.mobile.length === 0) {
                            brand.mobile.push(val.brand_name)
                        } else {
                            brand.mobile.map((data) => {
                                if (data !== val.brand_name) {
                                    brand.mobile.push(val.brand_name)
                                }
                            })
                        }
                        data.mobile.push(val)
                    } else if (val.category === 'tv') {
                        if (brand.tv.length === 0) {
                            brand.tv.push(val.brand_name)
                        } else {
                            brand.tv.map((data) => {
                                if (data !== val.brand_name) {
                                    brand.tv.push(val.brand_name)
                                }
                            })
                        }
                        data.tv.push(val)
                    } else if (val.category === 'furniture') {
                        if (brand.furniture.length === 0) {
                            brand.furniture.push(val.brand_name)
                        } else {
                            brand.furniture.map((data) => {
                                if (data !== val.brand_name) {
                                    brand.furniture.push(val.brand_name)
                                }
                            })
                        }
                        data.furniture.push(val)
                    } else if (val.category === 'shoe') {
                        if (brand.shoe.length === 0) {
                            brand.shoe.push(val.brand_name)
                        } else {
                            brand.shoe.map((data) => {
                                if (data !== val.brand_name) {
                                    brand.shoe.push(val.brand_name)
                                }
                            })
                        }
                        data.shoe.push(val)
                    } else if (val.category === 'cloth') {
                        if (brand.cloth.length === 0) {
                            brand.cloth.push(val.brand_name)
                        } else {
                            brand.cloth.map((data) => {
                                if (data !== val.brand_name) {
                                    brand.cloth.push(val.brand_name)
                                }
                            })
                        }
                        data.cloth.push(val)
                    }
                })
                setfull_data(response.data)
                setfull_date_change(response.data)
                console.log(data);
                console.log(brand);



            })
            .catch(function (e) {
                console.log(e);
                if (e.message === 'Network Error') {
                    alert("No Internet Found. Please check your internet connection")
                }
                // else {
                //     alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.")
                // }

            });



    }, []

    )

    function search(value) {
        console.log(value);
        if (value.toLowerCase() === ('mobile' || 'mobiles')) {
            setfull_data(data.mobile)
        } else if (value.toLowerCase() === ('furniture' || 'furnitures')) {
            setfull_data(data.furniture)
        } else if (value.toLowerCase() === ('shoe' || 'shoes')) {
            setfull_data(data.shoe)
        } else if (value.toLowerCase() === ('cloth' || 'clothes' || 'dress' || 'dresses')) {
            setfull_data(data.cloth)
        } else if (value.toLowerCase() === 'tv') {
            setfull_data(data.tv)
        } else {
            let str = value
            let arr = []

            if (str != '') {
                for (let i = 0; i < full_date_change.length; i++) {
                    let product_name = full_date_change[i].product_name
                    for (let j = 0; j < str.length; j++) {

                        for (let k = 0; k < product_name.length; k++) {
                            if (str[j].toUpperCase() === product_name[k].toUpperCase()) {
                                let wrd = ''
                                for (let l = k; l < k + str.length; l++) {
                                    wrd = wrd + product_name[l]
                                }
                                if (str.toUpperCase() === wrd.toUpperCase()) {
                                    arr.push(full_date_change[i])
                                    break
                                }
                            }
                        }

                    }
                }
            }


            if (arr.length != 0) {
                user_credentails('sigIn', '', 'here is your product')
                setfull_data(arr)
            } else {
                user_credentails('sigIn', '', 'no products found')
                setfull_data(full_date_change)
            }
        }
    }
    return (
        <div>
            {
                flag == 0 ?
                    <Header brand_data={brand} product_data={data} full_data={full_data} search_product={search} />
                    : ''
            }
            <Mini_product_card product_data={data} full_data={full_data} />
        </div>
    )
}
