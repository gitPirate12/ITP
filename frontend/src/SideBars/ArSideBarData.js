import React from 'react'
import { money, dashboard, expenses, logout } from '../utils/Icons'
export const ArSideBarData = [

    {
        title: "Dashboard",
        icon: dashboard,
        link: "/arhome"
    },
    {
       title: "Incomes",
       icon: money,
       link: "/income" 
    },
    {
        title: "Expenses",
        icon: expenses,
        link: "/expense"
    },

];

