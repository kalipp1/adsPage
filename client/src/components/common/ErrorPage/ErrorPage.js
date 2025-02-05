import styles from './ErrorPage.module.scss';

const ErrorPage = ({ message }) => (
    <div className={styles.errorPage}>
      <h2>Error</h2>
      <p>{message}</p>
    </div>
  );
  export default ErrorPage;