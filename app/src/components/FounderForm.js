import {useState} from 'react';
import './FounderForm.css'

function FounderForm(props){
    const {onAdd} = props;
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

    const addFounder = (evt) => {
        console.warn('called')
        onAdd({
            nume, 
            rol
        })
    }

    return(
        <div className="founder-form">
            <p>Founder Form</p>
            <div className="nume">
                <input type="text" placeholder="Nume" onChange={(evt) => setNume(evt.target.value)}/>
            </div>
            <div className="rol">
               <select onChange={(evt) => setRol(evt.target.value)}>
                   {options.map((option) => (
                       <option key={option.key} value={option.value}>{option.label}</option>
                   ))}
               </select>
            </div>
            <div className='add'>
                <input type='button' value='Add' onClick={addFounder}/>
            </div>
        </div>
    )

}

export default FounderForm;