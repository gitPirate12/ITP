import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import Button from '../Button/Button'
import { plus } from '../../utils/Icons'
import { useGlobalContext } from "../../context/globalContext"
function EditExpense({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,    
    type
}) {

    const{addIncome, getIncomes, error, setError, updateExpense} = useGlobalContext() 

    const [eId, setId] = useState(id)
    const [eTitle, setETitle] = useState(title)
    const [eAmount, setEAmount] = useState(amount)
    const [eDescription, setEDescription] = useState(description)
    const [eDate, setEDate] = useState(date)
    const [eCategory, setECategory] = useState(category)
    const [eType, setEType] = useState(type)
    
        
    const handleSubmit = e =>{
        e.preventDefault()
        if(!eTitle || !eAmount === 'number' || !eType || !eDescription || !eCategory ){
            alert("All fields required!!!")
        }
        else if( !eAmount || eAmount<=0 ){
            alert("Invalid Amount!!!")
        }
        else{
        updateExpense(id, data)
        alert("Expense Updated!")
        }
    }
    
    const data = {
        _id : eId, 
        title : eTitle, 
        amount : eAmount, 
        category : eCategory, 
        description : eDescription,
        type : eType, 
        date : eDate
      }
    

   return (
    <form onSubmit={handleSubmit}>
      <div className="input-control" >
                <input
                    type="text"
                    value={eTitle}
                    name={eTitle}
                    placeholder="Expense Title"
                    onChange={(e)=> setETitle(e.target.value)}
                />                   
            </div>
            <div className="input-control">
                <input 
                    type="text"
                    value={eAmount}
                    name={eAmount}
                    placeholder={"Expense Amount"}
                    onChange={(e)=>setEAmount(e.target.value)}
                />                    
            </div>

            
            <div className="selects input-control">
                <select required value={eCategory} name={eCategory} id='category' onChange={(e)=>setECategory(e.target.value)}>
                    <option value="" disabled>Select Category</option>
                    <option value="payables">Payable</option>
                    <option value="transport">Transport</option>
                    <option value="capital">Capital Withdrawal</option>
                    <option value="interest">Interest Payment</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="selects input-control">
            <select required value={eType} name={eType} id='type' onChange={(e)=>setEType(e.target.value)}>
                <option value="" disabled>Select Type</option>
                <option value="Cash">Cash</option>
                <option value="Credit">Credit</option>
            </select>
            </div>
            <div className="input-control">
                <textarea name={eDescription} value={eDescription} placeholder='Add A Reference' id="description" cols={30} rows={4} onChange={(e)=>setEDescription(e.target.value)}></textarea>
            </div>
            <div className="submit-btn">
                <Button 
                icon={plus}
                name={'Edit Expense'}
                bPad={'.8rem 1.6rem'}
                bRad={'30px'}
                color={'#0B2447'}
                ></Button>
            </div>
    </form>
  )
}

export default EditExpense

