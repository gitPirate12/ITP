import React, { useContext, useState } from "react"

import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [purchases, setPurchases] = useState([])
    const [items, setItems] = useState([])
    const [error, setError] = useState(null)
    //assets and liabilities
    const [assets, setAsset] = useState([])
    const [liabilities, setLiabilities] = useState([])

    //method to add an income to the database
    const addIncome = async(income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
        .catch((err) => {
            setError(err.response.data.message)
        })
        getIncomes()
    }
    //method to get all incomes from the database
    const getIncomes = async() => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        
    }

    //method to add an income to the database
    const deleteIncome = async(id) => {
        const res = await axios.delete(`${BASE_URL}delete-income/${id}`)        
        getIncomes()
        alert("Income Deleted")
    }

    const updateIncome = async(id, update) => {
        console.log({update})
        const response = await axios.put(`${BASE_URL}update-income/${id}`, update)
        getIncomes()
        
    }

    //calculating total income
    const totalIncome= () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })
        return totalIncome;
    }

    //---------------------Expenses Section-----------------------

    //adding an expense to the database
    const addExpense = async (expense) => {
        const response = await axios.post(`${BASE_URL}add-expense`, expense)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }
    //getting expenses from db
    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }
    //deleting expense from db
    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }
    //updating expense
    const updateExpense = async(id, update) => {
        const response = await axios.put(`${BASE_URL}update-expense/${id}`, update)
        console.log(response)
        getExpenses()
        
    }

    //calculating total expenses
    const totalExpenses = () => {
        let totalExpense = 0;
        expenses.forEach((expense) =>{
            totalExpense = totalExpense + expense.amount
        })
        
        return totalExpense;
    }

    //calculating total purchases(supply)

    const getPurchases = async () => {
        const response = await axios.get(`${BASE_URL}getsupplyorders`)
        setPurchases(response.data)
        console.log(response.data)
    }

    const totalPurchase = () => {
        let totalPurchase = 0;
        purchases.forEach((purchase) =>{
            totalPurchase = totalPurchase + (purchase.amount*purchase.price)
        })      
        totalPurchase = totalPurchase - totalPurchaseDiscounts()
        return totalPurchase;
    }

    const totalPurchaseDiscounts = () => {
        let totalPurchaseDiscounts = 0;
        purchases.forEach((purchase) =>{
          totalPurchaseDiscounts = totalPurchaseDiscounts + (parseInt(purchase.discount)*purchase.amount)
      })      
      return totalPurchaseDiscounts;
    }

    //calculating item related computations

    const getItems = async () => {
        const response = await axios.get(`${BASE_URL}get-items`)
        setItems(response.data)
        console.log(response.data)
    }

    const totalStockValue = () => {
        let totalStockValue = 0;
        items.forEach((items) =>{
            totalStockValue = totalStockValue + (items.price*items.quantity)
        })
        return totalStockValue;
    }

    //total cash outflow
    const totalCashOutFlow = () => {
        let totalCashOutFlow = 0
        totalCashOutFlow = totalCashOutFlow + totalPurchase() + totalExpenses()
        return totalCashOutFlow
      }
    
      //total cash outflow
    const totalCashInFlow = () => {
        let totalCashInFlow = 0
        totalCashInFlow = totalCashInFlow + totalIncome()
        return totalCashInFlow
      }
    

    //calculating Gross Profit
    const grossProfit = () => {
        let grossProfit = 0;
        grossProfit = totalPurchase() - totalStockValue();
        return grossProfit;
    }
    
    //-------------------------------------------ASSETS AND LIABILITIES--------------------------//
    //calculate Assets
    const addAssets = async (asset) => {
        const response = await axios.post(`${BASE_URL}add-assets`, asset)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getAssets()
    }

    const getAssets = async () => {
        const response = await axios.get(`${BASE_URL}get-assets`)
        setAsset(response.data)
        console.log(response.data)
    }

    const updateAsset = async(id, update) => {
        console.log({update})
        const response = await axios.put(`${BASE_URL}update-asset/${id}`, update)
        getAssets()   
    }

    const deleteAssets = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-assets/${id}`)
        getAssets()
    }
//Get total valu
    const totalAssets = () => {
        let totalAsset = 0;
        assets.forEach((asset) =>{
            totalAsset = totalAsset + asset.amount
        })

        return totalAsset;
    }
  
//Depreciation
    const totalDepreciation = () => {
        let totalDep= 0;
        assets.forEach((asset) =>{
            const dep = (asset.amount - asset.rValue) / asset.years;
            totalDep += parseFloat(dep.toFixed(2));
        })

        return totalDep;
    }

    //calculate liabilities
    const addLiability = async (liability) => {
        const response = await axios.post(`${BASE_URL}add-liability`, liability)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getLiabilities()
    }

    const getLiabilities = async () => {
        const response = await axios.get(`${BASE_URL}get-liabilities`)
        setLiabilities(response.data)
        console.log(response.data)
    }

    const updateLiability = async(id, update) => {
        console.log({update})
        const response = await axios.put(`${BASE_URL}update-liability/${id}`, update)
        getLiabilities()   
    }

    const deleteLiability  = async (id) => {
        const res = await axios.delete(`${BASE_URL}delete-liability/${id}`)
        getLiabilities()
    }
//Get total
    const totalLiabilities = () => {
        let totalLiability  = 0;
        liabilities.forEach((liability) =>{
            totalLiability  = totalLiability  + liability.amount
        })

        return totalLiability ;
    }
//calculate Interest
    const totalInterest =()=>{
        let interest = 0;
        liabilities.forEach((liability)=>{
            const rate = (liability.amount * liability.ratio * liability.years) / 100;
            interest += parseFloat(rate.toFixed(2));
        })
        return interest;
    }
    

    return(
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            error,
            setError,
            deleteIncome,
            totalIncome,
            BASE_URL,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            expenses,
            updateIncome,
            updateExpense,
            getPurchases,
            totalPurchase,
            getItems,
            totalStockValue,
            purchases,
            totalPurchaseDiscounts,
            grossProfit,
            totalCashOutFlow,
            totalCashInFlow,
            assets,
            addAssets,
            getAssets,
            updateAsset,
            deleteAssets,
            totalAssets,
            totalDepreciation,
            liabilities,
            addLiability ,
            getLiabilities,
            updateLiability,
            deleteLiability ,
            totalLiabilities,
            totalInterest
                    

        }}>
        {children}
        </GlobalContext.Provider>
        
    )

}




export const useGlobalContext = () => {
    return useContext(GlobalContext)
}