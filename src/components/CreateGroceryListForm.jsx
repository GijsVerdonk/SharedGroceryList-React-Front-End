import {useState} from "react";
import axios from 'axios';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Cookies from 'js-cookie';

const CreateGroceryListForm = ({ onPostSuccess }) => {

    const accessToken = Cookies.get('accessToken');
    const [list, setList] = useState({
        name: ''
    })
    const handleInput = (event) => {
        setList({...list, [event.target.name]: event.target.value})
    }

    function handleSubmit(event) {
        event.preventDefault()
        axios.post('https://localhost:7001/api/List', { name: list.name }, {
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
                    <Button sx={{m: 2}}  variant="contained" type="submit">Toevoegen</Button>
                </form>
            </div>
        )
}
export default CreateGroceryListForm;
