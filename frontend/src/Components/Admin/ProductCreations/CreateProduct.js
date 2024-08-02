import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import windowSize from 'react-window-size';
import axios from 'axios'
import { PRODUCT_CREATION } from '../../../Api'


function FormsElements(props) {

    const [product_name, setproduct_name] = useState("");
    const [manufacturer_name, setmanufacturer_name] = useState("");
    const [brand_name, setbrand_name] = useState("");
    const [location, setlocation] = useState("");
    const [material_number, setmaterial_number] = useState("");
    const [qty, setqty] = useState("");
    const [image, setimage] = useState("");
    const [category, setcategory] = useState("");
    const [key_feature, setkey_feature] = useState("");
    const [description, setdescription] = useState("");
    const [price, setprice] = useState("");
    const [color, setcolor] = useState("");
    const [size, setsize] = useState("");
    const [date, setdate] = useState('')
    const username = localStorage.getItem("userdata")

    return (
        <div>
            <Row>
                <Col>
                    <Card style={{ color: 'white', backgroundColor: '#712cf9' }}>

                        <Card.Body>
                            <h5>CREATE NEW  PRODUCT </h5>
                            <hr />
                            <Row>
                                <Col md={6}>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Product Name *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Product Name"
                                            value={product_name}
                                            onChange={(event) => { setproduct_name(event.target.value) }}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Brand Name *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Brand Name"
                                            value={brand_name}
                                            onChange={(event) => { setbrand_name(event.target.value) }}
                                        />
                                    </Form.Group>


                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Manufacturer Name *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Manufacturer Name"
                                            value={manufacturer_name}
                                            onChange={(event) => { setmanufacturer_name(event.target.value) }}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Location *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Location"
                                            value={location}
                                            onChange={(event) => { setlocation(event.target.value) }}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Colour *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter colour"
                                            value={color}
                                            onChange={(event) => { setcolor(event.target.value) }}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Material Number *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Material Number"
                                            value={material_number}
                                            onChange={(event) => { setmaterial_number(event.target.value) }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Date *</Form.Label>
                                        <Form.Control
                                            type="date"
                                            placeholder="Enter Description"
                                            value={date}
                                            onChange={(event) => { setdate(event.target.value) }}
                                        />
                                    </Form.Group>
                                </Col>


                                <Col md={6}>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Qty *</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter Qty"
                                            value={qty}
                                            onChange={(event) => { setqty(event.target.value) }}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Image *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Image"
                                            value={image}
                                            onChange={(event) => { setimage(event.target.value) }}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Price *</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter Price"
                                            value={price}
                                            onChange={(event) => { setprice(event.target.value) }}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Category *</Form.Label>
                                        <Form.Select aria-label="Default select example" onChange={(e) => { setcategory(e.target.value) }}>
                                            <option>Open this select menu</option>
                                            <option value="tv">TV</option>
                                            <option value="mobile">MOBILE</option>
                                            <option value="furniture">FURNITURE</option>
                                            <option value="shoe">SHOE</option>
                                            <option value="cloth">CLOTH</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Size *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter size"
                                            value={size}
                                            onChange={(event) => { setsize(event.target.value) }}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Key Feature *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Key Feature"
                                            value={key_feature}
                                            onChange={(event) => { setkey_feature(event.target.value) }}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Description *</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows="10"
                                            placeholder="Enter Description"
                                            value={description}
                                            onChange={(event) => { setdescription(event.target.value) }}
                                        />
                                    </Form.Group>


                                </Col>




                                <div style={{ marginLeft: 15, marginTop: '10px' }}>
                                    <Button variant="primary" style={{ marginRight: '10px', backgroundColor: 'white', color: 'black' }}
                                        onClick={() => {
                                            if (product_name !== "" && manufacturer_name !== "" && location !== "" && material_number !== "" && qty !== "" && image !== "" && category !== "" && key_feature !== "" && description !== "") {

                                                const username = JSON.parse(localStorage.getItem("userdata")); 

                                                console.log(username._id); 

                                                const client_USER_details = {
                                                    product_name: product_name,
                                                    manufacturer_name: manufacturer_name,
                                                    brand_name: brand_name,
                                                    location: location,
                                                    material_number: material_number,
                                                    qty: qty,
                                                    image: image,
                                                    category: category,
                                                    key_feature: key_feature,
                                                    description: description,
                                                    price: price,
                                                    color: color,
                                                    size: size,
                                                    available_qty: qty,
                                                    return: [],
                                                    return_limit: date,
                                                    client_id: username._id
                                                };

                                                const options = {
                                                    url: PRODUCT_CREATION,
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
                                                    },
                                                    data: JSON.stringify(client_USER_details)
                                                };

                                                console.log(client_USER_details);


                                                axios(options)
                                                    .then(response => {

                                                        console.log(response.data)

                                                        if (response.data == "USER ID already exist") {

                                                            // alert("Username(" + username + ") already exist")
                                                        }

                                                        else {

                                                            props.callback()

                                                        }


                                                    })
                                                    .catch(function (e) {
                                                        props.callback()
                                                        if (e.message === 'Network Error') {
                                                            alert("No Internet Found. Please check your internet connection")
                                                        }
                                                        else {

                                                            alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.")
                                                        }


                                                    });
                                            }

                                            else {

                                                alert("Please fill out all required fields.")

                                            }


                                        }}
                                    >
                                        SUBMIT
                                    </Button>

                                    <Button variant="primary" style={{ backgroundColor: 'white', color: 'black' }}
                                        onClick={() => {
                                            props.callback()
                                        }}>
                                        CANCEL
                                    </Button>

                                </div>


                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );

}

export default windowSize(FormsElements);