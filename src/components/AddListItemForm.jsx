import {useState} from "react";
import axios from 'axios';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Cookies from 'js-cookie';
import {useParams} from "react-router-dom";

const AddListItemForm = ( {onPostSuccess} ) => {
    const { id } = useParams();
    const accessToken = Cookies.get('accessToken');
    const [item, setItem] = useState({
        name: '',
        quantity: ''
    })
    const handleInput = (event) => {
        const { name, value } = event.target;
        setItem(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    function handleSubmit(event) {
        event.preventDefault()
        axios.post(`https://localhost:7001/api/List/${id}/Items/${item.quantity}`, { name: item.name }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
            console.log(response);
            onPostSuccess();
        })
            .catch(err => {
                console.log(err);
            });
    }
        return(
            <div>
                <form onSubmit={handleSubmit}>
                    <TextField sx={{m: 2}} id="outlined-basic" label="Naam" variant="outlined" required onChange={handleInput} type="text" name="name" placeholder="Naam"/>
                    <TextField sx={{m: 2}} id="outlined-basic" label="Hoeveelheid" variant="outlined" required onChange={handleInput} type="text" name="quantity" placeholder="Hoeveelheid"/>
                    <Button sx={{m: 2}}  variant="contained" type="submit">Toevoegen</Button>
                </form>
            </div>
        )
}
export default AddListItemForm;
