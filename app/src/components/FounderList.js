import {useEffect, useState} from 'react';
import Founder from './Founder';
import FounderForm from './FounderForm';

import './FounderList.css';

const SERVER = 'http://localhost:8088';

function FounderList(props) {
    const [founders, setFounders] = useState([]);

    const {companyId} = props;  
    const {item} = props;
    

    const getFounders = async() => {
        const response = await fetch(`${SERVER}/companies/${companyId}/founders`)
        const data =  await response.json();
        setFounders(data);
    }

    const addFounder = async(founder) => {
        await fetch(`${SERVER}/companies/${companyId}/founders`, {
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(founder)
        })
        getFounders();
    }

    useEffect(()=>{
        getFounders();
    }, []);

    return(
            <div className="founder-list">
            {
                founders.map(e =><Founder key={e.id} item={e}/>)
            }
             <FounderForm onAdd={addFounder}/>
            </div>
    )
}


export default FounderList;