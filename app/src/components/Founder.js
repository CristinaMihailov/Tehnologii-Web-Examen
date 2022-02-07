import {useState} from 'react';
import {useEffect} from 'react';
import EditFounder from './EditFounder';


import './Founder.css'

const SERVER = 'http://localhost:8088';

function Founder(props){
    const {item} = props;

    const [founders, setFounders] = useState([]);
    
    const getFounders = async() => {
        const response = await fetch(`${SERVER}/companies/${item.companyId}/founders`)
        const data =  await response.json();
        setFounders(data);
    }

    const deleteFounder = async(id) => {
        await fetch(`${SERVER}/companies/${item.companyId}/founders/${item.id}`, {
            method:'delete',
        })
        getFounders();
        window.location.reload(false);
    }

    const editFounder = async(founder) => {
        await fetch(`${SERVER}/companies/${item.companyId}/founders/${item.id}`, {
            method:'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(founder)
        })
        getFounders();
        window.location.reload(false);
    }

    useEffect(()=>{
        getFounders();
    }, []);

    return(
        <div className="founder">
            <div className="nume">
                <label>Nume: </label>
                {item.nume}
            </div>
            <div className="rol">
                <label>Rol: </label>
                {item.rol}
            </div>
            <div className='delete'>
                <input type='button' value='Delete' onClick={deleteFounder}/>
            </div>
            <EditFounder onUpdate={editFounder}/>
        </div>
    )
}

export default Founder;