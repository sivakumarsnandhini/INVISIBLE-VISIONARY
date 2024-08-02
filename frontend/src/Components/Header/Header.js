import React, { useState, useEffect } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import './Header.css'
import { PRODUCT_LIST_ALL } from '../../Api'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import img from './99.png'



export default function Header({ brand_data, product_data, search_product, full_data }) {
    const alan_data = useSelector((state) => state.alanreducer)
    const [product, setproduct] = useState('none')
    const [product1, setproduct1] = useState('none')
    const [all_cat, setall_cat] = useState(false)
    const [search, setsearch] = useState(alan_data.search_value)
    const navigate = useNavigate()
    const [show, setshow] = useState(false)
    const [brand, setbrand] = useState(brand_data)
   

    

    function pass_data(name, data) {
        if (alan_data) {
            alan_data.alaninstance.activate();
            alan_data.alaninstance.callProjectApi(name, {
                brand: data
            }, function (error, result) { });
        }
    }
    useEffect(() => {
        console.log(alan_data.page);
        if (alan_data.page === 'category') {
            pass_data('listCategory', 'Tv, Furniture, Mobiles, shoes, and cloths')
            setall_cat(true)
        } else if (alan_data.page === 'mobile') {
            pass_data('listBrand', brand.mobile)
            setall_cat(true)
            setproduct1('mobiles')
            setproduct('mobiles')
        } else if (alan_data.page === 'tv') {
            pass_data('listBrand', brand.tv)
            setall_cat(true)
            setproduct1('tv')
            setproduct('tv')
        } else if (alan_data.page === 'shoe') {
            pass_data('listBrand', brand.shoe)
            setall_cat(true)
            setproduct1('shoe')
            setproduct('shoe')
        } else if (alan_data.page === 'cloth') {
            pass_data('listBrand', brand.cloth)
            setall_cat(true)
            setproduct1('cloth')
            setproduct('cloth')
        } else if (alan_data.page === 'furniture') {
            pass_data('listBrand', brand.furniture)
            setall_cat(true)
            setproduct1('furniture')
            setproduct('furniture')
        }
        setsearch(alan_data.search_value)
    }, [alan_data])

    console.log(alan_data);

    return (
        <div>
            <div class="overlay"></div>

            <nav class="navbar navbar-expand-md navbar-light bg-light main-menu" >
                <div class="container">

                    <button type="button" id="sidebarCollapse" class="btn btn-link d-block d-md-none">
                        <i class="bx bx-menu icon-single"></i>
                    </button>
                    <p style={{fontWeight:"bold",marginTop:"20px"}}>Invisible Visionary
</p>
                    <a class="navbar-brand" href="#">
                     <img style={{width:"50px",height:"50px"}} src={img}/>
                    </a>

                    <ul class="navbar-nav ml-auto d-block d-md-none">
                        <li class="nav-item">
                            <a class="btn btn-link" href="#"><i class="bx bxs-cart icon-single"></i> <span class="badge badge-danger">3</span></a>

                        </li>
                    </ul>

                    <div class="collapse navbar-collapse">
                        <div class="form-inline my-2 my-lg-0 mx-auto" style={{ display: 'flex' }}>
                            <input class="form-control" type="search" value={search} placeholder="Search for products..." aria-label="Search" onChange={(e) => {
                                setsearch(e.target.value)
                            }} />
                            <button class="btn btn-success my-2 my-sm-0" onClick={() => {
                                search_product(search)
                            }}>Submit</button>
                        </div>

                        <div style={{ display: 'flex' }}>
                            <div>
                                

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
                                        <a className="dropdown-item" href="#" onClick={handleSortLowToHigh}>
                                            Low to High
                                        </a>
                                        <a  onClick={handleSorthighTolow}style={{marginTop:"10px"}} className="dropdown-item" href="#">
                                            High To Low
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>



                        <div style={{ display: 'flex' }}>
                            <FavoriteIcon style={{ marginRight: '10px' }} onClick={() => navigate('/Wishlist')} />
                            <ShoppingCartIcon onClick={() => navigate('/cart')} />
                        </div>

                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <img style={{ width: '30px', height: '30px', marginRight: '5px' }} crossorigin="anonymous" src='https://static.vecteezy.com/system/resources/thumbnails/019/900/322/small_2x/happy-young-cute-illustration-face-profile-png.png'></img>
                            </li>
                            <li class="nav-item ml-md-3">
                                <Link to='/sign-up'>
                                    <a class="btn btn-primary" href="#"><i class="bx bxs-user-circle mr-1"></i> Log In / Register</a>
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>

            <nav class="navbar navbar-expand-md navbar-light bg-light sub-menu">
                <div class="container">
                    <div class="collapse navbar-collapse" id="navbar">
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#0d6efd', alignItems: 'center', width: '20%', color: 'white', cursor: 'pointer' }} onClick={() => {
                            if (all_cat) {
                                setall_cat(false)
                            } else {
                                setall_cat(true)
                            }
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FormatListBulletedIcon style={{ marginRight: '5px' }} />
                                <p style={{ margin: 0 }}>All Category</p>
                            </div>
                            <KeyboardArrowDownIcon />
                        </div>

                        <ul class="navbar-nav mx-auto">

                            <li class="nav-item active">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => { setproduct1('tv'); setproduct('none') }}>Tv</a>
                                <div aria-labelledby="navbarDropdown" style={{ backgroundColor: 'white', boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", padding: '15px', display: product1 === 'tv' ? 'block' : 'none' }}>
                                    {
                                        brand.tv.map((val) => (
                                            <a class="dropdown-item" href="#">{val}</a>
                                        ))
                                    }
                                </div>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => { setproduct1('furniture'); setproduct('none') }}>Furniture</a>
                                <div aria-labelledby="navbarDropdown" style={{ backgroundColor: 'white', boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", padding: '15px', display: product1 === 'furniture' ? 'block' : 'none' }}>
                                    {
                                        brand.furniture.map((val) => (
                                            <a class="dropdown-item" href="#">{val}</a>
                                        ))
                                    }
                                </div>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => { setproduct1('mobiles'); setproduct('none') }}>
                                    Mobiles
                                </a>
                                <div aria-labelledby="navbarDropdown" style={{ backgroundColor: 'white', boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", padding: '15px', display: product1 === 'mobiles' ? 'block' : 'none' }}>
                                    {
                                        brand.mobile.map((val) => (
                                            <a class="dropdown-item" href="#">{val}</a>
                                        ))
                                    }
                                </div>
                            </li>

                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => { setproduct1('shoes'); setproduct('none') }}>
                                    Shoes
                                </a>
                                <div aria-labelledby="navbarDropdown" style={{ backgroundColor: 'white', boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", padding: '15px', display: product1 === 'shoes' ? 'block' : 'none' }}>
                                    {
                                        brand.shoe.map((val) => (
                                            <a class="dropdown-item" href="#">{val}</a>
                                        ))
                                    }
                                </div>
                            </li>

                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => { setproduct1('cloths'); setproduct('none') }}>
                                    Cloths
                                </a>
                                <div aria-labelledby="navbarDropdown" style={{ backgroundColor: 'white', boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", padding: '15px', display: product1 === 'cloths' ? 'block' : 'none' }}>
                                    {
                                        brand.cloth.map((val) => (
                                            <a class="dropdown-item" href="#">{val}</a>
                                        ))
                                    }
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

            <div style={{ backgroundColor: 'white', boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", width: '18%', position: 'absolute', zIndex: 5, left: 70, padding: '20px', display: all_cat ? 'block' : 'none' }}>
                <ul class="navbar-nav mx-auto">

                    <li class="nav-item active">
                        <a class="nav-link" href="#" onClick={() => { setproduct('tv'); setproduct1('none') }}>Tv</a>
                        <div aria-labelledby="navbarDropdown" style={{ backgroundColor: 'white', boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", padding: '15px', display: product === 'tv' ? 'block' : 'none' }}>
                            {
                                brand.tv.map((val) => (
                                    <a class="dropdown-item" href="#">{val}</a>
                                ))
                            }
                        </div>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#" onClick={() => { setproduct('furniture'); setproduct1('none') }}>Furniture</a>
                        <div aria-labelledby="navbarDropdown" style={{ backgroundColor: 'white', boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", padding: '15px', display: product === 'furniture' ? 'block' : 'none' }}>
                            {
                                brand.furniture.map((val) => (
                                    <a class="dropdown-item" href="#">{val}</a>
                                ))
                            }
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => { setproduct('mobiles'); setproduct1('none') }}>
                            Mobiles
                        </a>
                        <div aria-labelledby="navbarDropdown" style={{ backgroundColor: 'white', boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", padding: '15px', display: product === 'mobiles' ? 'block' : 'none' }}>
                            {
                                brand.mobile.map((val) => (
                                    <a class="dropdown-item" href="#">{val}</a>
                                ))
                            }
                        </div>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => { setproduct('shoes'); setproduct1('none') }}>
                            Shoes
                        </a>
                        <div aria-labelledby="navbarDropdown" style={{ backgroundColor: 'white', boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", padding: '15px', display: product === 'shoes' ? 'block' : 'none' }}>
                            {
                                brand.shoe.map((val) => (
                                    <a class="dropdown-item" href="#">{val}</a>
                                ))
                            }
                        </div>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => { setproduct('cloths'); setproduct1('none') }}>
                            Cloths
                        </a>
                        <div aria-labelledby="navbarDropdown" style={{ backgroundColor: 'white', boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", padding: '15px', display: product === 'cloths' ? 'block' : 'none' }}>
                            {
                                brand.cloth.map((val) => (
                                    <a class="dropdown-item" href="#">{val}</a>
                                ))
                            }
                        </div>
                    </li>

                </ul>
            </div>

            <div class="search-bar d-block d-md-none" >
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <form class="form-inline mb-3 mx-auto">
                                <input class="form-control" type="search" placeholder="Search for products..." aria-label="Search" />
                                <button class="btn btn-success" type="submit"><i class="bx bx-search"></i></button>

                            </form>

                        </div>
                    </div>
                </div>

            </div>

        </div>

    )
}




