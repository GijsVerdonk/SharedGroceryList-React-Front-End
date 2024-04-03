import Profile from "../components/Profile.jsx";
import CreateGroceryListForm from "../components/CreateGroceryListForm.jsx";
import UserGroceryLists from "../components/UserGroceryLists.jsx";

function Home() {
  return (
    <div>
        <Profile></Profile>
        <CreateGroceryListForm></CreateGroceryListForm>
        <UserGroceryLists></UserGroceryLists>
    </div>
  );
}

export default Home;
