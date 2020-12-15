import React from 'react'
import "./ButtonActive.scss"
function ButtonActive({ defaultChecked,handleClickActive }) {
  return (
    <React.Fragment>
      <label className="switch" style={{marginBottom:"-0.4rem"}}>
        <input type="checkbox" onChange={handleClickActive}  checked={defaultChecked}/>
        <span title="Active" />
      </label>
    </React.Fragment>
  )
}
export default React.memo(ButtonActive)
