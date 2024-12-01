import React, { useState} from "react";
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { LogInLink } from "../API.js";
import { useNavigate } from "react-router-dom";
import { CreateEmployeeLink } from "../API.js";

function CreateEmployee () {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        position: "",
        salary: "",
        date_of_joining: "",
        department: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted:", form);
        try {
            const response = await CreateEmployeeLink(form);
            if (response.status === 201) {
                navigate("/employees");
            }
        } catch (error) { console.error("Create Employee Error:", error.response ? error.response.data : error.message); }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <Typography variant="h4">Create New Employee</Typography>
                <TextField
                    required
                    label="First Name"
                    variant="outlined"
                    name="first_name"
                    value={form.first_name}
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
                    value={form.last_name}
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
                    value={form.email}
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
                    value={form.position}
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
                    value={form.salary}
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
                    label="Date of Joining"
                    variant="outlined"
                    name="date_of_joining"
                    value={form.date_of_joining}
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
                    label="Department"
                    variant="outlined"
                    name="department"
                    value={form.department}
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
                <Button type="submit" variant="contained" color="primary">Create Employee</Button>
            </Stack>
        </form>
    );

}

export default CreateEmployee;