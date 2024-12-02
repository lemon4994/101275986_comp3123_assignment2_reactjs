import React, { useState} from "react";
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { SignUpLink } from "../API.js";
import { useNavigate } from "react-router-dom";

function SignUp() {

  
  const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted:", form);
        try{
            const response = await SignUpLink(form);
            if (response) {
              navigate("/");
            }
        } catch (error) {
          console.error("Sign Up Error:", error.response ? error.response.data : error.message);
          alert("Duplicate username or email.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <Typography variant="h4">Sign Up</Typography>
                <TextField
                    required
                    label="Username"
                    variant="outlined"
                    name="username"
                    value={form.username}
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
                    label="Password"
                    variant="outlined"
                    name="password"
                    type="password"
                    value={form.password}
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
                <Button type="submit" variant="contained">Sign Up</Button>
                <Button variant="contained" href="/">Have an account? Log In</Button>
            </Stack>
        </form>
  );
}

export default SignUp;