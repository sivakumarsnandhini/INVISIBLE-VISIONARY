import React, { useEffect, useState } from 'react';
import { PRODUCT_LIST } from '../../Api';
import axios from 'axios';

export default function Returns() {
  const [values, setValues] = useState([]);
  const userdata = JSON.parse(localStorage.getItem('userdata'));

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("userdata"));
  
    const getStocksData = {
      url: PRODUCT_LIST,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { client_id: username._id }
    };
  
    axios(getStocksData)
      .then(response => {
        console.log(response.data);
        const arr = response.data.flat();
        setValues(arr);
      })
      .catch(function (e) {
        if (e.message === 'Network Error') {
          alert("No Internet Found. Please check your internet connection");
        } else {
          alert("Sorry, something went wrong. Please try again after sometime. If the issue still persists contact support.");
        }
      });
  }, []);

  return (
    <div>
      <div>
        <div style={{ width: '100%', minHeight: '90vh', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: '15px', padding: '10px', zIndex: 0 }}>
          <table style={{ width: '100%' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid grey', fontWeight: 'bolder' }}>
                <th style={{ padding: '10px', color: 'black' }}>Product Name</th>
                <th style={{ padding: '10px', color: 'black' }}>Manufacturer Name</th>
                <th style={{ padding: '10px', color: 'black' }}>Location</th>
                <th style={{ padding: '10px', color: 'black' }}>Return</th>
                <th style={{ padding: '10px', color: 'black' }}>Category</th>
              </tr>
            </thead>
            <tbody>
              {values.map((val, index) => (
                val.return.map((value, i) => {
                  if (value.aaa === userdata._id) {
                    return (
                      <tr key={i}>
                        <td style={{ padding: '10px', color: 'black' }}>{val.product_name}</td>
                        <td style={{ padding: '10px', color: 'black' }}>{val.manufacturer_name}</td>
                        <td style={{ padding: '10px', color: 'black' }}>{val.location}</td>
                        <td style={{ padding: '10px', color: 'black' }}>{value.qty}</td>
                        <td style={{ padding: '10px', color: 'black' }}>{val.category}</td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                })
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
