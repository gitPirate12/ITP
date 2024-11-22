import React, { useState } from 'react'
import styled from 'styled-components'
import { dateFormat } from '../../utils/dateFormat';
import { calender, circle} from '../../utils/Icons';
import Button from '../Button/Button';
import Popup from '../Assets/Popup';
import EditAsset from '../Assets/EditAsset';



function AssetViwe({
    id,
    itemCode,
    name,
    amount,
    date,
    rValue,
    years,    
    deleteItem,
    indicatorColor,
    type
}) {

    console.log('type', type)

    const [editAssetPopup, setEditAssetPopup] = useState(false);

    return (
        <ItemStyled indicator={indicatorColor}>
            
            <div className="content">
                <h5>{name} - {itemCode}</h5>
                <p>Amount : Rs. {amount}</p>
                
                <div className="inner-content">
                    <div className="text">
                        <p>{calender} {dateFormat(date)}</p>
                        <p>{circle}Residual value :{rValue}</p> 
                        <p>{circle}Keep Years :{years}</p>
                        <p></p>
                    </div>
                    <div className="btn-con">
                        <Button 
                            name={'Edit'}
                            bPad={'0.25rem'}
                            bRad={'5px'}
                            bg={'var(--primary-color'}
                            color={'#fff'}
                            iColor={'#fff'}
                            hColor={'var(--color-green)'}
                            onClick={() => setEditAssetPopup(true)}
                        />
                    </div>
                    <div className="btn-con">
                        <Button 
                            name={'Delete'}
                            bPad={'0.25rem'}
                            bRad={'5px'}
                            bg={'red'}
                            color={'#fff'}
                            iColor={'#fff'}
                            hColor={'var(--color-green)'}
                            onClick={() => deleteItem(id)}
                        />
                    </div>
                </div>
                <Popup trigger={editAssetPopup} setTrigger={setEditAssetPopup}>
                    <EditAsset key={id} id={id} itemCode={itemCode} name={name} amount={amount} rValue={rValue} years={years}/>
                </Popup>
            </div>
        </ItemStyled>
    )
}

const ItemStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
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
        gap: .6rem;
        h5{
            font-size: 1.3rem;
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
                background: ${props => props.indicator};
            }
        }

        .inner-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text{
                display: flex;
                align-items: center;
                gap: 6rem;
                p{
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                    
                }
            }
        }
    }
`;

export default AssetViwe;