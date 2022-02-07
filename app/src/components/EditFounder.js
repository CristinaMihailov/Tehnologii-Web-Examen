import {useState} from 'react';
import './EditFounder.css'

function EditFounder(props){
    const {onUpdate} = props;
    const [nume, setNume] = useState('');
    const [rol, setRol] = useState('');

    const options = [{
        label: 'CEO',
        value: 'CEO'
    }, {
        label: 'CTO',
        value: 'CTO'
    }, {
        label: 'CFO',
        value: 'CFO'
    },{
        label: 'CIO',
        value: 'CIO'
    },{
        label: 'COO',
        value: 'COO'
    },{
        label: 'CMO',
        value: 'CMO'
    }]
    

    const editFounder = (evt) => {
        console.warn('called')
        onUpdate({
            nume, 
            rol
        })
    }

    return(
        <div className="founder-edit-form">
            <p>Founder Edit</p>
            <div className="edit-nume">
                <input type="text" placeholder="Nume" onChange={(evt) => setNume(evt.target.value)}/>
            </div>
            <div className="edit-rol">
               <select onChange={(evt) => setRol(evt.target.value)}>
                   {options.map((option) => (
                       <option key={option.key} value={option.value}>{option.label}</option>
                   ))}
               </select>
            </div>
            <div className='add'>
                <input type='button' value='Update' onClick={editFounder}/>
            </div>
        </div>
    )

}

export default EditFounder;