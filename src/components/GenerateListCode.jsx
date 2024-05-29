import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {Route, Routes, useParams} from "react-router-dom";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Home from "../pages/Home.jsx";
import List from "./List.jsx";
import Item from "./Item.jsx";
import LoginButton from "./LoginButton.jsx";

const GenerateListCode = () => {
    const { id } = useParams();
    const [list, setList ] = useState(null);
    const [loading, setLoading] = useState(true);

    const accessToken = Cookies.get('accessToken');
    const getList = async () => {
        const response = await fetch(`https://localhost:7001/api/List/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        setLoading(true);
        if (response.ok) {
            const data = await response.json();
            setList(data);
            console.log(data);
            setLoading(false);
        } else {
            console.log("Error.")
            setLoading(false);
        }
    };

    useEffect(() => {
        getList();
    }, [id]);


        const getNewRandomCode = async () => {
            setLoading(true);
            const response = await fetch(`https://localhost:7001/api/List/NewCode/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.ok) {
                setLoading(false);
            } else {
                setLoading(false);
                console.log("Error.")
            }
            getList();
        };

    if (loading) {
        return(
            <div>
                <CircularProgress/>
            </div>
        )
    }

        return (
            <div>
                    <Typography sx={{fontWeight: 'bold'}}>Huidige koppelcode:</Typography>
                    {list.code && list.code.length > 0 ? (
                        <Typography>{list.code}</Typography>
                    ) : (
                        <Typography>Geen koppelcode ingesteld.</Typography>
                    )}

                    <Button sx={{ m: 3 }} onClick={getNewRandomCode} variant="contained" >Genereer nieuw code</Button>
            </div>
        );
};

export default GenerateListCode;