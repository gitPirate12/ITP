import React from "react";
import { dashboard } from "../../utils/Icons";
import sidebarstyle from "./sidebarstyle.css";

import { SideBarData } from "./SideBarData";

function SideBar() {
    return (
        <div className="Sidebar" height="100%" width="250px" color="#FFFFFF">
            <ul className="SidebarList" height="100%" width="100%">
                {SideBarData.map((val, key) => {
                    return (
                        <li
                            key={key}
                            className="row"
                            onClick={() =>
                                (window.location.pathname = val.link)
                            }
                        >
                            <div className="icon">{val.icon}</div>
                            <div className="title">{val.title}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
export default SideBar;
