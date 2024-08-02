import React, { useEffect, useState } from 'react';

import { Form, Button } from 'react-bootstrap';

import axios from 'axios'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
   
    const [flag, setflag] = useState(0)
    const alan_data = useSelector((state) => state.alanreducer)
    const User_credentails = useSelector((state) => state.User_credentails)
    const navigate = useNavigate()
    function user_credentails(name, data, msg) {
        if (alan_data) {
            alan_data.alaninstance.activate();
            alan_data.alaninstance.callProjectApi(name, {
                data: data,
                msg: msg
            }, function (error, result) { });
        }
    }
    
    
    useEffect(() => {
        let str = alan_data.page.split(' ')
       
         if (str[0] === 'homepage') {
            navigate('/')
            user_credentails('sigIn', '', 'Here is your Home page')
        } 

    }, [alan_data, User_credentails])



    useEffect(()=>{
        user_credentails('sigIn', '', 'here is your help page , your helpline number is 6 , 3, 8 , 2 ,4 ,9 ,8 , 2 ,6 , 4 , and email is Ycart@gmail.com')
    },[])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor:   '#712CF9' }}>
           

                    <div style={{ backgroundColor: '#0D6BFF', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',width:"30rem",height:"30rem" }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: "white",fontSize:"70px" }}>Help Line</h2>

                        <form>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ color: "white",textAlign:"center" ,fontSize:"50px",width:"100%"}} htmlFor="username">email:</label>
                                <label style={{ color: "white",textAlign:"center" ,fontSize:"40px",width:"100%"}} htmlFor="username">Ycart@gmail.com</label>
                                
                              
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ color: "white",textAlign:"center" ,fontSize:"50px",width:"100%"}} htmlFor="username">Phone:</label>
                                <label style={{ color: "white",textAlign:"center" ,fontSize:"40px",width:"100%"}} htmlFor="username">6382498264</label>
                              
                              
                            </div>
                           
                            <div style={{ textAlign: 'center' }}>
                               

                                
                            </div>
                        </form>
                    </div>



              
        </div>
    );
}

export default AdminLogin;
