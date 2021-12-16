import {FC, useEffect, useState} from "react";
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Grid,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
    Checkbox,
    OutlinedInput,
    SelectChangeEvent,
    Chip
} from '@mui/material';
import {IUser} from "../../../types/types";
import {observer} from "mobx-react-lite";
import {positionsStore} from "../../../store/Positions";


interface EditPanelProps {
    users: IUser[];
}

const EditPanel: FC<EditPanelProps> = ({users=[]}) => {
    const [position, setPosition] = useState<string>('');
    const [fired, setFired] = useState<boolean>(false);
    const [personName, setPersonName] = useState<string[]>([]);

    const handleChangePosition = (event: any) => {
        setPosition(event.target.value);
    };

    const handleChangeFired = (event: any) => {
        setFired(event.target.checked)
    }

    useEffect(() => {
        positionsStore.getPositions();
    }, []);



    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const { target: {value},} = event;
        setPersonName(typeof value === 'string' ? value.split(',') : value,);
    };

    return (

        positionsStore.isLoading
            ? <div>Загрузка...</div>
            : <Grid container rowSpacing={2}>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        label="ФИО"
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="select-position-label">Должность</InputLabel>
                        <Select
                            labelId="select-position-label"
                            id="select-position"
                            value={position}
                            label="Должность"
                            onChange={handleChangePosition}
                        >
                            {
                                positionsStore.list.map(position => <MenuItem key={position.id} value={position.id}>{position.value}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <FormControl component={'fieldset'}>
                        <FormLabel component={'legend'}>Пол</FormLabel>
                        <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                            <FormControlLabel value="female" control={<Radio/>} label="Женский"/>
                            <FormControlLabel value="male" control={<Radio/>} label="Мужской"/>
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={fired}
                                    onChange={handleChangeFired}
                                    inputProps={{'aria-label': 'controlled'}}
                                    name={'hired'}
                                />
                            }
                            label="Уволен"
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-multiple-chip-label">Коллеги</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Коллеги"/>}
                            renderValue={(selected) => (
                                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value}/>
                                    ))}
                                </Box>
                            )}
                        >
                            {users.map(({name}) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

            </Grid>

    )
}

export const EditPanelObserver = observer(EditPanel);