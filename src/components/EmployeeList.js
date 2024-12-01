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

    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleCreateEmployee = () => {
        navigate("/employees/add");
    }

    const handleEditEmployee = (id) => {
        console.log("Edit Employee ID:", id);
        navigate(`/employees/${id}`);
    }
// f and l name, email, position, salary, date of joining, department, created at, updated at
    const filteredEmployeeList = employeeList.filter((employee) => 
        (employee.employeeId?.toLowerCase().includes(searchQuery) || "") ||
        (employee.first_name?.toLowerCase().includes(searchQuery) || "") ||
        (employee.last_name?.toLowerCase().includes(searchQuery) || "") ||
        (employee.email?.toLowerCase().includes(searchQuery) || "") ||
        (employee.position?.toLowerCase().includes(searchQuery) || "") ||
        (employee.salary?.toString().includes(searchQuery) || "") ||
        (employee.date_of_joining?.toLowerCase().includes(searchQuery) || "") ||
        (employee.department?.toLowerCase().includes(searchQuery) || "") ||
        (employee.created_at?.toLowerCase().includes(searchQuery) || "") ||
        (employee.updated_at?.toLowerCase().includes(searchQuery) || "")
    );

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

                <TextField
                    label="Search"
                    variant="outlined"
                    name="searchQuery"
                    value={form.employeeId}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                        width: '100%',
                        '& .MuiOutlinedInput-input': {
                            color: 'black',
                        },
                    }}
                />
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
                    {filteredEmployeeList.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4}>No Employees Found</TableCell>
                        </TableRow>
                    ) : (
                        filteredEmployeeList.map((employee) => (
                            <TableRow key={employee._id}>
                                <TableCell>{employee.first_name} {employee.last_name}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.position}</TableCell>
                                <TableCell>{employee.department}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleEditEmployee(employee._id)}>View/Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                    </TableBody>
            </Table>
        </TableContainer>
    )
}

export default EmployeeList;