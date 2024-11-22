import React from 'react'
import { cross } from '../../utils/Icons';
import Button from '../Button/Button';

function Popup(props) {
  return (props.trigger) ? (
    <div className='popup'>
       <div className='popup-inner'>
       <Button 
                icon={cross}
                name={'Close'}
                bPad={'.8rem 1.6rem'}
                bRad={'30px'}
                color={'#0B2447'}
                onClick={() => props.setTrigger(false)}
                ></Button>          
           { props.children }
        </div> 
    </div>
  ) : "";
}

export default Popup
