import {combineReducers} from 'redux';
import webVIPReducer from './webVIP';
import webVIPDeActiveReducer from './webVIPDeactive';
import webVIPExportReducer from './webVIPExport';
import webVIPUserReducer from './webVIPUser';

import reducer from './refactor/index';

const rootReducer = combineReducers({
    webVIPReducer,
    webVIPDeActiveReducer,
    webVIPExportReducer,
    webVIPUserReducer,
    reducer
});

export default rootReducer;