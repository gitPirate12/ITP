import React from 'react'
import {Chart as ChartJs,ArcElement,Tooltip,Legend} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';
import { useGlobalContext } from '../../context/globalContext';

ChartJs.register(
    ArcElement,
    Tooltip,
    Legend
);


function ArInVsOut() {

    const {totalIncome, totalPurchase, totalExpenses} = useGlobalContext()

    const data = {
        labels: ['Incomes', 'Expenses' , 'Purchases'],
        datasets : [{
            label: 'Poll',
            data: [ totalIncome(), totalExpenses(), totalPurchase()],
            backgroundColor: [
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(255, 99, 132)'                
              ],
              
        }]
    }

    const options = {
        plugins: {
            legend: {
              labels: {
                color: 'white'
              }
            }
          }
    }

    return (
    <div>
      <Doughnut data={data} options={options}>
      </Doughnut>
    </div>
  )};



export default ArInVsOut;
