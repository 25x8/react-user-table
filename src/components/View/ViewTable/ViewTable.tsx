import {FC, useState} from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    TablePagination
} from "@mui/material";
import {IColumn, IUser} from "../../../types/types";

interface ViewTableProps {
    users: IUser[];
}

const columns: IColumn[] = [
    {id: 'name', label: 'ФИО'},
    {id: 'position', label: 'Должность'},
    {
        id: 'birthdate',
        label: 'Дата рождения',
        align: 'center',
    },
    {
        id: 'sex',
        label: 'Пол',
        align: 'center',
    },
    {
        id: 'fired',
        label: 'Уволен',
        align: 'center',
    },
    {
        id: 'colleagues',
        label: 'Коллеги',
        align: 'center',
    }
];


const ViewTable: FC<ViewTableProps> = ({users}) => {

    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <TableContainer sx={{maxHeight: 440}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: IUser) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value: typeof column.id = column.id === 'birthdate' ? new Date(row[column.id]).toLocaleDateString() : row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

export default ViewTable;