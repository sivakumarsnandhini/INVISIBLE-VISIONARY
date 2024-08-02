import React, { useState, useEffect } from 'react'
import './style.css'
import Product_card from './Product_card'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'

export default function Mini_product_card({ product_data, full_data }) {

    const [flag, setflag] = useState(0)
    const [pro_des, setprodes] = useState('')
    const [sortedData, setSortedData] = useState(full_data);
    const [show, setshow] = useState(false)
    const [flag1, setflag1] = useState(0)
    const alan_data = useSelector((state) => state.alanreducer)
    const User_credentails = useSelector((state) => state.User_credentails)

    function pass_data(name, keyfeature, number, length) {
        if (alan_data) {
            alan_data.alaninstance.activate();
            alan_data.alaninstance.callProjectApi(name, {
                keyfeature: keyfeature,
                number: number,
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

    const handleSortLowToHigh = () => {
        setflag1(1)

        const sortedLowToHigh = [...full_data].sort((a, b) => a.price - b.price);
        setSortedData(sortedLowToHigh);
        console.log(sortedLowToHigh);

    };
    console.log(sortedData);


    const handleSorthighTolow = () => {
        setflag1(1)

        const sortedLowToHigh = [...full_data].sort((a, b) => b.price - a.price);
        setSortedData(sortedLowToHigh);


        console.log(sortedLowToHigh);
        console.log(sortedData);
        console.log(alan_data);
    };
    console.log(full_data,'&&&');

    console.log(alan_data);
    useEffect(() => {
        if (User_credentails.full_current == 'low_to_high') {
            handleSortLowToHigh()
            user_credentails('sigIn', '', 'product filter by low to high price range')
        }
        else if (User_credentails.full_current == 'high_to_low') {
            handleSorthighTolow()
            user_credentails('sigIn', '', 'product filter by high to low price range')
        }
    }, [User_credentails])
    useEffect(() => {
        let str = alan_data.page.split(' ')
        console.log(str);
        if (str[1] === 'number' && full_data.length >= Number(str[0])) {
            flag1 == 0 ?
            pass_data('listkeyfeature', `Product Name is ${full_data[Number(str[0]) - 1].product_name}, and the key feature is ${full_data[Number(str[0]) - 1].key_feature}, price ${full_data[Number(str[0]) - 1].price}`, Number(str[0]), full_data.length)
            : pass_data('listkeyfeature', `Product Name is ${sortedData[Number(str[0]) - 1].product_name}, and the key feature is ${sortedData[Number(str[0]) - 1].key_feature}, price ${sortedData[Number(str[0]) - 1].price}`, Number(str[0]), sortedData.length)
            
        } else if (str[1] === 'view_number' && full_data.length >= Number(str[0])) {
            setprodes(flag1 == 0 ? full_data[Number(str[0]) - 1] : sortedData[Number(str[0]) - 1]);
            flag1 == 0 ?
            pass_data('listkeyfeature', `Product Name is ${full_data[Number(str[0]) - 1].product_name}, and the key feature is ${full_data[Number(str[0]) - 1].key_feature}, price ${full_data[Number(str[0]) - 1].price}`, Number(str[0]), full_data.length)
            : pass_data('listkeyfeature', `Product Name is ${sortedData[Number(str[0]) - 1].product_name}, and the key feature is ${sortedData[Number(str[0]) - 1].key_feature}, price ${sortedData[Number(str[0]) - 1].price}`, Number(str[0]), sortedData.length)
            
            setflag(1)
        } else if (str[1] != undefined && str[1] != 'user') {
            pass_data('listkeyfeature', '', Number(str[0]), full_data.length)
        }
    }, [alan_data])

    let productList = flag1 === 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {full_data.map((val) => (
                <div key={val._id} className="product-card" style={{ cursor: 'pointer',  margin: '10px', maxWidth: '50rem' }} onClick={() => { setprodes(val); setflag(1) }}>
                    <div className="product-tumb">
                        <img style={{ width: '100%', height: 'auto' }} crossOrigin='anonymous' src={val.image} alt="" />
                    </div>
                    <div className="product-details">
                        <span className="product-catagory">{val.category}</span>
                        <h4><a href="">{val.product_name}</a></h4>
                        <p>{val.key_feature}</p>
                        <div className="product-bottom-details">
                            <div className="product-price"><small>{val.price + 1000}</small>{val.price}</div>
                            <div className="product-links">
                                <a className='a' href=""><i className="fa fa-heart"></i></a>
                                <a className='a' href=""><i className="fa fa-shopping-cart"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {sortedData.map((val) => (
                <div key={val._id} className="product-card" style={{ cursor: 'pointer', margin: '10px', maxWidth: '50rem' }} onClick={() => { setprodes(val); setflag(1) }}>
                    <div className="product-tumb">
                        <img style={{ width: '100%', height: 'auto' }} crossOrigin='anonymous' src={val.image} alt="" />
                    </div>
                    <div className="product-details">
                        <span className="product-catagory">{val.category}</span>
                        <h4><a href="">{val.product_name}</a></h4>
                        <p>{val.key_feature}</p>
                        <div className="product-bottom-details">
                            <div className="product-price"><small>{val.price + 1000}</small>{val.price}</div>
                            <div className="product-links">
                                <a className='a' href=""><i className="fa fa-heart"></i></a>
                                <a className='a' href=""><i className="fa fa-shopping-cart"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
    
    
    return (
        <div style={{ display: "flex" }}>
            {flag == 0 ? (
                <div style={{ display: 'flex', marginLeft: "30px" }}>
                    <div>
                        <Button style={{ width: "90px", height: "40px", marginRight: '10px' }} onClick={() => { setshow(!show) }}>
                            Filter
                        </Button>
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
                                <a onClick={handleSorthighTolow} style={{ marginTop: "10px" }} className="dropdown-item" href="#">
                                    High To Low
                                </a>
                            </div>
                        )}
                    </div>
                </div>

            ) : null
            }


            {flag === 0 ? (
                <>{productList}</>
            ) : (
                <Product_card full_data={pro_des} />
            )}
        </div>
    );
}    
