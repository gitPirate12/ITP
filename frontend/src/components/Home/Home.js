import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';


function MainHome() {
    const {getAssets, getLiabilities } = useGlobalContext()

    useEffect(() => {
        getAssets()
        getLiabilities()
    }, [])

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>Dashboard</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <div className="amount-con">
                            <div className="buton">
                                <h3>Point of Sale</h3>
                            </div>
                            <div className="buton">
                                <h3>Inventory Management</h3>
                            </div>
                        </div>
                        <div className="amount-con">
                            <div className="buton">
                                <h3>Supply Chain Management</h3>
                            </div>
                            <div className="buton">
                                <h3>Human Resource Management</h3>
                            </div>
                        </div>
                        <div className="amount-con">
                            <div className="buton">
                                <h3>Account and Financial Management</h3>
                            </div>
                            <div className="buton">
                                <h3>Assest and Expense Tracking</h3>
                            </div>
                        </div>
                        <div className="amount-con">
                            <div className="buton">
                                <h3>Marketing and Sale</h3>
                            </div>
                            <div className="buton">
                                <h3>Customer RelationShip Management</h3>
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
        grid-template-columns: repeat(1, 1fr);
        gap: 2rem;
        border-radius: 10px;

        .chart-con{
            grid-column: 1 / 4;
            height: 400px;

            .amount-con{
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                
                .buton{
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 10px;
                    padding: 1rem;
                    p{
                        font-size: 3.5rem;
                        font-weight: 700;
                    }
                }
            }
        }
    }
`;

export default MainHome;