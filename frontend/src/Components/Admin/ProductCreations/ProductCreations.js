import React, { useState, useEffect } from 'react';
// import MaterialTable from "material-table";
import Modal from 'react-modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateProduct from './CreateProduct';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { PRODUCT_LIST, PRODUCT_CREATION } from '../../../Api'

import {
    Button,

} from 'react-bootstrap';
import Edit_Product_Data from './Edit_Product_Data';

const customStyles = {

    overlay: { zIndex: 1000 },
    overflow: 'scroll'
};

const customStyles2 = {

    overlay: { zIndex: 1000 },
    overflow: 'scroll'
};

// Modal.setAppElement('#root')

function CustomEditComponent(props) {

    const [loader, setloader] = useState(1);
    const [flag, setflag] = useState('');
    const [data, setdata] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [editmodalIsOpen, seteditmodalIsOpen] = useState(false);
    const [editstockdata, seteditstockdata] = useState([]);


    useEffect(() => {

        const username = JSON.parse(localStorage.getItem("userdata"))
        console.log(username);

        const getStocksData = {
            url: PRODUCT_LIST,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: { client_id: username._id }
        }
        
        axios(getStocksData)
            .then(response => {

                console.log(response.data,'dndjd')

                setdata(response.data)

            })
            .catch(function (e) {
                if (e.message === 'Network Error') {
                    alert("No Internet Found. Please check your internet connection")
                }
                else {
                    alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.")
                }

            });



    }, [flag]

    )

    function edit(id) {
        const options = {
            url: `${PRODUCT_CREATION}/${id}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
            }
        };

        axios(options)
            .then(response => {
                // console.log(response);
                setflag(!flag)

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

    let list = data.map((val, i) => {
        return (
            <tr>
                <td style={{ padding: '10px', color: 'black' }}>{i + 1}</td>
                <td style={{ padding: '10px', color: 'black' }}>{val.product_name}</td>
                <td style={{ padding: '10px', color: 'black' }}>{val.manufacturer_name}</td>
                <td style={{ padding: '10px', color: 'black' }}>{val.location}</td>
                <td style={{ padding: '10px', color: 'black' }}>{val.material_number}</td>
                <td style={{ padding: '10px', color: 'black' }}>{val.qty}</td>
                <td style={{ padding: '10px', color: 'black' }}>{val.category}</td>
                <td style={{ padding: '10px', color: 'black' }}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ display: 'flex' }}>
                            <EditIcon style={{ color: 'blue', }} onClick={() => {
                                seteditstockdata(val)
                                seteditmodalIsOpen(true);
                            }} />

                            <DeleteIcon style={{ color: 'red', }} onClick={() => {
                                edit(val._id)
                            }} />

                        </div>
                    </div>
                </td>
            </tr>
        )
    })


    function closeModal() {
        setIsOpen(false);

    }

    function getResponse(result) {
        setIsOpen(false);
        seteditmodalIsOpen(false)
        setflag(!flag)
    }


    if (loader == 0) {

        return (
            <div>
                <div style={{ backgroundColor: 'white' }}>
                    {/* <CircularProgress color="secondary" size={70} /> */}
                    <h1 style={{ marginLeft: 40 }}>Loading...</h1>
                </div>
            </div>
        )
    }

    else {
        return (
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={props.windowWidth >= 700 ? customStyles : customStyles2}
                    contentLabel="Example Modal"
                    backdrop="static"
                    shouldCloseOnOverlayClick={false}
                >
                    <CreateProduct
                        callback={getResponse}
                    />
                </Modal>

                <Modal
                    isOpen={editmodalIsOpen}
                    onRequestClose={closeModal}
                    style={props.windowWidth >= 700 ? customStyles : customStyles2}
                    contentLabel="Example Modal"
                    backdrop="static"
                    shouldCloseOnOverlayClick={false}
                >
                    <Edit_Product_Data
                        callback={getResponse}
                        data={editstockdata}

                    />
                </Modal>
                <div style={{ display: "flex", justifyContent: 'center', marginTop: 20 }}>
                    <Button
                        variant={"primary"}
                        style={{ fontWeight: 'bold', fontSize: 17 }}
                        onClick={(e) => {
                            setIsOpen(true)
                        }}
                    >
                        + ADD PRODUCT
                    </Button>
                </div>
                <div>
                    <h4 style={{ fontWeight: 'bold', }}>YOUR PRODUCTS</h4>
                    <div style={{ width: '100%', minHeight: '90vh', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: '15px', padding: '10px', zIndex: 0, }}>
                        <table style={{ width: '100%' }}>
                            <tr style={{ borderBottom: '1px solid grey', fontWeight: 'bolder' }}>
                                <th style={{ padding: '10px', color: 'black' }}>S.no</th>
                                <th style={{ padding: '10px', color: 'black' }}>Product Name</th>
                                <th style={{ padding: '10px', color: 'black' }}>Manufacturer Name</th>
                                <th style={{ padding: '10px', color: 'black' }}>Location</th>
                                <th style={{ padding: '10px', color: 'black' }}>Material Number</th>
                                <th style={{ padding: '10px', color: 'black' }}>Qty</th>
                                <th style={{ padding: '10px', color: 'black' }}>Category</th>
                                <th style={{ padding: '10px', color: 'black' }}>Action</th>
                            </tr>
                            {
                                list
                            }
                        </table>
                    </div>
                </div>
                {/* <MaterialTable
                    title="USER CREATIONS"
                    columns={[
                        { title: 'USERNAME', field: 'name', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.name.toUpperCase()}</h5>) } },
                        { title: 'MOBILE NUMBER', field: 'mobile_number', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.mobile_number}</h5>) } },
                        { title: 'PASSWORD', field: 'password', render: rowData => { return (<h5 style={{ fontSize: 13, fontFamily: 'Poppins-Medium' }}>{rowData.password}</h5>) } },
                    ]}


                    data={data}
                    key={data._id}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit Food',
                            iconProps: { style: { color: "#575580" } },
                            onClick: (event, rowData) => {
                                seteditstockdata(rowData)
                                seteditmodalIsOpen(true)
                            }
                        },
                        rowData => ({
                            icon: 'delete',
                            tooltip: 'Delete User',
                            iconProps: { style: { color: "#575580" } },
                            onClick: (event, rowData) => {
                                confirmAlert({
                                    title: 'Delete',
                                    message: 'Are you sure to do this ?',
                                    buttons: [
                                        {
                                            label: 'Yes',
                                            onClick: () => {
                                                // const options = {
                                                //     url: `${PRODUCT_CREATION}/${props.data._id}`,
                                                //     method: 'DELETE',
                                                //     headers: {
                                                //         'Content-Type': 'application/json',
                                                //         // 'Authorization': 'Bearer ' + window.localStorage.getItem('codeofauth')
                                                //     }
                                                // };

                                                // axios(options)
                                                //     .then(response => {
                                                //         // console.log(response);
                                                //         setflag(!flag)

                                                //     })

                                                //     .catch(function (e) {


                                                //         if (e.message === 'Network Error') {
                                                //             alert("No Internet Found. Please check your internet connection")
                                                //         }

                                                //         else {

                                                //             alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.")
                                                //         }


                                                //     });


                                            }
                                        },
                                        {
                                            label: 'No',
                                            onClick: () => {

                                            }
                                        }
                                    ]
                                });

                            }
                        })
                    ]}
                    options={{
                        actionsColumnIndex: -1,
                        sorting: true,
                        exportButton: true,
                        pageSize: 10
                    }}
                    localization={{
                        header: {
                            actions: "ACTIONS"
                        }
                    }}
                /> */}
            </div>
        )
    }
}

export default CustomEditComponent;

