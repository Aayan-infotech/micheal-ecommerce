import React from 'react'
import '../loader/Loading.css';

const Loading = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="ring">
                <div className="ring">
                    <div className="ring">
                        <div className="ring"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading
