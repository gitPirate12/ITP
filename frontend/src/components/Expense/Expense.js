import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/globalContext'
import { Ar_InnerLayout } from '../../styles/arLayouts'
import ExpenseForm from './ExpenseForm'
import styled from 'styled-components'
import ExpenseItem from './ExpenseItem'
import Popup from '../Income/Popup'
import { plus, cross } from '../../utils/Icons'
import Button from '../Button/Button'
import axios from 'axios'
import ArSideNav from '../../SideBars/ArSideNav'
import PurchaseItem from './PurchaseItem'
import jsPDF from 'jspdf';
import "jspdf-autotable";
import { dateFormat } from '../../utils/dateFormat'


function Expense() {
    const {addExpense, expenses, getExpenses, deleteExpense, totalExpenses, getPurchases, purchases, totalCashOutFlow, totalPurchase, totalPurchaseDiscounts} = useGlobalContext()

    const [addExpensePopup, setAddExpensePopUp] = useState(false);
    
    const[purchaseData, setPurchaseData] = useState([]);
    const[expenseData,setExpenseData] = useState([]);
    const[search, setSearch] = useState([]);
    
    //Expense report generation
    const generateExpensePDF = (expense) => {

        const doc = new jsPDF();
        const tableColumn = [
            "Expense ID", "Title", "Category", "Expense Type", "Description", "Amount(Rs)", "Date"];
        const tableRows = [];

        expenseData.map((expense) => {
            const expensesdata = [
                expense._id,
                expense.title,
                expense.category,
                expense.type,
                expense.description,
                expense.amount,
                dateFormat(expense.date),           
                
            ];
            tableRows.push(expensesdata);
        });
        doc.text("SAP Super Finance", 70, 8).setFontSize(13);
        doc.text("Expense Report", 14, 16).setFontSize(13); //report details
        doc.autoTable(tableColumn, tableRows, {
            styles: { fontSize: 6 },
            startY: 35,
        });
        doc.save("Expense Details.pdf");
    };

    //Purchase report generation
    const generatePurchasePDF = (expense) => {

        const doc = new jsPDF();
        const tableColumn = [
            "OrderID", "SID", "Supplier Name", "Item", "Quantity", "Price(Rs)", "Discount", "Delivery Date"];
        const tableRows = [];

        purchaseData.map((purchase) => {
            const purchasesdata = [
                purchase.orderID,
                purchase.SID,
                purchase.supplierName,
                purchase.item,          
                purchase.amount,
                purchase.price,
                purchase.discount,
                dateFormat(purchase.deliverydate)                
            ];
            tableRows.push(purchasesdata);
        });
        doc.text("SAP Super Finance", 70, 8).setFontSize(13);
        doc.text("Purchases Report", 14, 16).setFontSize(13); //report details
        doc.autoTable(tableColumn, tableRows, {
            styles: { fontSize: 6 },
            startY: 35,
        });
        doc.save("Purchase Details.pdf");
    };


    //get method for expense data (search bar)
    useEffect(() => {
        const fetchExpenses = async () => {
            const res = await axios.get("http://localhost:5000/api/v1/get-expenses");
            setExpenseData(res.data);
        };
        fetchExpenses()
        
    }, [expenseData]);

    //get method for purchase data(search bar)
    useEffect(() => {
        const fetchPurchases = async () => {
            const res = await axios.get("http://localhost:5000/api/v1/getsupplyorders");
            setPurchaseData(res.data);
        };
        fetchPurchases()
        
    }, [purchaseData]);
    

    const handleSeachArea = (e) => {
       setSearch(e)
       console.log(search)
    }

    useEffect(() =>{
      getExpenses()
      getPurchases()
      
    }, [])
  return (
    <ExpenseStyled>             
        <div className="layer1">
            <h1>Purchases & Expenses</h1>
                <Button 
                        icon={plus}
                        name={"Add Expense"}
                        bPad={'.8rem 1.6rem'}
                        bRad={'30px'}
                        bg={'var(--primary-color'}
                        color={'#fff'}
                        iColor={'#fff'}                        
                        onClick={() => setAddExpensePopUp(true)}/>                        
                    <Popup trigger={addExpensePopup} setTrigger={setAddExpensePopUp}>
                        <ExpenseForm/>
                    </Popup>   
        </div> 
         
        <Ar_InnerLayout>      
           
        <div className='wrapper'>
            {/* <img className="search-icon" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2Ljk2NiA1Ni45NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2Ljk2NiA1Ni45NjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTU1LjE0Niw1MS44ODdMNDEuNTg4LDM3Ljc4NmMzLjQ4Ni00LjE0NCw1LjM5Ni05LjM1OCw1LjM5Ni0xNC43ODZjMC0xMi42ODItMTAuMzE4LTIzLTIzLTIzcy0yMywxMC4zMTgtMjMsMjMgIHMxMC4zMTgsMjMsMjMsMjNjNC43NjEsMCw5LjI5OC0xLjQzNiwxMy4xNzctNC4xNjJsMTMuNjYxLDE0LjIwOGMwLjU3MSwwLjU5MywxLjMzOSwwLjkyLDIuMTYyLDAuOTIgIGMwLjc3OSwwLDEuNTE4LTAuMjk3LDIuMDc5LTAuODM3QzU2LjI1NSw1NC45ODIsNTYuMjkzLDUzLjA4LDU1LjE0Niw1MS44ODd6IE0yMy45ODQsNmM5LjM3NCwwLDE3LDcuNjI2LDE3LDE3cy03LjYyNiwxNy0xNywxNyAgcy0xNy03LjYyNi0xNy0xN1MxNC42MSw2LDIzLjk4NCw2eiIgZmlsbD0iIzAwMDAwMCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" /> */}
            <input className='search' type='search'  placeholder='Search' name='searchQuery' color='black' onChange={(e) => handleSeachArea(e.target.value)} />
        </div>
            <div className='totstats'>
                <h2>Other Expenses: <span color='--primary-color'>${totalExpenses()}</span></h2>
                <h2>Total Purchases: <span>${totalPurchase()}</span></h2>
                <h2>Total Cash Flowing Out: <span>${totalCashOutFlow()}</span></h2>
            </div>
            <div className='income-content'>            
                <div>
                    <ArSideNav></ArSideNav>
                </div>
                    
                    <div className='incomes'>
                        <div className='pre-text'>
                                    <h1>Expenses</h1>
                                        <Button 
                                            icon={plus}
                                            name={"Generate Expense Report"}
                                            bPad={'.8rem 1.6rem'}
                                            bRad={'30px'}
                                            bg={'var(--primary-color'}
                                            color={'#fff'}
                                            iColor={'#fff'}                        
                                            onClick={generateExpensePDF}/>                  
                                </div>
                    {expenseData.filter((val)=> {
                        if(search ==""){
                            return val
                        }else if(val.title.toLowerCase().includes(search.toLowerCase())){
                            return val
                        }
                    }).map((expense) => {
                            const {_id, title, amount, date, category, type, description} = expense;
                            return <ExpenseItem
                            key={_id}
                            id={_id} 
                            title={title} 
                            description={description} 
                            amount={amount} 
                            date={date} 
                            type={type}
                            category={category} 
                            deleteItem={deleteExpense} />                        
                        })}
                    </div>
                    <div className='incomes'>
                    <div className='pre-text'>
                                    <h1>Purchases</h1>
                                        <Button 
                                            icon={plus}
                                            name={"Generate Purchase Report"}
                                            bPad={'.8rem 1.6rem'}
                                            bRad={'30px'}
                                            bg={'var(--primary-color'}
                                            color={'#fff'}
                                            iColor={'#fff'}                        
                                            onClick={generatePurchasePDF}/>                  
                                </div>
                    {purchaseData.filter((val)=> {
                        if(search ==""){
                            return val
                        }else if(val.item.toLowerCase().includes(search.toLowerCase())){
                            return val
                        }
                    }).map((purchase) => {
                            const {_id, orderID,SID,supplierName,item,amount,price,discount,deliverydate} = purchase;
                            return <PurchaseItem
                            key={_id}
                            id={_id} 
                            orderID={orderID} 
                            SID={SID} 
                            amount={amount} 
                            supplierName={supplierName} 
                            item={item}
                            price={price} 
                            discount={discount}
                            deliverydate={deliverydate}/>
                    })}
                    </div>
                
            </div>
      
    
        </Ar_InnerLayout>
    </ExpenseStyled>
  )
}

const ExpenseStyled = styled.div`
    
    display: flex;
    flex-direction: column;    
    position: relative;
    background-color: #576CBC;
    min-height: 100%;
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
        .incomes{
           flex:1;
           
            
        }
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
`

export default Expense
