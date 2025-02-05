import styles from './NotFound.module.scss';

const NotFound = () =>{
    return (
        <div className={styles.notFound}>
            <img className={styles.image} src="http://localhost:8000/notFound/page-not-found-688965_1280.png" />
        </div>
    )
}

export default NotFound;