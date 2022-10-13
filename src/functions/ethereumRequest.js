 import { setAccount, setStatus,setBalance,setTransactionState,addTransactionToRegister } from '../redux';
import {ethers} from 'ethers';
import AbiObject from '../artifacts/contracts/Bank.sol/Bank.json';
import {successToastEmit,warningToastEmit,errorToastEmit} from "./toast";


export const contractAddress='0xC09dF87c2C9cCDca843C4873Cd13E91A90eC5fd3';
export const getAuthorizedAccount = async(dispatch)=>{
    try{
        const {ethereum} = window;
        if(ethereum){
            const accounts = await ethereum.request({
                method:'eth_accounts'
            })
            if(accounts.length !==0){
                dispatch(setAccount(accounts[0]))
                dispatch(setStatus('Have Authorized Account'));
            }else{
                dispatch(setStatus('No Authorized Account'));
            }
        }else{
            errorToastEmit('Please install metamask');
            dispatch(setStatus('Please install metamask'))
        }
    }catch(error){
        dispatch(setStatus(error));
    }
}
export const requestAuthorizedAccount = async(dispatch)=>{
    try{
        const {ethereum} = window;
        if(ethereum){
            const accounts = await ethereum.request({
                method:'eth_requestAccounts'
            })
            if(accounts.length !==0){
                dispatch(setAccount(accounts[0]))
                dispatch(setStatus('Have Authorized Account'));
            }else{
                dispatch(setStatus('No Authorized Account'));
            }
        }else{
            dispatch(setStatus('Please install metamask'))
        }
    }catch(error){
        dispatch(setStatus(error));
    }
}

export const requestSenderBalance = async(dispatch)=>{
    try{
      const {ethereum}=window;
      if(ethereum){
        const provider = await new ethers.providers.Web3Provider(ethereum);
        const signer   = provider.getSigner();
        const bank_contract = new ethers.Contract(
            contractAddress,AbiObject.abi,signer
        );
        let response = await bank_contract.getBalance();
        dispatch(setBalance(response/10**18));
      }
    }catch(error){
        console.log(error);
        dispatch(setStatus(error));
    }
}

export const sendDepositTransaction = async(dispatch,_from,bank_address,amount)=>{

  try{

    dispatch(setTransactionState(true));
    const {ethereum}=window;
    if(ethereum){
      const provider = await new ethers.providers.Web3Provider(ethereum);
      const signer   = provider.getSigner();
      const tx ={
        from:_from,
        to  :bank_address,
        value:ethers.utils.parseEther(amount.toString())
      }
      const transaction = await signer.sendTransaction(tx);
      warningToastEmit('Wait for 1-5 minutes');
      await transaction.wait();
      dispatch(setTransactionState(false));
      requestSenderBalance(dispatch);
      successToastEmit("Deposit done successfully");

    }
  }catch(error){

      if(error.message.includes("insufficient funds for gas * price + value")){
          warningToastEmit('Insufficient funds');
      }else{
        errorToastEmit("Verify your information");
      }
      dispatch(setTransactionState(false));

  }
}
export const sendWithdrawTransaction = async(dispatch,_to,amount)=>{

  try{
    dispatch(setTransactionState(true));
    const {ethereum}=window;
      const provider = await new ethers.providers.Web3Provider(ethereum);
      const signer   = provider.getSigner();
      const bank_contract = new ethers.Contract(
          contractAddress,AbiObject.abi,signer
      );

      let   req = await bank_contract.withdraw(
        _to,
        ethers.utils.parseEther(amount.toString()), { gasLimit: 300000 });
      warningToastEmit('Wait for 1-5 minutes');
      await req.wait();
      dispatch(setTransactionState(false));
      requestSenderBalance(dispatch);
      successToastEmit("Transfer done successfully");
  }catch(error){
      console.log(error);
      dispatch(setTransactionState(false));
      errorToastEmit("Verify your information");

  }
}

export const getTransactionsList = async(dispatch)=>{
  try{

        const {ethereum}=window;
        if(ethereum){
          const provider = await new ethers.providers.Web3Provider(ethereum);
          const signer   = provider.getSigner();

          const bank_contract = new ethers.Contract(
              contractAddress,AbiObject.abi,signer
          );

          let register = await bank_contract.getTransaction();
          let cleaned=[];
          register.forEach(element => {
              const memoryRegister={
                sender : element.senderAddress,
                txName : element.transactionName,
                amount : Number(element.value/10**18)
              };
              cleaned.push(memoryRegister);

          });
          dispatch(addTransactionToRegister(cleaned));
        }
  }catch(error){
      console.log(error);
  }
}
