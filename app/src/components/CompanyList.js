import {useEffect, useState} from 'react';
import Company from './Company';
import CompanyForm from './CompanyForm';
import CompanyDetails from './CompanyDetails';
import EditCompany from './EditCompany';

import './CompanyList.css';

const SERVER = 'http://localhost:8088';

function CompanyList(props) {
    const [companies, setCompanies] = useState([]);

    const [selected, setSelected] = useState(0)

    const {item} = props;

    const getCompanies = async() =>{
        const response = await fetch(`${SERVER}/companies`)
        const data = await response.json()
        setCompanies(data);
    }

    const addCompany = async(company) => {
        await fetch(`${SERVER}/companies`, {
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(company)
        })
        getCompanies();
    }

    const editCompany = async(company) => {
        await fetch(`${SERVER}/companies/${selected}`, {
            method:'put',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(company)
        })
        getCompanies();
        window.location.reload(false);
    }

    useEffect(()=>{
        getCompanies();
    }, []);

    return(
        <div className="company-list">
            
            {
                selected !== 0 ? (
                    <div>
                    <EditCompany onUpdate={editCompany}/>
                    <CompanyDetails onCancel={() => setSelected(0)} item={companies.find(e => e.id ===selected)}/>
                    </div>
                ) : (
                    <>
                    {
                        companies.map(e =><Company key={e.id} item={e} onSelect={() => setSelected(e.id)} onCancel={() => setSelected(0)}/>)
                    }
                    <CompanyForm onAdd={addCompany}/>
                    </>
                    
                )
                
            }
        </div>
    )
}
export default CompanyList;