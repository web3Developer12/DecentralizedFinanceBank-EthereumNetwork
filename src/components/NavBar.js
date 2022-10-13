import './NavBar.css';
import logo from "../assets/logo.svg";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorizedAccount, requestAuthorizedAccount } from '../functions/ethereumRequest';

function NavBar() {

    const dispatch = useDispatch();
    const address  = useSelector((state)=>state.eth.address);


    useEffect(()=>{
       getAuthorizedAccount(dispatch);
    });

    return <div className="NavBar row he15">
        <div className="row w14">
            <img src={logo} className="logo" alt="logo" width={20}/>
            <p>
                <span className="bold white f1_8">Ori </span>
                <span className="regular white f1_8">Bank</span>
            </p>

        </div>
        <button className='button-23 bold' onClick={()=>{
            requestAuthorizedAccount(dispatch)
        }}>

            {
                (address !== '' ?<p className='addr-text-btn'>{address}</p>:<div>
                    <FontAwesomeIcon icon={faWallet} style={{marginRight:"10px"}}/>
                    Connect wallet
                    </div>
                )
            }
        </button>
    </div>
}

export default NavBar;
