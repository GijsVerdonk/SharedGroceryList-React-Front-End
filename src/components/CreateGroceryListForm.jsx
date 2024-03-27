import {useState} from "react";
import axios from 'axios';
import {useAuth0} from "@auth0/auth0-react";

const CreateGroceryListForm = () => {

    const accessToken = sessionStorage.getItem('access_token');
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
                    <label>Naam</label>
                    <input required onChange={handleInput} type="text" name="name" placeholder="Naam"/>
                    <button type="submit">Toevoegen</button>
                </form>
            </div>
        )
}
export default CreateGroceryListForm;
