import { Alert, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { API_URL } from "../../../config";
import Spinner from 'react-bootstrap/Spinner';

const Register = () =>{

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [status, setStatus] = useState(null); //null, loading, 'success', 'serverError', 'clientError', 'loginError'

    const handleSubmit = e => {
        e.preventDefault();

        console.log(login, password, phone, avatar);

        const fd = new FormData();
        fd.append('login', login);
        fd.append('password', password);
        fd.append('phone', phone);
        fd.append('avatar', avatar);

        const options = {
            method: 'POST',
            body: fd
        }

        setStatus('loading');
        fetch(`${API_URL}/api/auth/register`, options)
            .then(res => {
                if (res.status === 201) {
                    setStatus('success');
                } else if (res.status === 409) {
                    setStatus('loginError');
                } else if (res.status === 400) {
                    setStatus('clientError');
                } else {
                    setStatus('serverError');
                }
            })
    }
    return (
        <Form className="col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>

            <h1 className="my-4">Sign Up!</h1>

            { status === "success" && (<Alert variant="success">
                <Alert.Heading>Success!</Alert.Heading>
                <p>You have been sucesfully registered! You can now log in...</p>
            </Alert>
            )}

            { status === "serverError" && (<Alert variant="danger">
                <Alert.Heading>Something went wrong ...</Alert.Heading>
                <p>Unexpected error... Try again!</p>
            </Alert>
            )}

            {status === "clientError" && (<Alert variant="danger">
                <Alert.Heading>No enough data</Alert.Heading>
                <p>You have to fill all the fields</p>
            </Alert>
            )}

            { status === "loginError" && (<Alert variant="warning">
                <Alert.Heading>Login already in use</Alert.Heading>
                <p>You have to use other login</p>
            </Alert>
            )}

            { status === "loading" && (<Spinner animation="border" role="status" className="d-block mx-auto">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            )}

            <Form.Group className="mb-3" controlId="formLogin">
                <Form.Label>Login</Form.Label>
                <Form.Control type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder="Enter login" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone number</Form.Label>
                <Form.Control type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAvatar">
                <Form.Label>Avatar</Form.Label>
                <Form.Control type="file" onChange={e => setAvatar(e.target.files[0])} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default Register;