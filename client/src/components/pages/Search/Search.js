import styles from './Search.module.scss';
import { getAdSearched } from '../../../redux/advertisementsRedux';
import { useSelector } from 'react-redux';
import { Alert, Spinner } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import Button from '../../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadAdsRequest } from '../../../redux/advertisementsRedux';

const Search = () =>{

    const [loading, setLoading] = useState(false);
    const [selectedAdId, setSelectedAdId] = useState(null);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAdsRequest());
    }, [dispatch]);

    const handleReadMore = (adId) => {
      setLoading(true);
      setSelectedAdId(adId);

      setTimeout(() => {
        navigate(`/ads/${adId}`)
      }, 1000);
    }

    const { searchPhrase } = useParams();
    const adsSearched = useSelector((state) => getAdSearched(state, searchPhrase));

    console.log('Search phrase:', searchPhrase);
    console.log('Filtered ads:', adsSearched);

    const allAds = useSelector(state => state.advertisements.data);
    console.log('All ads:', allAds);

    return (
        <div>
            {!adsSearched.length &&
                <Alert>
                    <Alert.Heading>Nothing maches with your search request...</Alert.Heading>
                </Alert> 
            }
            <section className={styles.allAds}>
                {adsSearched.map(ad =>
                    <article className={styles.singleAd}>
                    <h3 className={styles.adTitle}>{ad.title}</h3>
                        <div className={styles.info}>
                        <img className={styles.adImage} src={`http://localhost:8000/uploads/${ad.image}`} alt={ad.title} />
                        <p className={styles.adLocation}>Location: {ad.location}</p>
                        </div>
                        {loading && selectedAdId === ad._id ? (
                            <div className={styles.loading}>
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                                <p>Loading...</p>
                            </div>
                    ) : (
                            <Button action={() => handleReadMore(ad._id)} content={'Read more'} />
                            )}
                    </article>
                )}
            </section>
    </div>
    )
}

export default Search;