import styles from './NavBar.module.scss';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faHouse, faPlus, faRightFromBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { getLoggedInUser } from '../../../redux/usersRedux';


const NavBar = () => {
    const location = useLocation();
    const loggedUser = useSelector(getLoggedInUser);

    return (
        <Navbar className={clsx(styles.navbar)}>
        <Container>
          <Navbar.Brand><span className={styles.logo}>adsPG</span></Navbar.Brand>
          <Nav className={styles.nav}>
            <Nav.Link className={clsx(styles.link, location.pathname==="/"&& styles.linkActive)} as={NavLink} to="/">
                <FontAwesomeIcon icon={faHouse} /> Home
            </Nav.Link>
            {!loggedUser && (
                <>
                <Nav.Link className={clsx(styles.link, location.pathname==="/login"&& styles.linkActive)} as={NavLink} to="/login">
                    <FontAwesomeIcon icon={faRightFromBracket} /> Sign In
                </Nav.Link>
                <Nav.Link className={clsx(styles.link, location.pathname==="/register"&& styles.linkActive)} as={NavLink} to="/register">
                    <FontAwesomeIcon icon={faUserPlus} /> Sign Up
                </Nav.Link>  
                </>
            )} 
            {loggedUser && (
                <>
                <Nav.Link className={clsx(styles.link, location.pathname==="/ad/add"&& styles.linkActive)} as={NavLink} to="/ads/add">
                    <FontAwesomeIcon icon={faPlus} /> Add Ad
                </Nav.Link>
                <Nav.Link className={clsx(styles.link, location.pathname==="/logout"&& styles.linkActive)} as={NavLink} to="/logout">
                    <FontAwesomeIcon icon={faCircleXmark} /> Log Out
                </Nav.Link>
                </>
            )}
          </Nav>
        </Container>
      </Navbar>
    );
  };

  export default NavBar;