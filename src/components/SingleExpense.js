import * as React from 'react';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useState } from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import apiURL from "../api";
import { useParams } from 'react-router-dom';
export const SingleExpense =({exp, updating, setUpdating, categories, title, id, success, setSuccess}) =>{
   
    const [updateTrans, setUpdateTrans] = useState({
                                    id: exp.id, 
                                    type: exp.type,
                                    name:exp.name, 
                                    price: exp.price,
                                    date: exp.date,
                                    category: exp.category,
                                    userId: id
                                })

    //call expenses update function
    async function handleUpdateTransaction(e){
        e.preventDefault();
        try{
            const putTrans = await fetch(`${apiURL}/updateexpense`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(updateTrans)
            })
            setUpdating(false)

        }catch(err){
            console.log(err)
        }
        
    }

    //call expenses delete route
    async function handleDeleteTrans(e){
        e.preventDefault();
        try{
            const deleteTrans = await fetch(`${apiURL}/deleteexpense/${exp.id}`, {
                method: 'DELETE'
            })
            setSuccess(true)
            setTimeout(()=> {setSuccess(false)}, 1000)
        }catch(err){
            console.log(err)
        }
        
    }

    return(
        <div key={exp.id}>
                     <button className="btn each-exp" data-toggle="modal" data-target={`#${exp.id}`}>{exp.name.toUpperCase()}.....${exp.price}</button>
                     <div className="modal fade" id={`${exp.id}`} tabIndex={-1} role="dialog" aria-hidden="true">
                         <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                             {updating ? (
                                <>
                                <div className="modal-header">
                        <h5 className="display-5">Update {exp.name}</h5>
                    </div>
                                <form className="form p-1 d-flex flex-column justify-content-center" onSubmit={handleUpdateTransaction}>
                                    <div className="modal-body"> 
                                        <div className="form-group p-1">
                                            <label htmlFor="type">Select Type</label>
                                                <select className="form-control"  id="type" name="type" defaultValue={exp.type}
                                                    onChange={(e) => setUpdateTrans({...updateTrans, type: e.target.value  })}
                                                >
                                                    <option value="income">Income</option>
                                                    <option value="expense">Expense</option>
                                                </select>
                                        </div>
                                        <div className="form-group p-1">
                                            <label htmlFor="name">Name</label>
                                            <input type="text" className="form-control" id="name" placeholder="Enter transaction name" name="name"
                                                defaultValue={exp.name}
                                                // value={addTrans.name}
                                                onChange={(e) => setUpdateTrans({...updateTrans, name: e.target.value  })}
                                            />
                                        </div>
                                        <div className="form-group p-1">
                                            <label htmlFor="price">Price</label>
                                            <input type="text" className="form-control" id="price" placeholder="Enter transaction price" name="price"
                                                defaultValue={exp.price}
                                                // value={addTrans.price}
                                                onChange={(e) => setUpdateTrans({...updateTrans, price: e.target.value  })}
                                            />
                                        </div>
                                        <label htmlFor='categories' className='mt-2'>Category</label>
                                        <Autocomplete 
                                            sx={{marginTop: "1%"}}
                                            freeSolo
                                            id="categories"
                                            defaultValue={exp.category}
                                            // key={success}
                                            // disableClearable
                                            // defaultValue={null}
                                            onChange={(e) => setUpdateTrans({...updateTrans, category:e.target.textContent})}
                                            options={categories}
                                            renderInput={(params) => <TextField 
                                            onChange={(e) => {
                                                setUpdateTrans({...updateTrans, category: e.target.value})
                                                // console.log(e)
                                            }}
                                            {...params} label="Search categories" 
                                            />}
                                        />
                                        <div className='mt-3'>
                                            {/* <label htmlFor='date'>Date</label> */}
                                            <LocalizationProvider  dateAdapter={AdapterDayjs}>
                                                <DatePicker id="date" defaultValue={dayjs(exp.date)} onChange={(e) =>{                                           // console.log(e)
                                                    setUpdateTrans({...updateTrans, date:`${e.$y}-${e.$M+1}-${e.$D}`})
                                                }}/>
                                            </LocalizationProvider>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setUpdating(false)}>Cancel</button>
                                        <button type="submit" className="btn btn-primary">Save changes</button>
                                    </div>
                                </form>
                                </>
                            ):(
                                <>
                                <div className="modal-header">
                                    <h1 className="modal-title display-5">
                                        {exp.name}
                                    </h1>
                                    <button type="button" className="close btn" data-dismiss="modal">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body lh-1 p-5">
                                    <p>Type</p>
                                    <p className="border border-secondary rounded p-2">{exp.type}</p>
                                    <p>Name</p>
                                    <p className="border border-secondary rounded p-2">{exp.name}</p>
                                    <p>Price</p>
                                    <p className="border border-secondary rounded p-2">{exp.price}</p>
                                    <p>Category</p>
                                    <p className="border border-secondary rounded p-2">{exp.category}</p>
                                    <p>Date</p>
                                    <p className="border border-secondary rounded p-2">{exp.date}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={() => setUpdating(true)}>Update {title}</button>
                                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={handleDeleteTrans}>Delete {title}</button>
                                </div>
                                </>
                            )
                            }
                            </div> 
                        </div>
                    </div>
                </div>
    )
}