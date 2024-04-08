import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";

export default function UserListDataGrid() {
    const [lists, setLists] = useState([]);

    const getUserLists = async () => {
        // var accessToken = sessionStorage.getItem('access_token');
        const accessToken = Cookies.get('token');
        console.log(`Bearer ${accessToken}`)
        const response = await fetch('http://localhost:5226/api/User/Lists', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            setLists(data);
            console.log(data);
        } else {
            console.log("Error.")
        }
    };

    useEffect(() => {
        getUserLists();
    }, []);

    return (
        <div>
            <Button variant="outlined" onClick={getUserLists}>Refresh</Button>
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={lists}
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    { field: 'name', headerName: 'Naam', width: 150, editable: false },
                    { field: 'code', headerName: 'Code', width: 150, editable: false },
                    { field: 'codeActiveSince', headerName: 'CodeActiveSince', width: 150, editable: false },
                    { field: 'isActive', headerName: 'isActive', width: 150, editable: false },
                ]}
            />
        </Box>
        </div>
    );
}