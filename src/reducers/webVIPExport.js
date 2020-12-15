import { POST_EXPORT } from "../constants/constantsApi"

export const initialState = {
    dataExport:{},
    loadingExport:false,
    error:false,
}
const webVIPExportReducer = (state = initialState, action) =>{
    switch(action.type){
        case POST_EXPORT.REQUEST:{
            return{...state,loadingExport:true,error:false}
        }
        case POST_EXPORT.SUCCESS:{
            return{
                ...state,
                dataExport:action.payload.data,
                loadingExport:false,
                error:false
            }
        }
        case POST_EXPORT.FAIL:{
            return{...state,error:true,loadingExport:false}
        }
        default:
            return state;
    }
}
export default webVIPExportReducer