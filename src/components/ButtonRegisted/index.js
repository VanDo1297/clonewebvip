import React from 'react'
import "./ButtonRegisted.css"
 function ButtonRegisted({onClick,disabled}) {
    return (
        <React.Fragment>
            <button className="btn btn-icon-registed" onClick={onClick} title="Register" disabled={disabled}>
                <i className="fas fa-user-plus"></i> 
            </button>
        </React.Fragment>
    )
}
export default React.memo(ButtonRegisted)