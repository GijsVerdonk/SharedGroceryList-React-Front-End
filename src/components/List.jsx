import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ListItemDataGrid from "./ListItemDataGrid.jsx";
import Typography from "@mui/material/Typography";
import DeleteListButton from "./DeleteListButton.jsx";
import * as React from "react";
import Cookies from "js-cookie";
import {Alert, Paper} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const List = () => {
  const { id } = useParams();
  const [list, setList ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

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

  useEffect(() => {
    getList();
  }, [id]);

  const handleDelete = () => {
    setList(null);
    setIsDeleted(true);
  };

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
            {/*<Paper sx={{ p: 3, m: 3}} elevation={3}>*/}
            <Typography sx={{ m: 3 }} variant="h4" component="h4">{list.name}</Typography>
            <ListItemDataGrid></ListItemDataGrid>
            {/*</Paper>*/}

            {/*<RecipeFromAI></RecipeFromAI>*/}
            <DeleteListButton onDelete={handleDelete}/>
        </div>
    );
  }

  if (isDeleted) {
      return (
          <div>
              <a style={{ textDecoration: 'none'}} href="/">
              <Alert variant="filled" severity="warning">
                  Lijst is succesvol verwijderd. Klik hier om terug te gaan naar jouw overzicht van boodschappenlijsten.
              </Alert>
              </a>
          </div>
      )
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