import React, { useState } from 'react'
import styled from 'styled-components'
import { signout } from '../utils/Icons'
import { AEsideBarData } from './AEsideBarDate'


function AEsideBar(){   
    return (
        <NavStyled>
             <div className="user-con">
                 <h1>SAP Super</h1>
                 <p>Retail Management System</p>
            </div>
            <ul className="menu-items">
                {AEsideBarData.map((val, key) => {
                    return(                  
                        <li key={key} className='row'  onClick={()=>(window.location.pathname = val.link)}>
                            {""}
                            <div className='title'>{val.title}</div>
                        </li>
                )})}
            </ul>
            <div className="bottom-nav">
                <li>
                    {signout} Sign Out
                </li>
            </div>
        </NavStyled>
    )
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 350px;
    height: 100%;
    background: #0B2447;
    backdrop-filter: blur(4.5px);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 5rem;
    .user-con{
        h1{
            color:#ffffff;
            font-size:50px;
        }
        p{
            color :#ffffff;
            font-size:16px;
        }   
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .9rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: #ffffff;
            padding-left: 1rem;
            position: relative;
            i{
                color: #ffffff;
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .bottom-nav{
        li{
            color:#ffffff;
        }
    }

    .active{
        color:#ffff00 !important;
        i{
            color:#ffff00 !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #ffff00;
            border-radius: 0 10px 10px 0;
        }
    }
`;

export default AEsideBar;