import { useState } from 'react';
import axios from 'axios';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Input} from "@mui/material";

function RecipeFromAI() {
    const [userMessage, setUserMessage] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const requestBody = {
            "messages": [
                {
                    "role": "system",
                    "content": "Okay for now this is your job: Job description: Giving grocery list items based on a recipe. Examples: Example 1: User asks: I want a recipe for pizza salami. Response: { \"listItems\": [ \"Pizza Dough\", \"Tomato Sauce\", \"Mozzarella Cheese (shredded)\", \"Salami (sliced)\", \"Olive Oil\", \"Garlic (minced or crushed)\", \"Optional: Pepper, Salt, Herbs like Basil or Oregano\" ] } Example 2: User asks: What is the meaning of live? Response: I only give items based on a recipe. Summary: You job is to give the items in a json format based on the recipe that the user gives. Answer no other questions. If non related questions are asked, send an empty json object. but with the itemList format."
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

        try {
            const res = await axios.post('http://localhost:1234/v1/chat/completions', requestBody);
            console.log('Response:', res.data.choices[0].message.content);
            setResponse(res.data.choices[0].message.content);
            response.listItems.forEach(item => {
                console.log(item);
            });
        } catch (error) {
            console.error('Error fetching response:', error);
        } finally {
            setLoading(false);
        }
    };
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


            {loading && <p>Loading...</p>}
        </div>

    );
}
export default RecipeFromAI;
