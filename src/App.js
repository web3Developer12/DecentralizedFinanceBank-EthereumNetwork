import './App.css';
import NavBar from './components/NavBar';
import Activity from './components/Activity';
import PageLoader from './components/PageLoader';
import eth_logo from "./assets/ethereum.svg";
import { faArrowTrendDown,faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  requestSenderBalance,
  contractAddress,
  sendDepositTransaction,
  sendWithdrawTransaction
} from './functions/ethereumRequest.js';

import {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {setDepositInput,setWithdrawInput} from './redux';
import {MagicSpinner } from "react-spinners-kit";

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const address            = useSelector((state)=>state.eth.address);
  const status             = useSelector((state)=>state.eth.status);
  const balance            = useSelector((state)=>state.eth.balance);

  const depositInputValue  = useSelector((state)=>state.input.depositInput);
  const withdrawInputValue = useSelector((state)=>state.input.withdrawInput);
  const transactionState   = useSelector((state)=>state.transaction.loading);
  const dispatch           = useDispatch();


  useEffect(()=>{
    if(status == 'Have Authorized Account'){
      requestSenderBalance(dispatch);
    }
  });
  const controlledButton = ()=>{
    if(transactionState === true || status == 'No Authorized Account'){
      return true;
    }else{
      return false;
    }
  }
  return (
    <div className="App">
      <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
      />
      <NavBar/>
      <div className='interaction row'>


        <div className="header-text">

          <p className='white bold live'>
            <span>Live on Goerli</span>
            <span className='active-dot'></span>
          </p>

          <p className='white bold f4'>
            Start<br/>use <span className='purple'>Defi</span>
            <br/> <span className='purple'>Ori</span>Bank Dapp
          </p>
          <p className='medium white mt'>Use our decentralized bank without intermediaries</p>
        </div>

        <div className='card'>


          {transactionState ? <div className='card-loader'>
            <MagicSpinner
                size={75}
                color="rgb(153, 0, 255)"
                loading={transactionState}
            />
          </div>:''}

          <div className='card-wrapper'>

            <div className='mi mt2'>

              <div className='row'>
                <img src={eth_logo} width={14}/>
                <p className='white regular'>
                  <span className='f2 bold'>{balance} </span>
                  <span className='bold'>ETH</span>
                </p>
              </div>

              <div className='form mt2'>

                <div className='row-input' style={{marginBottom:'14px'}}>

                  <div className='col'>
                    <label className='bold white' htmlFor='deposit'>Deposit Balance</label>
                    <div className='row row-mob'>
                      <input disabled={controlledButton()} type="number" value={depositInputValue} min={1} placeholder='0.0 ETH' onChange={(e)=>{
                        dispatch(setDepositInput(e.target.value));


                      }} className='white bold'/>
                      <button disabled={controlledButton()} className='btn white bold' onClick={()=>{

                          sendDepositTransaction(
                            dispatch,address,contractAddress,depositInputValue
                          );

                          dispatch(setDepositInput(''));

                      }}>
                        <FontAwesomeIcon icon={faArrowTrendUp} style={{
                            marginRight:"12px"
                          }}/>
                          Deposit
                      </button>
                    </div>
                  </div>
                </div>

                <div className='row-input' >

                  <div className='col'>
                    <label className='bold white' htmlFor='deposit'>Withdraw ETH</label>
                    <div className='row row-mob'>
                      <input disabled={controlledButton()} type="number" value={withdrawInputValue} min={1} onChange={(e)=>{
                        dispatch(setWithdrawInput(e.target.value));
                      }} placeholder='0.0 ETH' className='white bold'/>
                      <button disabled={controlledButton()} onClick={()=>{
                        console.log('withdraw to',address);
                        sendWithdrawTransaction(
                          dispatch,address,withdrawInputValue
                        );
                        dispatch(setWithdrawInput(''));
                      }} className='btn white bold'>
                        <FontAwesomeIcon icon={faArrowTrendDown} style={{
                            marginRight:"12px"
                          }}/>
                          Withdraw
                      </button>
                    </div>
                  </div>
                </div>


              </div>
            </div>

          </div>
        </div>

      </div>
      <Activity />

    </div>
  );
}

export default App;
