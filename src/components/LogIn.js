import React, { useState} from "react";
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { LogInLink } from "../API.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.js";

function LogIn({}) {

  const { setIsLoggedIn } = useAuth();

    const [form, setForm] = useState({
        username: "",
        password: "",
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
          const response = await LogInLink(form);
          if (response.status === 200) {
            setIsLoggedIn(true);
            navigate("/employees");
          }
        } catch (error) {
          console.error("Log In Error:", error.response ? error.response.data : error.message);
          alert("Invalid username or password.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <Typography variant="h4">Log In</Typography>
                <TextField
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
                <Button type="submit" variant="contained">Log In</Button>
                <Button variant="contained" href="/signup">No account? Sign Up</Button>
            </Stack>
        </form>
  );
}

export default LogIn;