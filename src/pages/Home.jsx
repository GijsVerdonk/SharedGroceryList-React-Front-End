import Profile from "../components/Profile.jsx";
import CreateGroceryListForm from "../components/CreateGroceryListForm.jsx";
import UserListDataGrid from "../components/UserListDataGrid.jsx"
import RecipeFromAI from "../components/RecipeFromAI.jsx"
import Typography from "@mui/material/Typography";
import * as React from "react";

function Home() {
  return (
    <div>
        <Typography sx={{ m: 3 }} variant="h5" component="h5">Boodschappenlijsten</Typography>
        <Profile></Profile>
        <UserListDataGrid></UserListDataGrid>
        {/*<RecipeFromAI></RecipeFromAI>*/}
    </div>
  );
}

export default Home;
