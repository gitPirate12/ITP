import { useState } from "react"
import { useGlobalContext } from "../../context/globalContext"
import DatePicker from 'react-datepicker'
import styled from 'styled-components'
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button/Button";
import { plus } from "../../utils/Icons";
function ExpenseForm() {
    const{addExpense, getExpenses, error, setError} = useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
        type: ''
    })

    const {title, amount, date, category, description, type} = inputState;

    const handleInput = name => e =>{
        setInputState({...inputState, [name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(!title || !amount === 'number' || !type || !description || !category ||!date){
            alert("All fields required!!!")
        }
        else if( !amount || amount<=0 ){
            alert("Invalid Amount!!!")
        }
        else{
            addExpense(inputState)        
        alert("Expense Added")
        }        
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
            type: ''
        })
    }


    return(
        <FormStyled onSubmit={handleSubmit}>
             
            {error && <p className='error'>Enter Details to be added</p>}
            <div className="input-control">
                <input
                    type="text"
                    value={title}
                    name={'title'}
                    placeholder="Expense Title"
                    onChange={handleInput('title')}
                />                   
            </div>
            <div className="input-control">
                <input 
                    type="text"
                    value={amount}
                    name={'amount'}
                    placeholder={"Expense Amount"}
                    onChange={handleInput('amount')}
                />                    
            </div>

            <div className="input-control">
                <DatePicker
                id='date'
                placeholderText="Enter A Date"
                selected={date}
                dateFormat="dd/MM/yyyy"
                onChange={(date) => {
                    setInputState({...inputState, date: date})
                }}
                />
            </div>
            <div className="selects input-control">
                <select required value={category} name='category' id='category' onChange={handleInput('category')}>
                    <option value="" disabled>Select Category</option>
                    <option value="payable">Payable</option>
                    <option value="transport">Transport</option>
                    <option value="capital">Capital Withdrawal</option>
                    <option value="interest">Interest Payment</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="selects input-control">
            <select required value={type} name='type' id='type' onChange={handleInput('type')}>
                <option value="" disabled>Select Type</option>
                <option value="Cash">Cash</option>
                <option value="Credit">Credit</option>
            </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={description} placeholder='Add A Reference' id="description" cols={30} rows={4} onChange={handleInput('description')}></textarea>
            </div>
            <div className="submit-btn">
                <Button 
                icon={plus}
                name={'Add Expense'}
                bPad={'.8rem 1.6rem'}
                bRad={'30px'}
                color={'#0B2447'}
                ></Button>
            </div>
        
        </FormStyled>
    ) 
}

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #0B2447;
    padding: 5%;
    border-radius: 5%;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: white;
        resize: horizontal;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgb(0, 34, 96);
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
            color: #0B2447;
            &:focus, &:active{
                color: #0B2447;
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

export default ExpenseForm