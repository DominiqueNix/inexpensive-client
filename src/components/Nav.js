import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const Nav = ({userData, logout, view, setView, months}) => {
    return(
        <div className="navbar navbar-light m-3 rounded-pill ">
            <div className="d-flex justify-content-between w-100">
                <p className="navbar-brand  m-2">WELCOME, {userData.username}</p>
                <div className='d-flex flex-row px-4'>
                     {/* <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="select-view-label">View</InputLabel>
                        <Select
                        labelId="select-view-label"
                        id="select-view"
                        value={view}
                        label="View"
                        onChange={(e) => setView(e.target.value)}
                        >
                        {months.map(ele => (
                            <MenuItem value={ele}>{ele}</MenuItem>
                        ))} */}
                        {/* <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem> */}
                        {/* </Select>
                    </FormControl>
                </Box> */}
                <button className="btn log-out p-2 m-2 display-4" onClick={logout}>Log Out</button>
                </div>
               
            </div>
        </div>
    )
}