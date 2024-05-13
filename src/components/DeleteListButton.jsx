import {useState} from "react";
import axios from 'axios';
import Button from "@mui/material/Button";
import Cookies from 'js-cookie';
import {useParams} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete.js";

const DeleteListButton = () => {
    const { id } = useParams();
    const accessToken = Cookies.get('accessToken');

    function handleSubmit(event) {
        event.preventDefault()
        axios.delete(`https://localhost:7001/api/List/${id}` ,{
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => console.log(response))
            .catch(err=> console.log(err))
    }
        return(
            <div>
                <form onSubmit={handleSubmit}>
                    <Button type="submit"><DeleteIcon/>Verwijder lijst</Button>
                </form>
            </div>
        )
}
export default DeleteListButton;
