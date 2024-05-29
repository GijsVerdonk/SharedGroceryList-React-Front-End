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
import RecipeFromAI from "./RecipeFromAI.jsx";
import AddListItemForm from "./AddListItemForm.jsx";
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';

export default function ListItemDataGrid() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [items, setItems] = useState([]);
    const [selectedList, setSelectedList] = useState(null);
    const accessToken = Cookies.get('accessToken');
    const [refresh, setRefresh] = useState(false);


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
    }, [refresh]);

    const handleItemDelete = (listId, itemId) => {
        axios.delete(`https://localhost:7001/api/List/${listId}/Items/${itemId}` ,{
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                console.log(response);
                handleRefresh();
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleRefresh = async () => {
        setRefresh(prev => !prev);
    }

    return (
        <div>
            <Paper sx={{ p: 3, m: 3}} elevation={3}>
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={items}
                columns={[
                    { field: 'name', headerName: 'Naam', width: 150, editable: false },
                    { field: 'quantity', headerName: 'Hoeveelheid', width: 150, editable: false },
                    {
                        renderCell: (params) => (
                            <Button onClick={() => handleItemDelete(id, params.row.id)} variant="outlined" color="error"><DeleteIcon/></Button>)
                    },
                ]}
            />
        </Box>
            </Paper>
            {/*{selectedList && <List> list={selectedList}</List>}*/}
            <Paper sx={{ p: 3, m: 3}} elevation={3}>
            <Typography sx={{ m: 3 }} variant="h4" component="h4">Voeg een nieuw item toe</Typography>
            <AddListItemForm onPostSuccess={handleRefresh}></AddListItemForm>
            </Paper>
        </div>
    );
}