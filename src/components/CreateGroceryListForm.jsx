import {useState} from "react";
import axios from 'axios';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Cookies from 'js-cookie';

const CreateGroceryListForm = () => {

    // const accessToken = sessionStorage.getItem('access_token');
    const accessToken = Cookies.get('token');
    const [list, setList] = useState({
        name: ''
    })
    const handleInput = (event) => {
        setList({...list, [event.target.name]: event.target.value})
    }

    function handleSubmit(event) {
        event.preventDefault()
        axios.post('http://localhost:5226/api/List', { name: list.name }, {
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
                    <TextField sx={{m: 2}} id="outlined-basic" label="Naam" variant="outlined" required onChange={handleInput} type="text" name="name" placeholder="Naam"/>
                    <Button sx={{m: 2}}  variant="contained" type="submit">Toevoegen</Button>
                </form>
            </div>
        )
}
export default CreateGroceryListForm;
