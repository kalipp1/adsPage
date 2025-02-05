import styles from './Button.module.scss';
import clsx from 'clsx';

const Button = props => {
    return(
        <button className={clsx(styles.button, styles[props.variant])} onClick={props.action}>{props.content}</button>
    );
};

export default Button;