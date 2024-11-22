import React from 'react'
import { ArSideBarData } from './ArSideBarData'
import styled from 'styled-components'
import "../styles/Sidebar.css"
function ArSideNav() {
  return (
    <Sidebarstyled>
    <div className='Sidebar'   height="100%" width="250px" color='#FFFFFF'>
        <ul className='SidebarList' height="100%" width="100%">
            <h2>SAP Super</h2>
            <p>Retail Management System</p>
            <p></p>          
            {ArSideBarData.map((val, key) => {
                return(                  
                <li key={key} className='row'  onClick={()=>(window.location.pathname = val.link)}>
                    {""}
                    <div className='icon'>{val.icon}</div>{""}
                    <div className='title'>{val.title}</div>
                </li>
            )
            })}      
        </ul>
    </div>  
    </Sidebarstyled>
  )
}


const Sidebarstyled = styled.div`
.Sidebar{
    padding: 2rem 1.5rem;
    margin: 0;
    width: 33vh;
    height: 100vh;
    background: #0B2447;
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    position: sticky;
}

.SidebarList{
  height:100%;
  padding: 0;
  width: 100%;  
}
.SidebarList.row{
    width: 100%;
    height: 50px;
    border: 1px solid white;
    list-style-type: none;
    margin: 0;
    display: flex;
    flex-direction: row;
}

.SidebarList{
    flex: 1;
    display: flex;
    flex-direction: column;
}
.row{
        display: grid;
        grid-template-columns: 40px auto;
        align-items: center;
        margin: .6rem 0;
        font-weight: 500;
        cursor: pointer;
        transition: all .4s ease-in-out;
        color: white;
        padding-left: 1rem;
        position: relative;
        padding-bottom: 1rem;
        
}
.icon{
            color: white;
            font-size: 1.4rem;
            transition: all .4s ease-in-out;
}
`

export default ArSideNav
