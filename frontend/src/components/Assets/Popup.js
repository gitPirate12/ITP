import React from 'react'
import Button from '../Button/Button';


function Popup(props) {
  return (props.trigger) ? (
    <div className='popup'>
       <div className='popup-inner'>
       <Button 
                name={'Close'}
                bPad={'.6rem 1rem'}
                bRad={'25px'}
                bg={'var(--primary-color'}
                color={'#fff'}
                iColor={'#fff'}
                onClick={() => props.setTrigger(false)}
                ></Button>          
           { props.children }
        </div> 
    </div>
  ) : "";
}

export default Popup;