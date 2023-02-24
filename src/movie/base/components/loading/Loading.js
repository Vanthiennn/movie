import React from 'react'
import './index.scss'
export default function Loading() {
    return (
        <React.Fragment>
            <div className="main-loading">
                {/* <div className="loader"></div> */}
                <div className="body">
                    <span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                    <div className="base">
                        <span></span>
                        <div className="face"></div>
                    </div>
                </div>
                <div className="longfazers">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
         
        </React.Fragment>
    )
}
