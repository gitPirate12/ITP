import React, { useState } from 'react'
import Button from '../Button/Button'
import { useGlobalContext } from "../../context/globalContext"
import styled from 'styled-components'

function EditLiability({
    id,
    itemCode,
    name,
    amount,
    ratio,
    years
}) {

    const{updateLiability} = useGlobalContext() 

    const [eId, setEId] = useState(id)
    const [eItemCode, setEItemCode] = useState(itemCode)
    const [eName, setEName] = useState(name)
    const [eAmount, setEAmount] = useState(amount)
    const [eRatio, setERatio] = useState(ratio)
    const [eYears, setEYears] = useState(years)
    
    const handleInputChange = (e) =>{
        console.log(e.target.value)
        setEName(e.target.value)
    }
    
    const handleSubmit = e =>{
        e.preventDefault()
        if(!eItemCode || !eName || !eRatio || !eYears ){
            alert("All fields required!!!")
        }
        else if( !eAmount || eAmount<=0 ){
            alert("Invalid Amount!!!")
        }
        else{        
            updateLiability(id, data)
            alert("Liability Updated!")
        }
    }
    
    const data = {
        _id : eId, 
        itemCode : eItemCode, 
        name : eName, 
        amount : eAmount,
        ratio : eRatio, 
        years : eYears,
      }
       

   return (
    <LiabilityFormStyled onSubmit={handleSubmit}>
      
        <div className="input-control">
             <input type="text" value={eItemCode} name={'itemCode'} placeholder="Item Code"  onChange={(e)=> setEItemCode(e.target.value)}/>
        </div>

        <div className="input-control">
             <input type="text" value={eName} name={'name'} placeholder="Item Name"  onChange={(e)=> setEName(e.target.value)}/>
        </div>

        <div className="input-control">
            <input value={eAmount} type="text" name={'amount'} placeholder={'Liability Amount'} onChange={(e)=> setEAmount(e.target.value)} />
        </div>
            
        <div className="input-control">
            <input type="text" value={eRatio} name={'ratio'} placeholder="Item Ratio"  onChange={(e)=> setERatio(e.target.value)}/>
        </div>

        <div className="input-control">
             <input type="text" value={eYears} name={'years'} placeholder="Item keep years"  onChange={(e)=> setEYears(e.target.value)}/>
         </div>
            
        <div className="submit-btn">
            <Button 
                name={'Update Liability'}
                bPad={'.8rem 1.6rem'}
                bRad={'30px'}
                bg={'var(--color-accent'}
                color={'#fff'}
            />
        </div>  

    </LiabilityFormStyled>
  )
}

const LiabilityFormStyled = styled.form`
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

export default EditLiability;
