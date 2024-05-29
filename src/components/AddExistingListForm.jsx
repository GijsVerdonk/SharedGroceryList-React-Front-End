import * as React from "react";
import {Input} from "@mui/material";
import Button from "@mui/material/Button";

const AddExistingListForm = () => {
        return (
            <div>
                <form>
                    <Input placeholder="0123456"></Input>
                    <Button type="submit">Koppel</Button>
                </form>
            </div>
        );
};

export default AddExistingListForm;