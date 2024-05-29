import Profile from "../components/Profile.jsx";
import CreateGroceryListForm from "../components/CreateGroceryListForm.jsx";
import UserListDataGrid from "../components/UserListDataGrid.jsx"
import RecipeFromAI from "../components/RecipeFromAI.jsx"
import Typography from "@mui/material/Typography";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import * as React from "react";
import {Paper} from "@mui/material";
import AddExistingList from "../components/AddExistingList.jsx";

function Home() {
  return (
    <div>
        <Paper sx={{ p: 3 }} elevation={3}>
        <Typography sx={{ m: 3 }} variant="h4" component="h4">Boodschappenlijsten</Typography>
        <Typography sx={{ m: 3 }}>Hier zijn al jouw boodschappenlijsten terug te vinden.</Typography>

        <Profile></Profile>
        <UserListDataGrid sx={{ p: 3 }} ></UserListDataGrid>
            <AddExistingList/>
        </Paper>
    </div>
  );
}

export default Home;
