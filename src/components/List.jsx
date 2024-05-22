import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ListItemDataGrid from "./ListItemDataGrid.jsx";
import AddListItemForm from "./AddListItemForm.jsx";
import Typography from "@mui/material/Typography";
import DeleteListButton from "./DeleteListButton.jsx";
import RecipeFromAI from "./RecipeFromAI.jsx";
import * as React from "react";

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

            <RecipeFromAI></RecipeFromAI>
            <DeleteListButton></DeleteListButton>
        </div>
    );
  }

    return (
        <div>
        <h1>Lijst niet gevonden.</h1>
            <RecipeFromAI></RecipeFromAI>
      </div>
  );
};

export default List;