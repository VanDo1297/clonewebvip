
import React, { useState } from 'react';

import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { red } from '@material-ui/core/colors';

function MaterialUIPickers() {

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          // label="Material Date Picker"
          // variant="static"
          className="fix"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          style={{marginLeft:0}}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default MaterialUIPickers;