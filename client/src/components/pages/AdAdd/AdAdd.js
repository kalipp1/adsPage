import { Alert, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { API_URL } from "../../../config";
import Spinner from 'react-bootstrap/Spinner';
import { getLoggedInUser } from "../../../redux/usersRedux";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadAdsRequest } from "../../../redux/advertisementsRedux";

const AdAdd = () =>{

    const loggedUser = useSelector(getLoggedInUser);
    console.log(loggedUser);
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState(null); //null, loading, 'success', 'serverError', 'clientError', 'loginError'

    const handleSubmit = e => {
        e.preventDefault();

        console.log(title, content, price, image, location);

        const fd = new FormData();
        fd.append('title', title);
        fd.append('content', content);
        fd.append('image', image);
        fd.append('price', price);
        fd.append('location', location);

        const options = {
            method: 'POST',
            body: fd
        }

        setStatus('loading');
        fetch(`${API_URL}/api/ads`, options)
            .then(res => {
                if (res.status === 201) {
                    setStatus('success');
                    dispatch(loadAdsRequest());
                } else if (res.status === 400) {
                    setStatus('clientError');
                } else if (res.status === 401) {
					setStatus('loginError');
                } else {
                    setStatus('serverError');
                }
            })
    }

    if (!loggedUser ) return <Navigate to={'/'} />;
    return (
        <Form className="col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>

            <h1 className="my-4">Add Ad!</h1>

            { status === "success" && (<Alert variant="success">
                <Alert.Heading>Success!</Alert.Heading>
                <p>You have sucesfully added your Ad!</p>
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
                <Alert.Heading>You are not authorised</Alert.Heading>
                <p>You need to log in!</p>
            </Alert>
            )}

            { status === "loading" && (<Spinner animation="border" role="status" className="d-block mx-auto">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            )}

            <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formContent">
                <Form.Label>Content</Form.Label>
                <Form.Control type="text" value={content} onChange={e => setContent(e.target.value)} placeholder="Enter content" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={e => setImage(e.target.files[0])} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" value={price} onChange={e => setPrice(e.target.value)} placeholder="Enter price" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Enter location" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default AdAdd;