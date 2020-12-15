import React from 'react'

export default function Hospital_code({nameID,title,value,handleChangeHospital,handleBlur,errors,disabled}) {
    return (
        <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="hospital_code">Bệnh viện </label>
          <i><small>{title}</small></i>
          <select
            name="hospital_code"
            id={nameID +" " + "hospital_code"}
            className="form-control"
            style={{ height: "39px" }}
            value={value}
            onChange={handleChangeHospital}
            onBlur={handleBlur}
            disabled={disabled}
          >
            {/* <option value="">Chọn bệnh viện ....</option> */}
            <option value="Bệnh viện Chợ Rẫy">Bệnh viện Chợ Rẫy</option>
            {/* <option value="Bệnh viện Thống Nhất">
              Bệnh viện Thống Nhất
            </option>
            <option value="Bệnh viện Mắt">Bệnh viện Mắt</option>
            <option value="Bệnh viện K">Bệnh viện K</option>
            <option value="6">Bệnh Viện 5</option> */}
          </select>
        </div>
        {errors && (
          <div className="text-l
          eft errors">
            <span>{errors}</span>
          </div>
        )}
      </div>
    )
}

