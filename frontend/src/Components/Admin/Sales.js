import React, { useState, useEffect } from 'react';
// import MaterialTable from "material-table";
import Modal from 'react-modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { PRODUCT_LIST, PRODUCT_CREATION } from '../../Api'

import {
  Button,

} from 'react-bootstrap';


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
  const [show, setshow] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState([]);
  const tableHeaderStyle = {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    padding: '10px',
    textAlign: 'left',
  };
  //  const username = localStorage.getItem("Client_Id")

  useEffect(() => {

    // const username = localStorage.getItem("Client_Id")
    const username = JSON.parse(localStorage.getItem("userdata"))

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

        console.log(response.data)

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
  const handleButtonClick = (product) => {
    setSelectedProduct(product.review);
    console.log(product.review);
    setshow(true);
  };

  const list = data.map((val, i) => (
    <div key={i} style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
      <Button onClick={() => handleButtonClick(val)}>{val.product_name}</Button>
    </div>
  ));



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
          isOpen={show}
          onRequestClose={() => setshow(false)}

        >
          {selectedProduct.length > 0 && (

            <div>

              <h3>Reviews:</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <thead style={{ backgroundColor: '#f2f2f2' }}>
                  <tr>
                    <th style={tableHeaderStyle}>Review</th>
                    <th style={tableHeaderStyle}>Name</th>
                    <th style={tableHeaderStyle}>Star</th>
                    <th style={tableHeaderStyle}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProduct.map((review, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #ddd', padding: '8px 0' }}>
                      <td style={{
                        fontWeight: 'bold',
                        padding: '10px',
                        textAlign: 'left',
                      }}>{index + 1}</td>
                      <td style={{
                        fontWeight: 'bold',
                        padding: '10px',
                        textAlign: 'left',
                      }}>{review.name}</td>
                      <td style={{
                        fontWeight: 'bold',
                        padding: '10px',
                        textAlign: 'left',
                      }}>
                        {Array.from({ length: review.star }, (_, index) => (
                          <p key={index} style={{ display: 'inline', margin: '0' }}>⭐</p>
                        ))}
                      </td>


                      <td style={{
                        fontWeight: 'bold',
                        padding: '10px',
                        textAlign: 'left',
                      }}>{review.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          )}
          <Button
            onClick={() => setshow(false)}
            style={{ position: 'absolute', bottom: '10px', left: 20 }}
          >
            Close
          </Button>
        </Modal>





        <div>

          <div style={{ width: '100%', minHeight: '90vh', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: '15px', padding: '10px', zIndex: 0, }}>
            <table style={{ width: '100%' }}>
              <tr style={{ borderBottom: '1px solid grey', fontWeight: 'bolder' }}>

                <th style={{ padding: '10px', color: 'black' }}>Product Names</th>


              </tr>
              <div style={{display:"flex",gap:"10px"}}>
              {
                list
              }
              </div>
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

