import {createSlice,configureStore} from '@reduxjs/toolkit'

const ethSlice=createSlice({
    name         :'eth',
    initialState :{
        address  :'',
        status   :'',
        loading  :false,
        balance  :0.0
    },
    reducers     :{
        setAccount:(state,action)=>{
            state.address=action.payload;
        },
        setStatus:(state,action)=>{
            state.status=action.payload
        },
        setLoading:(state,action)=>{
            state.loading=action.payload;
        },
        setBalance:(state,action)=>{
          state.balance=action.payload
        }
    }
});

const inputSlice = createSlice({
  name        :'input',
  initialState:{
    depositInput :'',
    withdrawInput:''
  },
  reducers     :{
    setDepositInput:(state,action)=>{
      state.depositInput = action.payload;
    },
    setWithdrawInput:(state,action)=>{
      state.withdrawInput=action.payload
    }
  }
});

const transactionSlice = createSlice({
  name        :'transaction',
  initialState:{loading:false},
  reducers    :{
    setTransactionState:(state,action)=>{
      state.loading = action.payload;
    }
  }
});

const senderTransactionSlice = createSlice({
  name:'senderTransaction',
  initialState:{
    senderTransactionRegister:[]
  },
  reducers:{
    addTransactionToRegister:(state,action)=>{
      state.senderTransactionRegister=action.payload;
    }
  }
})
export const {setAccount,setStatus,setBalance}  = ethSlice.actions;
export const {setDepositInput,setWithdrawInput} = inputSlice.actions;
export const {setTransactionState}              = transactionSlice.actions;
export const {addTransactionToRegister}         = senderTransactionSlice.actions;

export const store=configureStore({
    reducer:{
        eth        :ethSlice.reducer,
        input      :inputSlice.reducer,
        transaction:transactionSlice.reducer,
        register   :senderTransactionSlice.reducer
    }
})
