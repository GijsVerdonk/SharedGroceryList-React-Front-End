import {Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import AddExistingListForm from "./AddExistingListForm.jsx";

const AddExistingList = () => {
        return (
            <div>
                <Paper sx={{ p: 3, m: 3}} elevation={3}>
                    <Typography sx={{ m: 3 }} variant="h4" component="h4">Voeg een bestaande lijst toe</Typography>
                    <Typography>Voer de koppelcode van een bestaande lijst in.</Typography>
                    <AddExistingListForm/>
                </Paper>
            </div>
        );
};

export default AddExistingList;