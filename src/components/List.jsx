import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ListItemDataGrid from "./ListItemDataGrid.jsx";
import AddListItemForm from "./AddListItemForm.jsx";
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from "@mui/material/Button";
import DeleteListButton from "./DeleteListButton.jsx";

const List = () => {
  const { id } = useParams();
  const [list, setList ] = useState(null);

  useEffect(() => {
    const getList = async () => {
      const response = await fetch(`https://localhost:7001/api/List/${id}`);
      if (response.ok) {
        const data = await response.json();
        setList(data);
        console.log(data);
      } else {
        console.log("Error.")
      }
    };

    getList();
  }, []);

  if (list) {
    return (
        <div>

            <Typography sx={{ m: 3 }} variant="h5" component="h5">{list.name}</Typography>
            <ListItemDataGrid></ListItemDataGrid>
            <AddListItemForm></AddListItemForm>
            <DeleteListButton></DeleteListButton>
        </div>
    );
  }

    return (
        <div>
        <h1>Lijst niet gevonden.</h1>
      </div>
  );
};

export default List;