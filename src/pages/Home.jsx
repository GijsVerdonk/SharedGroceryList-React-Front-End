import Profile from "../components/Profile.jsx";
import CreateGroceryListForm from "../components/CreateGroceryListForm.jsx";
import UserListDataGrid from "../components/UserListDataGrid.jsx"
import RecipeFromAI from "../components/RecipeFromAI.jsx"

function Home() {
  return (
    <div>
        <Profile></Profile>
        <UserListDataGrid></UserListDataGrid>
        <RecipeFromAI></RecipeFromAI>
    </div>
  );
}

export default Home;
