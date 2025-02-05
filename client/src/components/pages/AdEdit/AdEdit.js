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
import { useParams } from "react-router-dom";
import { getAdById } from "../../../redux/advertisementsRedux";

const AdEdit = () =>{

    const { id } = useParams();
    const ad = useSelector(state => getAdById(state, id));
    const loggedUser = useSelector(getLoggedInUser);
    const dispatch = useDispatch();

    const [title, setTitle] = useState(ad.title || '');
    const [content, setContent] = useState(ad.content || '');
    const [image, setImage] = useState(ad.image || null);
    const [price, setPrice] = useState(ad.price || '');
    const [location, setLocation] = useState(ad.location || '');
    const [status, setStatus] = useState(null); //null, loading, 'success', 'serverError', 'clientError'

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
            method: 'PUT',
            body: fd
        }

        setStatus('loading');
        fetch(`${API_URL}/api/ads/${id}`, options)
            .then(res => {
                if (res.status === 200) {
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

    if (loggedUser?.login !== ad.seller.login || !ad) return <Navigate to={'/'} />;
    return (
        <Form className="col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>

            <h1 className="my-4">Edit Ad!</h1>

            { status === "success" && (<Alert variant="success">
                <Alert.Heading>Success!</Alert.Heading>
                <p>You have sucesfully edited your Ad!</p>
            </Alert>
            )}

            { status === "serverError" && (<Alert variant="danger">
                <Alert.Heading>Something went wrong ...</Alert.Heading>
                <p>Unexpected error... Try again!</p>
            </Alert>
            )}

            {status === "clientError" && (<Alert variant="danger">
                <Alert.Heading>Not enough data or data are incorrect</Alert.Heading>
                <p>If you want to change image. Photo has to be one of this type of file: *.jpg, *.jpeg, *.gif, *.png.</p>
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

export default AdEdit;