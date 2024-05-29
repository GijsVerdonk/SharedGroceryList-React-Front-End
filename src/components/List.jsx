import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ListItemDataGrid from "./ListItemDataGrid.jsx";
import Typography from "@mui/material/Typography";
import DeleteListButton from "./DeleteListButton.jsx";
import * as React from "react";
import Cookies from "js-cookie";
import {Alert} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const List = () => {
  const { id } = useParams();
  const [list, setList ] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const accessToken = Cookies.get('accessToken');
    const getList = async () => {
      const response = await fetch(`https://localhost:7001/api/List/${id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setLoading(true);
      if (response.ok) {
        const data = await response.json();
        setList(data);
        console.log(data);
        setLoading(false);
      } else {
        console.log("Error.")
        setLoading(false);
      }
    };

    getList();
  }, []);

  if (loading) {
    return (
        <div>
          <CircularProgress sx={{ m: 2 }}/>
        </div>
    )
  }

  if (list && !loading) {
    return (
        <div>

            <Typography sx={{ m: 3 }} variant="h5" component="h5">{list.name}</Typography>
            <ListItemDataGrid></ListItemDataGrid>

            {/*<RecipeFromAI></RecipeFromAI>*/}
            <DeleteListButton></DeleteListButton>
        </div>
    );
  }

    return (
        <div>
          <Alert variant="filled" severity="error">
            Lijst is niet gevonden.
          </Alert>
      </div>
  );
};

export default List;