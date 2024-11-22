import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import ArSideNav from '../../SideBars/ArSideNav'
import { useGlobalContext } from '../../context/globalContext'
import ArChart from '../Charts/ArChart'
import ArInVsOut from '../Charts/ArInVsOut'

function HomePage() {
//Before Edit
  
const {getPurchases, totalPurchase, totalPurchaseDiscounts, getItems, totalStockValue, getIncomes, getExpenses, totalExpenses, totalIncome, grossProfit, totalCashOutFlow, totalCashInFlow} = useGlobalContext()

useEffect(()=> {
  getPurchases()
  getExpenses()
  getIncomes()
  getItems()

}, []) 
  console.log(totalPurchaseDiscounts())

  return (
    <DashboardStyled>
    <h1 align="center">All Transactions</h1>
    <div className="wrapper">
      <ArSideNav></ArSideNav>
      <div className="stats">
        <div className="stats-data-container1">
          <div className="stats-item">
            <h2 className="stats-text">
              Total Sales: <span className="stats-data">${}</span>
            </h2>
          </div>
          <div className="stats-item">
            <h2 className="stats-text">
              Total Purchases: <span className="stats-data">${totalPurchase()}</span>
            </h2>
          </div>
          <div className="stats-item">
            <h2 className="stats-text">
              Total Incomes: <span className="stats-data">${totalIncome()}</span>
            </h2>
          </div>
          <div className="stats-item">
            <h2 className="stats-text">
              Total Expenses: <span className="stats-data">${totalExpenses()}</span>
            </h2>
          </div>
          <div className="stats-item">
            <h2 className="stats-text">
              Closing Stock Value: <span className="stats-data">${totalStockValue()}</span>
            </h2>
          </div>
          </div>
          <div className='stats-data-container2'>
          <div className="stats-item">
            <h2 className="stats-text">
              Discounts Received: <span className="stats-data">${totalPurchaseDiscounts()}</span>
            </h2>
          </div>
          <div className="stats-item">
            <h2 className="stats-text">
              Total Outflow: <span className="stats-data">${totalCashOutFlow()}</span>
            </h2>
          </div>
          <div className="stats-item">
            <h2 className="stats-text">
              Total Inflow: <span className="stats-data">${totalCashInFlow()}</span>
            </h2>
          </div>
          <div className="stats-item">
            <h2 className="stats-text">
              Gross Profit: <span className="stats-data">${grossProfit()}</span>
            </h2>
          </div>
         </div>
      </div>
      <div className='chart-container'>
      <div className="chart1">
        <ArChart />
      </div>
      <div className="chart2">
        <ArInVsOut />
      </div>
      </div>
      
    </div>
  </DashboardStyled>
  )
}

const DashboardStyled = styled.div`
    
    display: flex;
    flex-direction: column;    
    position: relative;
    background-color: #576CBC ;
    
    .stats-item{
      height: 100px;
    }
    .chart1{
      height: 300px;
      width: 500px;
    }
    .chart2{
      height: 300px;
      width: 500px;
    }
    .chart-container{
      display: flex;
      flex-direction: column;
    }
    .stats-data-container {
    display: relative;
    
    
    gap: 1rem;
}
    .stats-text{
      display: flex; 
      flex-direction: row; 
      align-items: center;
    }

    .stats{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .stats-data{
      color: #0B2447;
      display: flex;
      flex-direction: column;
    }
    .wrapper {
    position: relative;
    display: flex;
    min-width: 300px;
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
    }
`

export default HomePage
