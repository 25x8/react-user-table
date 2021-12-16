import React from 'react';
import { IUser} from "./types/types";
import  {ViewTableObserver} from "./components/View/ViewTable/ViewTable";
import { EditPanelObserver} from "./components/Edit/EditPanel/EditPanel";
import {Container, Grid} from "@mui/material";


const users: IUser[] = [
    {id: 1, name: 'India', position: 1, birthdate: Date.now(), sex: 'male', fired: false},
    {id: 2, name: 'China', position: 2, birthdate: 1403500365, sex: 'male', fired: false},
];

function App() {
    return (
        <div className="App">
            <Container maxWidth={'xl'}>
                <Grid container spacing={2}>
                    <Grid item sm={7}>
                        <ViewTableObserver users={users}/>
                    </Grid>
                    <Grid item sm={5}>
                        <EditPanelObserver users={users}/>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default App;
