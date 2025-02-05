import styles from './AdsList.module.scss';
import { loadAdsRequest } from '../../../redux/advertisementsRedux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAds } from '../../../redux/advertisementsRedux';
import Button from '../../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const MainPage = () => {
    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(loadAdsRequest());
    },[dispatch]);

    const ads = useSelector(getAds);
    const [loading, setLoading] = useState(false);
    const [selectedAdId, setSelectedAdId] = useState(null);
    const navigate = useNavigate();

    const handleReadMore = (adId) => {
      setLoading(true);
      setSelectedAdId(adId);

      setTimeout(() => {
        navigate(`/ads/${adId}`)
      }, 1000);
    }

    return (
      <div>
        <h1>Advertisements</h1>
        <section className={styles.allAds}>
            {ads.map(ad =>
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
    );
  };

  export default MainPage;