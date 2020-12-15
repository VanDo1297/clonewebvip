import React from "react";
import { listNationality } from "../data";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
function CountryCode({ defaultValueCountry, setDefaultValueCountry,patientData,cardPatient}) {
  const CssTextField = withStyles({
    root: {
      "& label.Mui-focused": {
        color: "#555",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#ccc",
        },
        "&:hover fieldset": {
          borderColor: "#ccc",
        },
        "&.Mui-focused fieldset": {
          border: "1px solid",
          borderColor: "#8cbbec",
        },
        "& .MuiAutocomplete-popper": {
          top: "-5px",
        },
      },
    },
  })(TextField);
  return (
    
      <div className="col-md-6 country_code__edit">
      <div className="form-group">
        <label htmlFor="country_code">Quốc tịch</label>
        <Autocomplete
          disabled={Object.entries(patientData).length === 0 && Object.entries(cardPatient).length === 0 ? "disabled"  
              : Object.entries(patientData).length > 0 && Object.entries(cardPatient).length > 0 
              ? "disabled":false}
          value={defaultValueCountry}
          id="combo-box-demo country_code"
          onChange={(event, value) => {
            if (value && value.name) {
              setDefaultValueCountry(value);
            }
          }}
          options={listNationality}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.name
          }
          getOptionSelected={(option, value) => {
            if (!value) return false;
            return option.name === value.name;
          }}
          style={{ width: "100%" }}
          renderInput={(params) => (
            <CssTextField
              style={{ background: "white" }}
              {...params}
              variant="outlined"
              placeholder="Nhập quốc tich"
            />
          )}
        />
        </div>
      </div>
  );
}
export default  React.memo(CountryCode);
