import {useState} from 'react';

import './Company.css';

const SERVER = 'http://localhost:8088';

function Company(props){
    const {item} = props;
    const {onSelect} = props;

    const [companies, setCompanies] = useState([]);

    const getCompanies = async() => {
        const response = await fetch(`${SERVER}/companies`);
        const data = await response.json();
        setCompanies(data);
    }

    const deleteCompanie = async(id) => {
        await fetch(`${SERVER}/companies/${item.id}`,{
            method: 'delete',
        });
        getCompanies();
        window.location.reload(false);
    }

    return(
        <div className="companie" onClick={() => onSelect(item.id)}>
            <div className="nume">
                <label>Nume: </label>
                {item.nume}
            </div>
            <div className="data">
                <label>Data: </label>
                {item.data}
            </div>
            <div className='delete'>
                <input type='button' value='Delete' onClick={deleteCompanie}/>
            </div>
            
        </div>
    )
}

export default Company;