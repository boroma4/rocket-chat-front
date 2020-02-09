import React, {useEffect, useState} from 'react';
import Switch from "react-switch";


function ToggleSwitch({name,activeSwitches,handleChange}) {

    const[title,setTitle] = useState('');

    useEffect(()=>{
        let nameSplit = name.match(/([A-Z]?[^A-Z]*)/g).slice(0,-1);
        let finalTitle = '';
        if(nameSplit){
            for(let word of nameSplit){
                word = CheckIfStartsWithLower(word);
                finalTitle += (' ' + word);
            }
        }else{
            name = CheckIfStartsWithLower(name);
            finalTitle = name;
        }
        setTitle(finalTitle);
    },);

    const CheckIfStartsWithLower = (string)=>{
        let first = string.charAt(0);
        if (first === first.toLowerCase() && first !== first.toUpperCase())
        {
             return first.toUpperCase() + string.substring(1);
        }
        return string;
    };
    return (
        <>
            <div className='col-8' style={{marginRight:'5px'}}>
                {title}
            </div>
            <div className='col-2'>
                <label>
                    <Switch  onChange={()=>handleChange(name)} checked={Boolean(activeSwitches[name])}
                             onColor="#86d3ff"
                             onHandleColor="#2693e6"
                             handleDiameter={30}
                             uncheckedIcon={false}
                             checkedIcon={false}
                             boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                             activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                             height={20}
                             width={48}
                    />
                </label>
            </div>
        </>
    );
}
export default ToggleSwitch;