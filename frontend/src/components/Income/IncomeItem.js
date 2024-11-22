import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import { dateFormat } from '../../utils/dateFormat';
import Button from '../Button/Button';
import Popup from './Popup';
import { bitcoin, book, calender, edit, card, circle, clothing, comment, dollar, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt } from '../../utils/Icons';
import EditIncome from './EditIncome';
function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,    
    type}) {

     
    const [editIncomePopup, setEditIncomePopUp] = useState(false);

  return (
    
    <IncomeItemStyled>
       
        <div className='content'>
            <div className='outer-left'>
                <h5>{title}</h5>
                <p>{dollar}{amount}</p>
            </div>
            <div className='outer-right'>
                    
                        <Button 
                        icon={edit}
                        bPad={'1rem'}
                        bRad={'50%'}
                        bg={'var(--primary-color'}
                        color={'#fff'}
                        iColor={'#fff'}
                        hColor={'var(--color-green)'}
                        onClick={() => setEditIncomePopUp(true)}
                        />
                    
                    <div className='"btn-con'>
                        <Button 
                        icon={trash}
                        bPad={'1rem'}
                        bRad={'50%'}
                        bg={'var(--primary-color'}
                        color={'#fff'}
                        iColor={'#fff'}
                        hColor={'var(--color-green)'}
                        onClick={() => deleteItem(id)}/>
                    </div> 
            </div>            
                <div className='inner-content'>
                    <div className='text'>                        
                        <p>{calender}{dateFormat(date)}</p>
                        <p>
                            {comment}
                            {description}
                        </p>
                        <p>{book}{category}</p>
                        <p>{bitcoin}{type}</p>
                    </div>
                                                       
                </div> 
                <Popup trigger={editIncomePopup} setTrigger={setEditIncomePopUp}>
                        <EditIncome key={id}
                        id={id} 
                        title={title} 
                        description={description} 
                        amount={amount} 
                        date={date} 
                        type={type}
                        category={category}/>
                    </Popup>              
        </div>
       
    </IncomeItemStyled>
  )
}

const IncomeItemStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: auto;
    color: #222260;
    .outer-left{
        display: flex;
        flex-direction: row;
        align-items: start !important;
    }
    .outer-right{
        display: flex;
        flex-direction: row;
        align-items: end !important;
    }
    .icon{
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        i{
            font-size: 2.6rem;
        }
    }

    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        flex-wrap
        h5{
            font-size: 1.0rem;
            padding-left: 2rem;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                
            }
        }

        .inner-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text{
                display: flex;
                align-items: center;
                gap: 1.5rem;
                font-size: 1.0rem;
                width: fit-content;
                
                p{
                    text-align: left;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                    min-width: 50px;
                    word-wrap: break-word;
                }
                .btn-con {
                     margin-left: -5px;
                    }
            }
        }
    }
`;


export default IncomeItem
