import "./Activity.css";
import { useEffect } from "react";
import { faArrowTrendDown, faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTransactionsList } from "../functions/ethereumRequest";
import { useSelector, useDispatch } from "react-redux";


function Activity() {
    const dispatch = useDispatch();
    useEffect(() => {
        getTransactionsList(dispatch);
    });
    const reg = useSelector((state) => state.register.senderTransactionRegister);
    return <div className="Activity h20">
        {
            reg.map((_, index) => {

                return <div className="ActivityCard" key={index}>
                    <div className="col-card">

                        <p className="medium white addr tlt">{_.sender}</p>

                        <div className="r">
                            <p className="regular white addr">{_.amount} <span className="bold">ETH</span></p>
                            <FontAwesomeIcon className="ec" icon={
                                (_.txName === 'withdraw') ? faArrowTrendDown : faArrowTrendUp
                            } style={
                                { marginRight: "10px", color: (_.txName === 'withdraw') ? "red" : "green" }
                            } />
                        </div>
                    </div>

                </div>
            })
        }

    </div>
}

export default Activity;
