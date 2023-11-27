import * as React from 'react';
import {useState} from 'react'
import {Box, styled } from '@mui/system'
import {Modal} from '@mui/base/Modal'
import apiURL from '../api';
import logo from '../logo.png'

export const Nav = ({userData, logout, id, navigate}) => {

    async function deleteUser(e){
        e.preventDefault();
        let url = `${apiURL}/users/delete/${id}`
        try{
            const deleteUser = await fetch(url, {
                method: 'DELETE'
            })
            navigate("/")
        }catch(err){
            console.log(err)
        }
        
    }

    return(
        <>
        <div className="side-nav">
            {/* <h1 className='text-center mt-1'>logo</h1> */}
            <img className='logo' src={logo} alt='website logo'/>
            <h1 className="display-6 text-center border-bottom">Welcome, {userData.username}</h1>
            <ul className='h-50 d-flex flex-column my-5'>
                <li className='my-2'><button onClick={() => navigate(`/user/${id}`)}><i className="bi bi-house"></i> Home</button></li>
                <li className='my-2'><button onClick={() => navigate(`/yearly/${id}`)}><i className="bi bi-bar-chart"></i> Yearly</button></li>
                <li className='my-2'><button onClick={(e) => logout(e)}><i className="bi bi-box-arrow-left"></i> Logout</button></li>  
                <li className='my-2'><button className='text-danger del-user' data-toggle='modal' data-target='#deleteModal'><i className="bi bi-trash"></i> Delete Account</button></li>        
            </ul>
        </div>
<div className='modal fade' id='deleteModal' role='dialog' aria-hidden='true'>
                    <div className='modal-dialog modal-dialog-centered' role='document'>
                        <div className='modal-content text-black'>
                            <div className='modal-header'>
                                <h1 className='modal-title'>Delete Account</h1>
                            </div>
                            <div className='modal-body'>
                                <p>Are you sure you want to delte your account? This action is unreversible.</p>
                            </div>
                            <div className='modal-footer'>
                                <button type="button" className='btn btn-secondary' data-dismiss="modal">Cancel</button>
                                <button type="button" className='btn btn-primary' onClick={deleteUser} data-dismiss="modal">Delete Account</button>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}