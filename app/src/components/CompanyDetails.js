import FounderList from './FounderList';
// import './CompanyDetails.css';

function CompanyDetails(props){
    const {item, onCancel} = props;
    return(
        <div>
            <div className="info">
            <p className="titlu">Compania:</p>
            <p className="nume">{item.nume}</p>
            <p className="data">{item.data}</p>
            </div>
            <div>
                <input type='button' value='Back' onClick={() => onCancel()} />
            </div>
            <FounderList companyId={item.id}/>
        </div>
    )
}

export default CompanyDetails;