import * as constantsApi from "../../constants/constantsApi";
import { SET_MESSAGE_SUCCESS } from "../../constants/constantsMessageSuccess";
import { CLEAR_CODE, GET_CODE, RESET_DATA, SET_MESSAGE_ERROR } from "../../constants/constantsVariable";

export const initialState = {
    dataPatient:[],
    location:{},
    total:0,
    loading:false,
    loadingSearch:false,
    error:false,
    codes:''
}
const webVIPReducer = (state = initialState,action) =>{

    switch(action.type){
        case constantsApi.GET_PATIENT.REQUEST:
        case constantsApi.GET_LOCATION.REQUEST:{
            return {...state,loading:true,error:false}
        }
        case constantsApi.GET_LOCATION.SUCCESS:{
            return{
                ...state,
                location:action.payload.data,
                loading:false,
                error:false
            }
        }

        case constantsApi.GET_LOCATION.FAIL:{
            return {...state, loading:false,error:true}
        }
    
        case constantsApi.GET_PATIENT.SUCCESS:{
            return {
                ...state,
                dataPatient:action.payload.data,
                total:action.payload.total,
                loading:false,
                error:false
            }
        }

        case constantsApi.GET_PATIENT.FAIL:{
            return {...state, loading:false,error:true}
        }
        default:
            return state;
    }
}
export default webVIPReducer;