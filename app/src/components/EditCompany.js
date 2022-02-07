import {useState} from 'react';
import './EditCompany.css'

function EditCompany(props){
    const {onUpdate} = props;
    const [nume, setNume] = useState('');
    const [data, setData] = useState('');

    
    const editCompany = (evt) => {
        console.warn('called')
        onUpdate({
            nume,
            data
        })
    }

    return(
        <div className="company-edit-form">
            <div>Company Form</div>
            <div className="form-edit-nume">
                <input type="text" placeholder="Nume" onChange={(evt) => setNume(evt.target.value)}/>
            </div>
            <div className="form-edit-data">
                <input type="text" placeholder="Data" onChange={(evt) => setData(evt.target.value)}/>
            </div>
            <div className='add'>
                <input type='button' value='Update' onClick={editCompany}/>
            </div>
        </div>
    )
}

export default EditCompany;