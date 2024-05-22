import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import RefreshIcon from "@mui/icons-material/Refresh";
import CreateGroceryListForm from "./CreateGroceryListForm.jsx";
import DeleteIcon from "@mui/icons-material/Delete.js";

export default function UserListDataGrid() {
    const navigate = useNavigate();
    const [lists, setLists] = useState([]);
    const [selectedList, setSelectedList] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const getUserLists = async (token) => {
        console.log(`Bearer ${token}`)
        const response = await fetch('https://localhost:7001/api/User/Lists', {
            headers: {
                'Authorization': `Bearer ${token}`
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
        const accessToken = Cookies.get('accessToken');

        if (accessToken) {
            getUserLists(accessToken);
        }
    }, [Cookies.get('accessToken'), refresh]);

    const handleListClick = (row) => {
        setSelectedList(row);
        navigate(`/list/${row.id}`);
    }

    const handleRefresh = async () => {
        setRefresh(prev => !prev);
    }

    return (
        <div>
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={lists}
                columns={[
                    { field: 'id', headerName: 'ID', width: 90 },
                    { field: 'name', headerName: 'Naam', width: 150, editable: false },
                ]}
                onRowClick={handleListClick}
            />
        </Box>
            {/*{selectedList && <List> list={selectedList}</List>}*/}
            <CreateGroceryListForm onPostSuccess={handleRefresh}></CreateGroceryListForm>

        </div>
    );
}