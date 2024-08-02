import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import windowSize from 'react-window-size';
import { PRODUCT_CREATION } from '../../../Api'
import axios from 'axios';

function FormsElements(props) {

    const [product_name, setproduct_name] = useState(props.data.product_name);
    const [manufacturer_name, setmanufacturer_name] = useState(props.data.manufacturer_name);
    const [brand_name, setbrand_name] = useState(props.data.brand_name);
    const [location, setlocation] = useState(props.data.location);
    const [material_number, setmaterial_number] = useState(props.data.material_number);
    const [qty, setqty] = useState(props.data.qty);
    const [image, setimage] = useState(props.data.image);
    const [category, setcategory] = useState(props.data.category);
    const [key_feature, setkey_feature] = useState(props.data.key_feature);
    const [description, setdescription] = useState(props.data.description);
    const [price, setprice] = useState(props.data.price);
    const [color, setcolor] = useState(props.data.color);
    const [size, setsize] = useState(props.data.size);
    const [date,setdate]=useState(props.data.return_limit)



    return (
        <div>
            <Row>
                <Col>
                    <Card style={{ color: 'white', backgroundColor: '#712cf9' }}>
                        {/* <Card.Header>
                                <Card.Title as="h5">CREATE NEW AGENCY </Card.Title>
                                <hr/>

                            </Card.Header> */}
                        <Card.Body>
                            <h5>UPDATE PRODUCT DETAILS </h5>
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
                                        <Form.Label>date *</Form.Label>
                                        <Form.Control
                                          type='date'
                                            placeholder="Enter Description"
                                            value={date}
                                            onChange={(event) => { setdate(event.target.value) ;console.log(event.target.value); console.log(date,'pppp');}}
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

                                

                                <div style={{ marginLeft: 15, marginTop: 10 }}>
                                    <Button variant="primary" style={{ marginRight: '10px', backgroundColor: 'white', color: 'black' }}
                                        onClick={() => {

                                            if (product_name !== "" && manufacturer_name !== "" && location !== "" && material_number !== "" && qty !== "" && image !== "" && category !== "" && key_feature !== "" && description !== "") {
                                                const username = JSON.parse(localStorage.getItem("userdata")); 
                                                const stock_details = {

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
                                                    available_qty: props.data.available_qty,
                                                    return: props.data.return,
                                                    price: price,
                                                    color: color,
                                                    size: size,
                                                    return_limit:date,
                                                    client_id: username._id
                                                   


                                                };

                                                const options = {
                                                    url: `${PRODUCT_CREATION}/${props.data._id}`,
                                                    method: 'PUT',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
                                                    },
                                                    data: JSON.stringify(stock_details)
                                                };
                                                axios(options)
                                                    .then(response => {
                                                        props.callback()

                                                    })

                                                    .catch(function (e) {
                                                        props.callback()
                                                        if (e.message === 'Network Error') {
                                                            alert("No Internet Found. Please check your internet connection")
                                                        }

                                                        else {

                                                            alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.t345")
                                                        }


                                                    });
                                            } else {
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