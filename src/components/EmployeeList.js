import React, { useEffect, useState} from "react";
import Box from '@mui/material/Box';
import { EmployeeListLink } from "../API.js";
import { TableCell, Table, TableBody, TableContainer, TableHead, TableRow, Button, Paper, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";


function EmployeeList() {
    const [employeeList, setEmployeeList] = useState([]);
    useEffect(() => {
        const fetchEmployeeList = async () => {
            const response = await EmployeeListLink();
            setEmployeeList(response);
        }
        fetchEmployeeList();
    }, [])

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleCreateEmployee = () => {
        navigate("/employees/add");
    }

    return (
        <TableContainer component={Paper} sx={{
            width: '90%',
            margin: '0 auto',
          }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginBottom: '16px',
            }}>
                <Button variant="contained" color="primary" onClick={ handleCreateEmployee }>Create Employee</Button>

                <Box sx={{
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                }}>
                <TextField
                    label="Employee ID"
                    variant="outlined"
                    name="employee id"
                    value={form.employeeId}
                    onChange={handleChange}
                    sx={{
                        '& .MuiInputLabel-root': {
                          color: 'white',
                        },
                        '& .MuiOutlinedInput-input': {
                          color: 'white', 
                        },
                      }}
                />
                <Button variant="contained" color="primary">Search</Button>
                </Box>
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Position</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employeeList.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell>{employee.first_name} {employee.last_name}</TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell>{employee.position}</TableCell>
                            <TableCell>{employee.department}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary">View</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default EmployeeList;