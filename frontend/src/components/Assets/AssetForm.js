import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';


function AssetForm() {
    const {addAssets, error, setError} = useGlobalContext()
    const [inputState, setInputState] = useState({
        itemCode:'',
        name:'',
        date:'',
        amount:'',
        rValue:'',
        years:'',
        
    })

    const { itemCode, name, date, amount, rValue, years} = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        addAssets(inputState)
        setInputState({
            itemCode:'',
            name:'',
            date:'',
            amount:'',
            rValue:'',
            years:'',
        })
    }

    return (
        <AssetFormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input type="text" value={itemCode} name={'itemCode'} placeholder="Item Code"  onChange={handleInput('itemCode')}/>
            </div>

            <div className="input-control">
                <input type="text" value={name} name={'name'} placeholder="Item Name"  onChange={handleInput('name')}/>
            </div>

            <div className="input-control">
                <input value={amount} type="text" name={'amount'} placeholder={'Asset Amount'} onChange={handleInput('amount')} />
            </div>

            <div className="input-control">
                <DatePicker 
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({...inputState, date: date})
                    }}
                />
            </div>
            
            <div className="input-control">
                <input type="text" value={rValue} name={'rValue'} placeholder="Residual value"  onChange={handleInput('rValue')}/>
            </div>

            <div className="input-control">
                <input type="text" value={years} name={'years'} placeholder="Useful Life (years)"  onChange={handleInput('years')}/>
            </div>
            
            <div className="submit-btn">
                <Button 
                    name={'Add Asset'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
        </AssetFormStyled>
    )
}


const AssetFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid ;
        background: #ffffff;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }

    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }
`;
export default AssetForm;