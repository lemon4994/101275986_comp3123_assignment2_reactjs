import { useAuth } from "../AuthContext.js";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
    const { isLoggedIn, setIsLoggedIn } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate("/");
    }

    if (!isLoggedIn) {
        return null;
    }
    return (
        <Button onClick={ handleLogout }>Logout</Button>
    )

}

export default LogoutButton;