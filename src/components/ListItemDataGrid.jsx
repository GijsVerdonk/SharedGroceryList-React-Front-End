import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import {useNavigate, useParams} from 'react-router-dom';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

export default function ListItemDataGrid() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [items, setItems] = useState([]);
    const [selectedList, setSelectedList] = useState(null);
    const accessToken = Cookies.get('accessToken');

    const getListItems = async () => {
        const accessToken = Cookies.get('accessToken');
        console.log(`Bearer ${accessToken}`)
        const response = await fetch(`https://localhost:7001/api/List/${id}/Items`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            const extractedData = data.map(item => ({
                id: item.item.id,
                name: item.item.name,
                quantity: item.quantity
            }));
            setItems(extractedData);

            // setItems(data);
            console.log(data);
        } else {
            setItems([])
            console.log("Error.")
        }
    };

    useEffect(() => {
        getListItems();
    }, []);

    const handleItemClick = (row) => {
        setSelectedList(row);
        navigate(`/item/${row.id}`);
    }

    const handleItemDelete = (id) => {
        axios.delete(`https://localhost:7001/api/List/${id}/Items/${id}` ,{
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => console.log(response))
            .catch(err=> console.log(err))
    }

    return (
        <div>
        <Button variant="outlined" onClick={getListItems}><RefreshIcon/> Refresh</Button>
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={items}
                columns={[
                    { field: 'name', headerName: 'Naam', width: 150, editable: false },
                    { field: 'quantity', headerName: 'Hoeveelheid', width: 150, editable: false },
                    {
                        renderCell: () => (
                            <Button onClick={() => handleItemDelete(id)}><DeleteIcon/></Button>)
                    },
                ]}
                onRowClick={handleItemClick}
            />
        </Box>
            {/*{selectedList && <List> list={selectedList}</List>}*/}
        </div>
    );
}