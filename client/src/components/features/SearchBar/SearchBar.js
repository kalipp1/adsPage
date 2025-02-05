import { InputGroup, Form } from 'react-bootstrap';
import { useState } from "react";
import Button from '../../common/Button/Button';
import styles from './SearchBar.module.scss';

const SearchBar = () =>{

    const [searchPhrase, setSearchPhrase] = useState('');

    const handleSearch = () => {
        window.location.href = `/ads/search/${encodeURIComponent(searchPhrase)}`;
    }; 

    return (
        <div className={styles.searchBar}>
			<InputGroup className="">
				<Form.Control
					className="shadow-none"
					type="text"
					placeholder="Search phrase..."
					value={searchPhrase}
					onChange={e => setSearchPhrase(e.target.value)}
				/>
				<Button content={'Search'} action={handleSearch} />			
			</InputGroup>
		</div>
    )
}

export default SearchBar;