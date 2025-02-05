import { useEffect } from "react";
import { API_URL } from "../../../config";
import { logOut } from "../../../redux/usersRedux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert } from "react-bootstrap";

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const options = {
            method: 'DELETE',
        }
    
        fetch(`${API_URL}/api/logout`, options)
        .then(() => {
            dispatch(logOut());
            setStatus('success');
            setTimeout(() => {
                navigate('/');
            }, 2000);
        });
    }, [dispatch]);
    
    return (
        <div className="col-12 col-sm-3 mx-auto">
        { status === "success" && (<Alert variant="success">
            <Alert.Heading>Success!</Alert.Heading>
            <p>You have been sucesfully logged out!</p>
        </Alert>
        )}
        </div>
    )
}

export default Logout;