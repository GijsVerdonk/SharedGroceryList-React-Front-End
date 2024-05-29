import {useState} from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import {useParams} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete.js";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const DeleteListButton = ({ onDelete }) => {
    const { id } = useParams();
    const accessToken = Cookies.get('accessToken');

    function handleSubmit(event) {
        const confirmed = window.confirm('Weet je zeker dat je de huidige lijst wilt verwijderen?');
        if (confirmed) {
        event.preventDefault()
        axios.delete(`https://localhost:7001/api/List/${id}` ,{
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                console.log(response);
                onDelete();
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
        return(
            <div>
                <Typography sx={{ m: 3 }} variant="h5" component="h5">Lijst instellingen</Typography>
                <form onSubmit={handleSubmit}>
                    <Button type="submit"><DeleteIcon/>Verwijder lijst</Button>
                </form>
            </div>
        )
}
export default DeleteListButton;
