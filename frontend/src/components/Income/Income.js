import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/globalContext'
import { Ar_InnerLayout } from '../../styles/arLayouts'
import IncomeForm from './IncomeForm'
import styled from 'styled-components'
import IncomeItem from './IncomeItem'
import Popup from './Popup'
import { plus, cross} from '../../utils/Icons'
import Button from '../Button/Button'
import axios from 'axios'
import ArSideNav from '../../SideBars/ArSideNav'
import jsPDF from 'jspdf';
import "jspdf-autotable";
import { dateFormat } from '../../utils/dateFormat'


function Income() {
    const {addIncome, incomes, getIncomes, deleteIncome, totalIncome, totalCashInFlow} = useGlobalContext()

    const [addIncomePopup, setAddIncomePopUp] = useState(false);

    const [incomeData,setIncomeData] = useState([]);
    const [search, setSearch] = useState([]);

    useEffect(() => {
        const fetchIncomes = async () => {
            const res = await axios.get("http://localhost:5000/api/v1/get-incomes");
            setIncomeData(res.data);
        };
        fetchIncomes()
        
    }, [incomeData]);

    const generatePDF = (income) => {

        const doc = new jsPDF();
        const tableColumn = [
            "Income ID", "Title", "Category", "Income Type", "Description", "Amount(Rs)", "Date"];
        const tableRows = [];

        incomeData.map((income) => {
            const incomesdata = [
                income._id,
                income.title,
                income.category,
                income.type,
                income.description,
                income.amount,
                dateFormat(income.date),           
                
            ];
            tableRows.push(incomesdata);
        });
        doc.text("SAP Super Finance", 70, 8).setFontSize(13);
        doc.text("Income Report", 14, 16).setFontSize(13); //report details
        doc.autoTable(tableColumn, tableRows, {
            styles: { fontSize: 6 },
            startY: 35,
        });
        doc.save("Income Details.pdf");
    };


    const handleSeachArea = (e) => {
       setSearch(e)
       console.log(search)
    }

    useEffect(() =>{
      getIncomes() 
      
    }, [])
  return (
    <IncomeStyled>        
        <div className="layer1">
            <h1>Sales & Incomes</h1>
                <Button 
                        icon={plus}
                        name={"Add Income"}
                        bPad={'.8rem 1.6rem'}
                        bRad={'30px'}
                        bg={'var(--primary-color'}
                        color={'#fff'}
                        iColor={'#fff'}                        
                        onClick={() => setAddIncomePopUp(true)}/>                        
                        <Popup trigger={addIncomePopup} setTrigger={setAddIncomePopUp}>
                            <IncomeForm></IncomeForm>
                        </Popup>   
        </div> 
         
        <Ar_InnerLayout>      
           
        <div className='wrapper'>
            {/* <img className="search-icon" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2Ljk2NiA1Ni45NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2Ljk2NiA1Ni45NjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTU1LjE0Niw1MS44ODdMNDEuNTg4LDM3Ljc4NmMzLjQ4Ni00LjE0NCw1LjM5Ni05LjM1OCw1LjM5Ni0xNC43ODZjMC0xMi42ODItMTAuMzE4LTIzLTIzLTIzcy0yMywxMC4zMTgtMjMsMjMgIHMxMC4zMTgsMjMsMjMsMjNjNC43NjEsMCw5LjI5OC0xLjQzNiwxMy4xNzctNC4xNjJsMTMuNjYxLDE0LjIwOGMwLjU3MSwwLjU5MywxLjMzOSwwLjkyLDIuMTYyLDAuOTIgIGMwLjc3OSwwLDEuNTE4LTAuMjk3LDIuMDc5LTAuODM3QzU2LjI1NSw1NC45ODIsNTYuMjkzLDUzLjA4LDU1LjE0Niw1MS44ODd6IE0yMy45ODQsNmM5LjM3NCwwLDE3LDcuNjI2LDE3LDE3cy03LjYyNiwxNy0xNywxNyAgcy0xNy03LjYyNi0xNy0xN1MxNC42MSw2LDIzLjk4NCw2eiIgZmlsbD0iIzAwMDAwMCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" /> */}
            <input className='search' type='search'  placeholder='Search' name='searchQuery' onChange={(e) => handleSeachArea(e.target.value)} />
        </div>
            <div className='totstats'>
                <h2>Total Sales:<span>$</span></h2>
                <h2>Other Incomes:<span>${totalIncome()}</span></h2>
                <h2>Total Cash Flowing In:<span>${totalCashInFlow()}</span></h2>
            </div>            
                <div className='income-content'>
                    <div>
                        <ArSideNav></ArSideNav>
                    </div>            
                        <div className='incomes'>
                            <div className='pre-text'>
                                <h1>Incomes</h1>
                                    <Button 
                                        icon={plus}
                                        name={"Generate Income Report"}
                                        bPad={'.8rem 1.6rem'}
                                        bRad={'30px'}
                                        bg={'var(--primary-color'}
                                        color={'#fff'}
                                        iColor={'#fff'}                        
                                        onClick={generatePDF}/>                  
                            </div>
                                {incomeData.filter((val)=> {
                                        if(search ==""){
                                            return val
                                        }else if(val.title.toLowerCase().includes(search.toLowerCase())){
                                            return val
                                        }
                                        }).map((income) => {
                                            const {_id, title, amount, date, category, type, description} = income;
                                            return <IncomeItem
                                            key={_id}
                                            id={_id} 
                                            title={title} 
                                            description={description} 
                                            amount={amount} 
                                            date={date} 
                                            type={type}
                                            category={category} 
                                            deleteItem={deleteIncome} />                        
                                        })}
                        </div>
                            <div className='incomes'>
                                <h1>Sales</h1>
                                {incomeData.filter((val)=> {
                                    if(search ==""){
                                        return val
                                    }else if(val.title.toLowerCase().includes(search.toLowerCase())){
                                        return val
                                    }
                                }).map((income) => {
                                        const {_id, title, amount, date, category, type, description} = income;
                                        return <IncomeItem
                                        key={_id}
                                        id={_id} 
                                        title={title} 
                                        description={description} 
                                        amount={amount} 
                                        date={date} 
                                        type={type}
                                        category={category} 
                                        deleteItem={deleteIncome} />                        
                                    })}
                    </div>                
            </div>          
        </Ar_InnerLayout>
    </IncomeStyled>
  )
}

const IncomeStyled = styled.div`
    
    display: flex;
    flex-direction: column;    
    position: relative;
    background-color: #576CBC;
    min-height: 100%;
    color: white;
    .totstats{
        justify-content: center;
        text-align: center;
        padding: 10px;
    }
    .wrapper {
    position: relative;
    display: flex;
    min-width: 300px;
    text-align: center;
    align-items: center;
    justify-content: center;
    }
    .search{
        align-items: center;
        height:35px;
        font-size:14pt;
        width: 400px;
        justify-content: center;
        border-radius: 10px;
        padding: 10px;
        text-align: left;
    }
    .search-icon {
        align-self: flex-end;
    position: absolute;
    top: 6px;
    left: 8px;
    width: 14px;
  }
    .income-content{
        display: flex;
        gap: 2rem;
        width: fit-content;
        
    }
    .layer1{
        width:50%;
        align-self: center;
        justify-content: center;
        text-align: center;
        padding: 10px;
    }
    .pre-text{
        display: flex;
        flex-direction: row;
    }
    .h1{
        color: white !important;
    }
    .incomes{
           flex:1;
           
            
        }
`

export default Income
