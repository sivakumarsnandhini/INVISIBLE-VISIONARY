import React, { useState } from 'react'
import {
    Row,
    Col,
    Form,
    InputGroup,
    FormControl,
    DropdownButton,
    Dropdown,
} from "react-bootstrap";
import { Link } from 'react-router-dom'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Product_creation from './ProductCreations/ProductCreations';
import Sales from './Sales';
import Returns from './Returns';
import Saless from './Slaess';
import Add_customer from './Add_customer'
import AdminLogin from './AdminLogin';

export default function Index() {
    const [sidebar, setsidebar] = useState('product')
    return (
        <div>
            <Row style={{ width: '100%' }}>
                <Col md={2} style={{ padding: 0 }}>
                    <div style={{ backgroundColor: '#712cf9', minHeight: '100vh', color: 'white', width: '100%', border: '1px solid #712cf9' }}>
                        <div style={{ paddingLeft: '15px', marginTop: '20px' }}>
                            <p style={{ fontWeight: 'bolder', fontSize: '13px', margin: 0 }}>ADMIN DASHBOARD</p>
                        </div>
                        <hr style={{ borderTop: '2px solid white' }}></hr>

                        <div style={{ paddingLeft: '15px', marginTop: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', cursor: 'pointer' }}>
                                <AddCircleOutlineIcon style={{ marginRight: '5px', fontSize: '17px', color: sidebar === 'product' ? '#41e0fd' : "white" }} />
                                <p style={{ fontWeight: 'bold', fontSize: '11px', margin: 0, color: sidebar === 'product' ? '#41e0fd' : "white" }} onClick={() => { setsidebar('product') }}>ADD PRODUCT</p>
                            </div>



                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', cursor: 'pointer' }}>
                                <AddCircleOutlineIcon style={{ marginRight: '5px', fontSize: '17px', color: sidebar === 'return' ? '#41e0fd' : "white" }} />
                                <p style={{ fontWeight: 'bold', fontSize: '11px', margin: 0, color: sidebar === 'return' ? '#41e0fd' : "white" }} onClick={() => { setsidebar('return') }}>RETURNS</p>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', cursor: 'pointer' }}>
                                <AddCircleOutlineIcon style={{ marginRight: '5px', fontSize: '17px', color: sidebar === 'sale' ? '#41e0fd' : "white" }} />
                                <p style={{ fontWeight: 'bold', fontSize: '11px', margin: 0, color: sidebar === 'sale' ? '#41e0fd' : "white" }} onClick={() => { setsidebar('sale') }}>REVIEW</p>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', cursor: 'pointer' }}>
                                <AddCircleOutlineIcon style={{ marginRight: '5px', fontSize: '17px', color: sidebar === 'saless' ? '#41e0fd' : "white" }} />
                                <p style={{ fontWeight: 'bold', fontSize: '11px', margin: 0, color: sidebar === 'saless' ? '#41e0fd' : "white" }} onClick={() => { setsidebar('saless') }}>SALES</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', cursor: 'pointer' }}>
                                <AddCircleOutlineIcon style={{ marginRight: '5px', fontSize: '17px', color: sidebar === 'customer' ? '#41e0fd' : "white" }} />
                                <p style={{ fontWeight: 'bold', fontSize: '11px', margin: 0, color: sidebar === 'customer' ? '#41e0fd' : "white" }} onClick={() => { setsidebar('customer') }}>ADD LOCATION</p>
                            </div>

                            {/* <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', cursor: 'pointer' }}>
                                <AddCircleOutlineIcon style={{ marginRight: '5px', fontSize: '17px', color: sidebar === 'user' ? '#41e0fd' : "white" }} />
                                <p style={{ fontWeight: 'bold', fontSize: '11px', margin: 0, color: sidebar === 'user' ? '#41e0fd' : "white" }} onClick={() => { setsidebar('user') }}>ADD USER</p>
                            </div>
                            */}

                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', cursor: 'pointer' }}>
                                <AddCircleOutlineIcon style={{ marginRight: '5px', fontSize: '17px', color: sidebar === 'logout' ? '#41e0fd' : "white" }} />
                                <Link to='/sign-up'>
                                    <p style={{ fontWeight: 'bold', fontSize: '11px', margin: 0, color: sidebar === 'logout' ? '#41e0fd' : "white" }}>LOGOUT</p>
                                </Link>
                            </div> 

                            
                        </div>
                    </div>
                </Col>

                <Col style={{ padding: 0 }}>
                    <div style={{ backgroundColor: 'white', minHeight: '100vh', color: 'white', width: '100%' }}>
                        {
                            sidebar === 'product' ?
                                <Product_creation />
                                :
                                sidebar === 'return' ?
                                    <Returns />
                                    :
                                    sidebar === 'sale' ?
                                        <Sales />
                                    
                                        :
                                        sidebar === 'saless' ?
                                        <Saless/>: 
                                        sidebar ==='customer' ?
                                        <Add_customer/> :
                                        // sidebar ==='user' ? 
                                        // <AdminLogin/>:
                                        ''
                        }
                    </div>
                </Col>
            </Row>
        </div>
    )
}
