import {useState} from 'react';
import './CompanyForm.css'

function CompanyForm(props) {
    const {onAdd} = props;
    const [nume, setNume] = useState('');
    const [data, setData] = useState('');


    const addCompany = (evt) => {
        console.warn('called')
        onAdd({
            nume,
            data
        })
    }

    return(
        <div className="company-form">
            <div>Company Form</div>
            <div className="form-nume">
                <input type="text" placeholder="Nume" onChange={(evt) => setNume(evt.target.value)}/>
            </div>
            <div className="form-data">
                <input type="text" placeholder="Data" onChange={(evt) => setData(evt.target.value)}/>
            </div>
            <div className='add'>
                <input type='button' value='Add' onClick={addCompany}/>
            </div>
        </div>
    )

}

export default CompanyForm;