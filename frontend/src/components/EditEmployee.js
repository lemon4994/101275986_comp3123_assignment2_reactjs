import React, {useEffect, useState} from "react";
import { Stack, TextField, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { FindEmployeeByIDLink, UpdateEmployeeLink, DeleteEmployeeLink } from "../API.js";
import { useAuth } from "../AuthContext.js";

function EditEmployee () {
    const [open, setOpen] = useState(false);
    const [confirmName, setConfirmName] = useState("");
    const [isConfirmed, setIsConfirmed] = useState(false);
    
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    const { id } = useParams();
    const [employee, setEmployee] = useState({});
    console.log("Employee:", employee);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await FindEmployeeByIDLink(id);
                setEmployee(response);
            } catch (error) { console.error("Find Employee By ID Error:", error.response ? error.response.data : error.message); }
        }
        fetchEmployee();
    }, [id]);

    const [form, setForm] = useState({
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        position: employee.position,
        salary: employee.salary,
        department: employee.department,
    });

    useEffect(() => {
        if (employee) {
            setForm({
                first_name: employee.first_name || '',
                last_name: employee.last_name || '',
                email: employee.email || '',
                position: employee.position || '',
                salary: employee.salary || '',
                department: employee.department || '',
            });
        }
    }, [employee]);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formSubmitted = { ...form, employeeId: id };
        console.log("Form submitted:", formSubmitted);
        try {
            const response = await UpdateEmployeeLink(formSubmitted);
            if (response.status === 200) {
                navigate("/employees");
            }
        } catch (error) { console.error("Update Employee Error:", error.response ? error.response.data : error.message); }
    };

    const handleCancel = () => {
        navigate("/employees");
    }
    /*
    const handleDelete = async (id) => {
        try { 
            const response = await DeleteEmployeeLink(id);
            if (response.status === 204) {
                navigate("/employees");
            }
        } catch (error) { console.error("Delete Employee Error:", error.response ? error.response.data : error.message); }
    }
    */
    const handleDeleteClick = () => {
        setOpen(true);
    }

    const handleDialogClose = () => {
        setOpen(false);
        setConfirmName("");
        setIsConfirmed(false);
    }
    const handleNameChange = (e) => {
        setConfirmName(e.target.value);
    }
    const handleConfirmDelete = async () => {
        if (confirmName.toLowerCase() === employee.first_name.toLowerCase()) {
            setIsConfirmed(true);
            try { 
                const response = await DeleteEmployeeLink(employee._id);
                if (response.status === 204) {
                    navigate("/employees");
                }
            } catch (error) { console.error("Delete Employee Error:", error.response ? error.response.data : error.message); }
        } else {
            alert("Name does not match. Please try again.");
        }
    }

    if (!employee) return <Typography variant="h4">Loading ...</Typography>;

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <Typography variant="h4">Editing Employee</Typography>
                <TextField
                    required
                    label="First Name"
                    variant="outlined"
                    name="first_name"
                    value={form.first_name || ''}
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
                <TextField
                    required
                    label="Last Name"
                    variant="outlined"
                    name="last_name"
                    value={form.last_name || ''}
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
                <TextField
                    required
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={form.email || ''}
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
                <TextField
                    required
                    label="Position"
                    variant="outlined"
                    name="position"
                    value={form.position || ''}
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
                <TextField
                    label="Salary"
                    variant="outlined"
                    name="salary"
                    value={form.salary || ''}
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
                
                <TextField
                    disabled
                    label="Date of Joining"
                    variant="outlined"
                    name="date_of_joining"
                    value={new Date(employee.date_of_joining).toLocaleString()}
                    sx={{
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        '& .MuiOutlinedInput-input': {
                            color: 'white',
                        },
                    }}
                />
                <TextField
                    label="Department"
                    variant="outlined"
                    name="department"
                    value={form.department || ''}
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
                <TextField
                    disabled
                    label="Created On"
                    variant="outlined"
                    name="created_on"
                    value={new Date(employee.created_at).toLocaleString()}
                    sx={{
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        '& .MuiOutlinedInput-input': {
                            color: 'white',
                        },
                    }}
                />
                <TextField
                    disabled
                    label="Updated At"
                    variant="outlined"
                    name="updated_at"
                    value={new Date().toLocaleString()}
                    sx={{
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        '& .MuiOutlinedInput-input': {
                            color: 'white',
                        },
                    }}
                />
                <Stack spacing={2} direction="row" sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                    <Button variant="contained" color="primary" onClick={handleCancel}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleDeleteClick}>Delete</Button>
                    <Button type="submit" variant="contained" color="primary">Update</Button>
                </Stack>
            </Stack>
            
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>Confirm Deletion by entering employee name</DialogTitle>
                <DialogContent>
                    <TextField
                        label="First name"
                        variant="outlined"
                        value={confirmName}
                        onChange={handleNameChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} disabled={!confirmName}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </form>
    );

}

export default EditEmployee;