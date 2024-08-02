import React, { useEffect, useState } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';
import { useDispatch, useSelector } from 'react-redux'
import { ALANINSTANCE, USER_CREDENTAILS } from '../store/action'

export default function Alan() {
    let dispatch = useDispatch()
    const alan_data = useSelector((state) => state.alanreducer)
    const User_credentails = useSelector((state) => state.User_credentails)

    useEffect(() => {
        let alaninstanat = alanBtn({
            //key: 'ffbf190623c06bb79090da3ac12118aa2e956eca572e1d8b807a3e2338fdd0dc/stage',
            //key: '85a20aca9303e3a5b484989a96b50b122e956eca572e1d8b807a3e2338fdd0dc/stage',
            key: 'fd0ab32a2dd2c6dc56956fc3bb82416e2e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: (commandData) => {
                console.log(commandData.command);

                if (commandData.command === 'address') {
                    // Call the client code that will react to the received command
                    dispatch({ type: USER_CREDENTAILS, click: 'address', address: commandData.address })
                    dispatch({ type: ALANINSTANCE, click: 'page', page: 'address' })
                } 
                else if (commandData.command === 'wishlist_value') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: `${commandData.number}_wishlistnumber` })
                    dispatch({ type: USER_CREDENTAILS, click: 'full_current', full_current: 'wishlist_number' })
                } 
                else  if (commandData.command === 'cart_value') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: `${commandData.number}_cartnumber` })
                    dispatch({ type: USER_CREDENTAILS, click: 'full_current', full_current: 'cart_number' })
                } 
                else if (commandData.command === 'yearly') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: `yearly` })
                    dispatch({ type: USER_CREDENTAILS, click: 'full_current', full_current: 'yearly' })
                }
               else if (commandData.command === 'monthly') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: `monthly` })
                    dispatch({ type: USER_CREDENTAILS, click: 'full_current', full_current: 'monthly' })
                }
             else  if (commandData.command === 'weekly') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: `weekly` })
                    dispatch({ type: USER_CREDENTAILS, click: 'full_current', full_current: 'weekly' })
                }
                else if (commandData.command === 'high_to_low') {
                    // Call the client code that will react to the received command
                    dispatch({ type: USER_CREDENTAILS, click: 'full_current', full_current: 'high_to_low' })
                }
                else if (commandData.command === 'low_to_high') {
                    // Call the client code that will react to the received command
                    dispatch({ type: USER_CREDENTAILS, click: 'full_current', full_current: 'low_to_high' })
                } 
                else if (commandData.command === 'helppage') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: 'helppage' })
                }

                else if (commandData.command === 'accountpage') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: 'accountpage' })
                }
                else if (commandData.command === 'save_bank_details') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: 'save_bank_details' })
                }
                else if (commandData.command === 'openbank') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: `openbank` })
                }
                else if (commandData.command === 'bank_details') {
                    if (commandData.field === 'bank_name') {
                        dispatch({ type: USER_CREDENTAILS, click: 'user_name', user_name: commandData.bank_name })
                        dispatch({ type: ALANINSTANCE, click: 'page', page: 'bank_name' })
                    } else if (commandData.field === 'account_number') {
                        dispatch({ type: USER_CREDENTAILS, click: 'mail', mail: commandData.account_number })
                        dispatch({ type: ALANINSTANCE, click: 'page', page: 'account_number' })
                    }
                }
                else if (commandData.command === 'return') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: 'return' })
                    dispatch({ type: USER_CREDENTAILS, click: 'full_current', full_current: `${commandData.number}` })
                }
                else if (commandData.command === 'review_one') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: 'review_one' })
                    dispatch({ type: USER_CREDENTAILS, click: 'full_current', full_current: `${commandData.number}` })
                }
                else if (commandData.command === 'post_review') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: `post_review` })
                }
                else if (commandData.command === 'review') {
                    // Call the client code that will react to the received command
                    dispatch({ type: USER_CREDENTAILS, click: 'review', review: commandData.review })
                    dispatch({ type: ALANINSTANCE, click: 'page', page: `review` })
                }
                else if (commandData.command === 'start') {
                    // Call the client code that will react to the received command
                    dispatch({ type: USER_CREDENTAILS, click: 'start', start: commandData.number })
                    dispatch({ type: ALANINSTANCE, click: 'page', page: `start` })
                }
                else if (commandData.command === 'close_review') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: `close_review` })
                }
                else if (commandData.command === 'write_review') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: `write_review` })
                }
                else if (commandData.command === 'remove_number') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: `${commandData.number} remove_number` })
                }
                else if (commandData.command === 'place_order') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: 'place_order' })
                }
                else if (commandData.command === 'scan_face') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: 'scan_face' })
                }
                else if (commandData.command === 'buy') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: 'buy' })
                }
                else if (commandData.command === 'bank_credentails') {
                    if (commandData.field === 'bank_name') {
                        dispatch({ type: USER_CREDENTAILS, click: 'user_name', user_name: commandData.bank_name })
                        dispatch({ type: ALANINSTANCE, click: 'page', page: 'bank_name' })
                    } else if (commandData.field === 'account_number') {
                        dispatch({ type: USER_CREDENTAILS, click: 'mail', mail: commandData.account_number })
                        dispatch({ type: ALANINSTANCE, click: 'page', page: 'account_number' })
                    }
                }
                else if (commandData.command === 'homepage') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: 'homepage' })
                }
                else if (commandData.command === 'wishlistpage') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: 'wishlistpage' })
                }
                else if (commandData.command === 'orderspage') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: 'orderspage' })
                }
                else if (commandData.command === 'cartpage') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: 'cartpage' })
                }
                else if (commandData.command === 'wishlistitemcount') {
                    // Call the client code that will react to the received command
                    dispatch({ type: USER_CREDENTAILS, click: 'wishlist', wishlist: commandData.data })
                    dispatch({ type: ALANINSTANCE, click: 'page', page: 'wishlist' })
                }
                else if (commandData.command === 'wishlist') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: 'wishlist' })
                }
                else if (commandData.command === 'itemcount') {
                    // Call the client code that will react to the received command
                    dispatch({ type: USER_CREDENTAILS, click: 'cart', cart: commandData.data })
                    dispatch({ type: ALANINSTANCE, click: 'page', page: 'cart' })
                }
                else if (commandData.command === 'cart') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: 'cart' })
                }
                else if (commandData.command === 'search product') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'search_value', search_value: commandData.value })
                    dispatch({ type: USER_CREDENTAILS, click: 'full_current', full_current: 'search' })
                } else if (commandData.command === 'logout') {
                    dispatch({ type: ALANINSTANCE, click: 'page', page: `${commandData.command}` })
                    dispatch({ type: ALANINSTANCE, click: 'search_value', search_value: '' })
                    dispatch({ type: USER_CREDENTAILS, click: 'full_current', full_current: 'logout' })
                } else if (commandData.command === 'signin user' || commandData.command === 'login user') {
                    if (window.location.pathname === '/sign-up') {
                        console.log(commandData.command);
                        if (commandData.command === 'signin user') {
                            dispatch({ type: ALANINSTANCE, click: 'page', page: `${commandData.command}` })
                        } else if (commandData.command === 'login user') {
                            dispatch({ type: ALANINSTANCE, click: 'page', page: `${commandData.command}` })
                        }
                    } else {
                        dispatch({ type: USER_CREDENTAILS, click: 'page', page: 'mainpage' })
                    }
                    dispatch({ type: ALANINSTANCE, click: 'search_value', search_value: '' })
                } else if (commandData.command === 'user_credentails') {
                    // Call the client code that will react to the received command
                    if (window.location.pathname === '/sign-up') {
                        if (commandData.field === 'user_name') {
                            dispatch({ type: USER_CREDENTAILS, click: 'user_name', user_name: commandData.user_name })
                            dispatch({ type: USER_CREDENTAILS, click: 'page', page: 'sign-up' })
                            dispatch({ type: USER_CREDENTAILS, click: 'current', current: 'user_name' })
                        } else if (commandData.field === 'mail') {
                            dispatch({ type: USER_CREDENTAILS, click: 'mail', mail: commandData.mail })
                            dispatch({ type: USER_CREDENTAILS, click: 'page', page: 'sign-up' })
                            dispatch({ type: USER_CREDENTAILS, click: 'current', current: 'mail' })
                        } else if (commandData.field === 'password') {
                            dispatch({ type: USER_CREDENTAILS, click: 'password', password: commandData.password })
                            dispatch({ type: USER_CREDENTAILS, click: 'page', page: 'sign-up' })
                            dispatch({ type: USER_CREDENTAILS, click: 'current', current: 'password' })
                        }
                    } else {
                        dispatch({ type: USER_CREDENTAILS, click: 'page', page: 'mainpage' })
                    }
                    dispatch({ type: ALANINSTANCE, click: 'search_value', search_value: '' })
                } else if (commandData.command === 'view_number') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: `${commandData.number} view_number` })
                    dispatch({ type: USER_CREDENTAILS, click: 'full_current', full_current: 'view_number' })
                } else if (commandData.command === 'number') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: `${commandData.number} number` })
                    dispatch({ type: USER_CREDENTAILS, click: 'full_current', full_current: 'number' })
                } else if (commandData.command === 'search') {
                    dispatch({ type: ALANINSTANCE, click: 'page', page: commandData.brand })
                    dispatch({ type: ALANINSTANCE, click: 'search_value', search_value: '' })
                    dispatch({ type: USER_CREDENTAILS, click: 'full_current', full_current: 'brand' })
                } else if (commandData.command === 'signin') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: 'signin' })
                    dispatch({ type: USER_CREDENTAILS, click: 'type', val: 'signin' })
                    dispatch({ type: ALANINSTANCE, click: 'search_value', search_value: '' })
                    dispatch({ type: USER_CREDENTAILS, click: 'full_current', full_current: 'sigin' })
                } else if (commandData.command === 'login') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: 'login' })
                    dispatch({ type: USER_CREDENTAILS, click: 'type', val: 'login' })
                    dispatch({ type: ALANINSTANCE, click: 'search_value', search_value: '' })
                    dispatch({ type: USER_CREDENTAILS, click: 'full_current', full_current: 'login' })
                } else if (commandData.command === 'category') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: 'category' })
                    dispatch({ type: ALANINSTANCE, click: 'search_value', search_value: '' })
                    dispatch({ type: USER_CREDENTAILS, click: 'full_current', full_current: 'category' })
                } else if (commandData.command === 'mobile' || 'tv' || 'furniture' || 'cloth' || 'shoe') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: commandData.command })
                    dispatch({ type: ALANINSTANCE, click: 'search_value', search_value: '' })
                    dispatch({ type: USER_CREDENTAILS, click: 'full_current', full_current: 'brandcategory' })
                } else if (commandData.command === 'all_mobile_brands' || 'all_tv_brands' || 'all_furniture_brands' || 'all_cloth_brands' || 'all_shoe_brands') {
                    // Call the client code that will react to the received command
                    dispatch({ type: ALANINSTANCE, click: 'page', page: commandData.command })
                    dispatch({ type: ALANINSTANCE, click: 'search_value', search_value: '' })
                    dispatch({ type: USER_CREDENTAILS, click: 'full_current', full_current: 'listbrandname' })
                }
            }
        })

        dispatch({ type: ALANINSTANCE, click: 'alaninstance', data: alaninstanat })

    }, [])
    return null
}
