import { useState } from 'react';
import axios from 'axios';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Input} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

function RecipeFromAI() {
    const [userMessage, setUserMessage] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [responseInvalid, setResponseInvalid] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const requestBody = {
            "messages": [
                {
                    "role": "system",
                    "content":   "Goed, voor nu is dit jouw taak: Taakomschrijving: Boodschappenlijstitems geven op basis van een recept. Voorbeelden: Voorbeeld 1: Gebruiker vraagt: Ik wil een recept voor pizza salami. Antwoord: { \"listItems\": [ \"Pizzadeeg\", \"Tomatensaus\", \"Mozzarellakaas\", \"Salami\", \"Olijfolie\", \"Knoflook\", \"Peper\", \"Zout\", \"Oregano\" ] } Voorbeeld 2: Gebruiker vraagt: Wat is de betekenis van het leven? Antwoord: Ik geef alleen items op basis van een recept. Samenvatting: Jouw taak is om de items in JSON-formaat te geven op basis van het recept dat de gebruiker geeft. Beantwoord geen andere vragen. Als er niet-gerelateerde vragen worden gesteld, stuur dan een leeg JSON-object maar met het itemList-formaat."

                },
                {
                    "role": "user",
                    "content": userMessage
                }
            ],
            "temperature": 0.7,
            "max_tokens": -1,
            "stream": false
        };
        getResponseFromAI(requestBody);
    };

        const getResponseFromAI = async (requestBody) => {

        try {
            const res = await axios.post('http://localhost:1234/v1/chat/completions', requestBody);
            const apiResponse = JSON.parse(res.data.choices[0].message.content);
            setResponse(apiResponse);
    
            if (apiResponse) {
                apiResponse.listItems.forEach(item => console.log(item));
                setResponseInvalid(false);
            } else {
                console.error('No valid response from AI.');
                setResponseInvalid(true);
            }
            } catch (error) {
                console.error('Error fetching response:', error);
                setResponseInvalid(true);
            } finally {
                setLoading(false);
            };
}


    return (
        <div>
            <Typography sx={{ m: 0 }} variant="h5" component="h5">Ik wil de producten voor het recept:</Typography>
            <form onSubmit={handleSubmit}>
                <Input
                    placeholder="recept naam"
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                />
                <Button onClick={handleSubmit} type="submit">Vraag het AI</Button>
            </form>
            {loading && <CircularProgress sx={{ m: 2 }}/>}

            {(!loading && response && !responseInvalid) && (
            <div>
                {response.listItems.map((item, index) => (
                <Typography paragraph="true" key={index}>{item}</Typography>
                ))}
                <Button>Toevoegen</Button>
            </div>
            )}
            {(!loading && responseInvalid) && (
                <div>
                    <Alert severity="error">Geen resultaat. Geef een specifiek(er) recept aan.</Alert>
                    </div>
            )        
        }
    </div>

    );
}
export default RecipeFromAI;
