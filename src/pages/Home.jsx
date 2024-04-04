import Profile from "../components/Profile.jsx";
import CreateGroceryListForm from "../components/CreateGroceryListForm.jsx";
import UserListDataGrid from "../components/UserListDataGrid.jsx"

function Home() {
  return (
    <div>
        <Profile></Profile>
        <UserListDataGrid></UserListDataGrid>
        <CreateGroceryListForm></CreateGroceryListForm>
    </div>
  );
}

export default Home;
