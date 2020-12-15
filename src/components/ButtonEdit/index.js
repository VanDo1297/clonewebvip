import React from 'react'
import "./ButtonEdit.css"
 function ButtonEdit({onClick,disabled}) {
    return (
        <React.Fragment>
            <button className="btn btn-icon-edit" onClick={onClick} title="Edit" disabled={disabled} >
               <i className="fa fa-edit" ></i>
            </button>
        </React.Fragment>

    )
}
export default React.memo(ButtonEdit)