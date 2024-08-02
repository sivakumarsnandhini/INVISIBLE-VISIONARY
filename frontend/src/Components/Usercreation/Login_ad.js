import React, { useState } from 'react';

import { Form, Button } from 'react-bootstrap';

import axios from 'axios'

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [createusername, setcreateUsername] = useState('');
    const [createpassword, setcreatePassword] = useState('');
    const [flag, setflag] = useState(0)

    const handleLogin = () => {
        if (username === 'admin' && password === '123') {
            setflag(1)

            console.log('Login successful');
        } else {
            setErrorMessage('Invalid username or password');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: flag == 0 ? '#0D6BFF' : '#712CF9' }}>
            {
                flag == 0 ? (
                    <div style={{ backgroundColor: '#712CF9', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: "white" }}>Login</h2>
                        {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
                        <form>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ color: "white" }} htmlFor="username">Username:</label>
                                <input type="text" id="username" value={username} style={{ width: "100%" }} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div style={{ marginBottom: '20px', alignItems: "center" }}>
                                <label style={{ color: "white" }} htmlFor="password">Password:</label>
                                <input type="password" id="password" value={password} style={{ width: "100%" }} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <Button type="button" onClick={handleLogin}>Login</Button>
                            </div>
                        </form>
                    </div>
                ) : (

                    <div style={{ backgroundColor: '#0D6BFF', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: "white" }}>User Creation</h2>

                        <form>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ color: "white" }} htmlFor="username"> User Name:</label>
                                <input type="text" id="username" value={createusername} style={{ width: "100%" }} onChange={(e) => setcreateUsername(e.target.value)} />
                            </div>
                            <div style={{ marginBottom: '20px', alignItems: "center" }}>
                                <label style={{ color: "white" }} htmlFor="password"> User Password:</label>
                                <input type="password" id="password" value={createpassword} style={{ width: "100%" }} onChange={(e) => setcreatePassword(e.target.value)} />
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <Button style={{ backgroundColor: "#712CF9" }} type="button" onClick={() => {
                                    console.log('kkkkk');
                                  const  option = {
                                        url: "",
                                        method: "POST",
                                        data: {
                                            'username': createusername,
                                            'password': createpassword,

                                        }
                                    };
                                    axios(option).then((res) => {
                                        console.log(res.data);
                                        alert(`Your user name is ${createusername} and password is ${createpassword}`)
                                    }).catch((err) => {
                                        console.log(err);
                                    })
                                }}>Create User</Button>

                                
                            </div>
                        </form>
                    </div>



                )
            }
        </div>
    );
}

export default AdminLogin;
