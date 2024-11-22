import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Chart from '../Chart/Chart';
import ChartL from '../Chart/ChartL';
import AEsideBar from '../../SideBars/AEsideBar';

function ALDashboard() {
    const {totalAssets, getAssets, getLiabilities ,totalLiabilities, totalDepreciation,totalInterest } = useGlobalContext()

    useEffect(() => {
        getAssets()
        getLiabilities()
    }, [])

    return (
        <DashboardStyled>
            <InnerLayout>
            <div className="stats-con">
            <div className="chart-con">
                <h1>Assets and Liabilities</h1>    
                    <div className="amount-con">
                        <div><AEsideBar/></div>
                            <div>   
                                <div className="assets">
                                    <h2>Total Assets</h2>
                                    <p>
                                        Rs. {totalAssets()}
                                    </p>
                                </div>

                                <div className="assets">
                                    <h2>Annual Depreciation</h2>
                                    <p>
                                        Rs. {totalDepreciation()}
                                    </p>
                                </div>
                                <div>
                                    <ChartL/>
                                </div>
                            </div> 

                            <div> 
                                <div className="liabilities">
                                    <h2>Total Liabilities</h2>
                                    <p>
                                        Rs. {totalLiabilities()}
                                    </p>
                                </div>

                                <div className="liabilities">
                                    <h2>Annual Interest</h2>
                                    <p>
                                        Rs. {totalInterest()}
                                    </p>
                                </div>
                                
                                <div>
                                    <Chart/>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
    .stats-con{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                margin-bottom: 2rem;
                .assets, .liabilities{
                    grid-column: span 2;
                    
                }

                .assets{
                    background: #19376D;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p{
                        font-size: 3.5rem;
                        font-weight: 700;
                        color: var(--color-green);
                    }
                   
                }
                .liabilities{
                    background: #19376D;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p{
                        font-size: 3.5rem;
                        font-weight: 700;
                        color: red;
                    }
                    
                }
            }
        }
    }
`;

export default ALDashboard;