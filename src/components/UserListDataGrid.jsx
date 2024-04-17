import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

export default function UserListDataGrid() {
    const navigate = useNavigate();
    const [lists, setLists] = useState([]);
    const [selectedList, setSelectedList] = useState(null);

    const getUserLists = async () => {
        const accessToken = Cookies.get('accessToken');
        console.log(`Bearer ${accessToken}`)
        const response = await fetch('https://localhost:7001/api/User/Lists', {
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

    const handleListClick = (row) => {
        setSelectedList(row);
        navigate(`/list/${row.id}`);
    }

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
                onRowClick={handleListClick}
            />
        </Box>
            {/*{selectedList && <List> list={selectedList}</List>}*/}
        </div>
    );
}