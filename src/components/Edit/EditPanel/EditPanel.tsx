import {FC, useState} from "react";
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

const positions: string[] = ['HR', 'Разработчик', 'Генеральный'];

interface EditPanelProps {
    users: IUser[];
}

export const EditPanel: FC<EditPanelProps> = ({users}) => {

    const [position, setPosition] = useState<string>('');
    const [fired, setFired] = useState<boolean>(false);
    const [personName, setPersonName] = useState<string[]>([]);

    const handleChangePosition = (event: any) => {
        setPosition(event.target.value);
    };

    const handleChangeFired = (event: any) => {
        setFired(event.target.checked)
    }



    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <Grid container rowSpacing={2}>

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
                            positions.map(position => <MenuItem value={position}>{position}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl component={'fieldset'}>
                    <FormLabel component={'legend'}>Пол</FormLabel>
                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                        <FormControlLabel value="female" control={<Radio />} label="Женский" />
                        <FormControlLabel value="male" control={<Radio />} label="Мужской" />
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
                                inputProps={{ 'aria-label': 'controlled' }}
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
                        input={<OutlinedInput id="select-multiple-chip" label="Коллеги" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
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