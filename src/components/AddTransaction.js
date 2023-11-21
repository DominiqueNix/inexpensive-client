// import React, { useState } from "react"
import * as React from 'react';
import apiURL from "../api";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


//TODO: TYPE DROPDOWN NEEDS TO RESET
//TODO: CALENDER NEEDS TO RESET TO CURRENT DATE

export const AddTransaction =({addTrans, setAddTrans, setSuccess, success, id, categories, setCategories}) => {

    // function handleChange(e){
    //     console.log()
    //     setAddTrans({...addTrans, name: e.target.value  })
    // }

    //DATE PICKER ISN"T BEING RESET, BUT THE ACTUAL DATE IS
    //IF USER DOESN"T CAHGNE THE TYPE THEN THE TYPE WILL GO IN A S AN EMPTY STRING
    async function handleAddTransaction(e){
        e.preventDefault();
        console.log(addTrans)
        const postTrans = await fetch(`${apiURL}/addexpense`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(addTrans)
        })

        const status = postTrans.status;
        if(status === 200){
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
            }, 1000)
        }
        setAddTrans({
            type: addTrans.type,
            name:"", 
            price: "",
            date: addTrans.date,
            category: "",
            userId: id
        })

    }

    return(
        <>
        <button type="button" className=" add-exp" data-toggle="modal" data-target="#addTrans">ADD TRANSACTION</button>
                {/* ADD TRANSACTION MODAL SECTION */}
        <div className="modal fade" id="addTrans" tabIndex={-1} role="dialog">
        { success && (
                <div className="alert alert-success w-75 mx-auto mt-5" role="alert">
                     Transaction Added!
                </div>
             )} 
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="display-5">Add Transaction</h5>
                    </div>
                    <form className="form p-1 d-flex flex-column justify-content-center" onSubmit={handleAddTransaction}>
                    <div className="modal-body"> 
                        <div className="form-group p-1">
                            <label htmlFor="type">Select Type</label>
                            <select className="form-control"  id="type" name="type"
                            onChange={(e) => setAddTrans({...addTrans, type: e.target.value  })} required
                            >
                                 {/* <option value=""></option> */}
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>
                        <div className="form-group p-1">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Enter transaction name" name="name"
                            value={addTrans.name}
                            onChange={(e) => setAddTrans({...addTrans, name: e.target.value  })}
                            />
                        </div>
                        <div className="form-group p-1">
                            <label htmlFor="price">Price</label>
                            <input type="text" className="form-control" id="price" placeholder="Enter transaction price" name="price"
                            value={addTrans.price}
                            onChange={(e) => setAddTrans({...addTrans, price: e.target.value  })}
                            />
                        </div>
                        <label htmlFor='categories' className='mt-2'>Category</label>
                        <Autocomplete 
                            sx={{marginTop: "1%"}}
                            freeSolo
                            id="categories"
                            key={success}
                            // disableClearable
                            // defaultValue={null}
                            onChange={(e) => setAddTrans({...addTrans, category:e.target.textContent})}
                            options={categories}

                            // renderInput={(params) => {
                            //     <TextField 
                            //     onChange={(e) => setAddTrans({...addTrans, category: e.target.value})}
                            //     {...params}
                            //     label="Search Categories"
                            //     InputProps={{
                            //         ...params.InputProps, 
                            //         type:"search",
                            //     }}
                            //     />
                            // }}
                            renderInput={(params) => <TextField 
                                onChange={(e) => {
                                    setAddTrans({...addTrans, category: e.target.value})
                                    // console.log(e)
                            }}
                                {...params} label="Search categories" 
                                />}
                        />
                        <div className='mt-3'>
                        <label htmlFor='date'></label>
                        <LocalizationProvider  dateAdapter={AdapterDayjs}>
                            <DatePicker id="date" defaultValue={dayjs()} onChange={(e) =>{ 
                                // console.log(e)
                                setAddTrans({...addTrans, date:`${e.$y}-${e.$M+1}-${e.$D}`})
                        }}/>
                        </LocalizationProvider>
                        </div>
                        {/* <div className="form-group p-1">
                            <label htmlFor="category">Category</label>
                            <input type="text" className="form-control" id="category" placeholder="Enter transaction's category" 
                            // value={login.password}
                            // onChange={(e) => setlogin({...login, password: e.target.value})}
                            />
                        </div> */}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary">Save changes</button>
                    </div>
                    </form>
                </div>
                
            </div>
        </div>
        </>
    )
    
}