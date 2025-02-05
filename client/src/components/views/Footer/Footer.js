import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faSquareInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
      <div className={styles.footer}>
        <h1>AdsPageProject ©APP</h1>
        <h1>
            <a href='https://www.facebook.com/?locale=pl_PL'><FontAwesomeIcon icon={faSquareFacebook} /> </a>
            <a href='https://www.instagram.com/'><FontAwesomeIcon icon={faSquareInstagram} /> </a>
        </h1>
      </div>
    );
  };

  export default Footer;