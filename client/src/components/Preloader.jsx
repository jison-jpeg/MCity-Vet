import React from 'react'

export default function Preloader() {
    return (
        <div>
            <div className="loading-overlay">
                <div className="bounce-loader">
                    <div className="bounce1" />
                    <div className="bounce2" />
                    <div className="bounce3" />
                </div>
            </div>
        </div>
    )
}
