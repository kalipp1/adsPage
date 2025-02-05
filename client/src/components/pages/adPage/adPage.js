import styles from './adPage.module.scss';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAdById } from "../../../redux/advertisementsRedux";
import { Navigate } from "react-router-dom";
import ErrorPage from '../../common/ErrorPage/ErrorPage';
import { useState } from 'react';
import { useEffect } from 'react';
import { getLoggedInUser } from '../../../redux/usersRedux';
import { faCircleXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../common/Button/Button';

const AdPage = () => {
    const { id } = useParams();
    const ad = useSelector(state => getAdById(state, id));
    const [redirect, setRedirect] = useState(false);
    const loggedUser = useSelector(getLoggedInUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!ad.seller) {
            const timer = setTimeout(() => {
                setRedirect(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [ad.seller]);

      if (redirect) {
        return <Navigate to="/" />;
    }

    if (!ad.seller){
        return <ErrorPage message="Seller not found in the database." />;
    }

    if (!ad) return <Navigate to={'/'} />;

    if (loggedUser && !ad.seller){
        return <Navigate to={'/'} />;
    }

    const formattedDate = new Date(ad.publishDate).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const handleGoToEdit = (adId) => {
        navigate(`/ads/edit/${adId}`);
    }

    const handleRemove = (adId) => {
        navigate(`/ads/remove/${adId}`);
    }
    return (
      <div className={styles.allPage}>
        <section className={styles.adSide}>
            <h1>
                {ad.title}
            </h1>
            <img className={styles.adImage} src={`http://localhost:8000/uploads/${ad.image}`} alt={ad.title} />
            <p><span className={styles.big}>Description:</span> {ad.content}</p>
            <p><span className={styles.big}>Publish Date:</span> {formattedDate}</p>
            <p><span className={styles.big}>Price:</span> {ad.price}</p>
            <p><span className={styles.big}>Location:</span> {ad.location}</p>
        </section>
        {!loggedUser && (
            <>
                <section className={styles.sellerSide}>
                    <h1>USER</h1>
                    <h3>{ad.seller.login}</h3>
                    <img className={styles.avatar} src={`http://localhost:8000/uploads/${ad.seller.avatar}`} alt={ad.seller.login} />
                    <p>phone: {ad.seller.phone}</p>
                    <p className={styles.callNow}>CALL NOW !</p>
                </section>
            </>
        )}
        {loggedUser && loggedUser.login !== ad.seller.login && (
            <>
                <section className={styles.sellerSide}>
                    <h1>USER</h1>
                    <h3>{ad.seller.login}</h3>
                    <img className={styles.avatar} src={`http://localhost:8000/uploads/${ad.seller.avatar}`} alt={ad.seller.login} />
                    <p>phone: {ad.seller.phone}</p>
                    <p className={styles.callNow}>CALL NOW !</p>
                </section>
            </>
        )}
            {loggedUser && loggedUser.login === ad.seller.login && (
                <>
                <section className={styles.ownAd}>
                <Button action={() => handleGoToEdit(ad._id)} variant={'buttonEdit'} content={<><FontAwesomeIcon icon={faPenToSquare} /> Edit</>} />
                <Button action={() => handleRemove(ad._id)} variant={'buttonRemove'} content={<><FontAwesomeIcon icon={faCircleXmark} /> Remove</>} />
                </section>
                </>
            )}
      </div>
    );
  };

  export default AdPage;