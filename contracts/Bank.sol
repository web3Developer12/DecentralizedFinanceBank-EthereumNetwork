// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Bank {

    struct TransactionList{
        address senderAddress;
        string  transactionName;
        uint256 value;
    }
    event TRANSACTION(address indexed addr,string trName, uint trVal);

    mapping (address => uint) balances;
    TransactionList[] transactions;


    function getBalance() public view returns(uint256){
        return balances[msg.sender];
    }

    function addTransaction(address _ad,string memory _n,uint256 _v) public {
        TransactionList memory transac= TransactionList(
            _ad,_n,_v
        );
        transactions.push(transac);
    }

    function getTransaction() external view returns(TransactionList[] memory){
        return transactions;
    }

    function withdraw(address payable _to,uint256 _amount) external{
        require(_amount <= balances[msg.sender],'Not enough funds');
        balances[msg.sender]-=_amount;
        _to.transfer(_amount);
        emit TRANSACTION(msg.sender,"withdraw",_amount);
        addTransaction(msg.sender,"withdraw",_amount);
    }



    receive() external payable{

        balances[msg.sender]+=msg.value;
        emit TRANSACTION(msg.sender,"deposit",msg.value);
        addTransaction(msg.sender,"deposit",msg.value);

    }

    fallback() external payable{

    }

}
