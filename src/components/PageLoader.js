import { useEffect,useState } from "react";
import {MagicSpinner } from "react-spinners-kit";
import $ from 'jquery';
import "./PageLoader.css";

function PageLoader({duration}){

    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false);
            $(".PageLoader").fadeOut("slow");
        },duration);
    });
    return <div className="PageLoader">

        <MagicSpinner
            size={100}
            color="rgb(153, 0, 255)"
            loading={loading}
        />
    </div>
}
export default PageLoader;
