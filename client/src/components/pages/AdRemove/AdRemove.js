import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadAdsRequest } from "../../../redux/advertisementsRedux";
import { Alert } from "react-bootstrap";
import Button from "../../common/Button/Button";
import { API_URL } from "../../../config";
import styles from './AdRemove.module.scss';

const AdRemove = () =>{

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [status, setStatus] = useState(null);

    const handleGoBack = () => {
        setStatus('loading');
        setTimeout(() => {
            navigate(`/ads/${id}`);
        }, 500);
    }

    const options = {
        method: 'DELETE'
    }

    const handleDeleteAd = () => {
        setStatus('loading');
        
        fetch(`${API_URL}/api/ads/${id}`, options)
            .then(res => {
                if (res.status === 200) {
                    setStatus('success');
                    dispatch(loadAdsRequest());
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                } else {
                    setStatus('error');
                }
            })
            .catch(() => {
                setStatus('error');
            });
    };

    return (
        <div className={styles.remove}>
            <h1>Do you want to remove this Ad?</h1>

            {status === 'success' && (
                <Alert variant="success">
                    <Alert.Heading>Ad removed successfully!</Alert.Heading>
                </Alert>
            )}
            {status === 'error' && (
                <Alert variant="danger">
                    <Alert.Heading>Something went wrong</Alert.Heading>
                    <p>There was an error while trying to remove the ad. Please try again.</p>
                </Alert>
            )} 
            <div className={styles.buttons}>
                <Button variant={'yes'} action={handleDeleteAd} content={'YES'} />
                <Button variant={'no'} action={handleGoBack} content={'NO'} />
            </div>
        </div>
    )
}

export default AdRemove;