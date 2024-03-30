import React, { useEffect, useState } from 'react';
import { notUndefinedAndNull } from "../utils/Validations";

export default function ToastMessage(props){

    let [showValue, setShowValue] = useState(false);

    useEffect(() => {
        setShowValue(props.show)
        let timer=setTimeout(()=>{
            setShowValue(false)
            notUndefinedAndNull(props.showSet) && props.showSet(false)
        },5000);
          return () => {
            clearTimeout(timer)
            }
             // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [props.show]);

    

    function getClassName(){
        let {success} = props;
        let className = "";
        className = !success ? className.concat("error-msg") : className.concat("success-msg");
        return (showValue) ? className.concat(" active") : className.replace("active", "");
    }

    return(
        <div className={getClassName()}>{props.message}</div>
    )
}