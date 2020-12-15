import { GET_CARD_CODE, GET_CARD_CODE_FORM_USER, GET_LOCATION, GET_NAME_AND_CODE, GET_PATIENT_ALL, GET_PATIENT_ALL_NO_START, GET_PATIENT_CODE, GET_PATIENT_CODE_AND_VIP, GET_PATIENT_CODE_INFO, GET_PATIENT_CODE_VIP, GET_PATIENT_NAME, GET_PATIENT_NAME_AND_VIP, GET_PATIENT_ONLY_NAME, GET_PATIENT_ONLY_NAME_AND_VIP, GET_PATIENT_ONLY_VIP } from "../constants/constantsApi";
import { SET_MESSAGE_SUCCESS } from "../constants/constantsMessageSuccess";
import { CLEAR_CODE, GET_CODE, RESET_DATA, SET_MESSAGE_ERROR } from "../constants/constantsVariable";

export const initialState = {
    dataPatientAll:[],
    dataPatientName:{},
    dataCardPatient:[],
    dataPatientCode:[],
    dataNameAndCode:{},
    location:{},
    dataPatientCodeInfo:{},
    total:0,
    messageErrorSearchCardCode:"",
    messageSuccessNameAndCode:"",
    messageErrorSearchCardCodeFormUser:"",
    messageErrorSearchPatientCode:"",
    messageSuccessSearchPatientCode:"",
    messageSuccessSearchCardCode:"",
    messageSuccessSearchCardCodeFormUser:"",
    messageErrorSearchPatienCode:"",
    messageSuccessSearchPatientCode:"",
    messageSuccessSearchName:"",
    messageErrorSearchName:"",
    loading:false,
    loadingSearch:false,
    error:false,
    codes:""
}
const webVIPReducer = (state = initialState,action) =>{
switch(action.type){
    case RESET_DATA:{
        return {...state,dataPatientCodeInfo:{},codes:"",dataPatientAll:[]}
    }
    case CLEAR_CODE:{
        return{...state, codes:""}
    }
    case GET_CODE:{
        return {...state, codes:action.codes}
    }
    case GET_LOCATION.REQUEST:{
        return {...state,loading:true,error:false}
    }
    case GET_LOCATION.SUCCESS:{
        return{
            ...state,
            location:action.payload.data,
            loading:false,
            error:false
        }
    }
    case GET_LOCATION.FAIL:{
        return {...state, loading:false,error:true}
    }
    case GET_PATIENT_ALL.REQUEST:{
        return {...state, loading:true,error:false}
    }
    case GET_PATIENT_ALL.SUCCESS:{
        return {
            ...state,
            dataPatientAll:action.payload.data,
            total:action.payload.total,
            loading:false,
            error:false
        }
    }

    case GET_PATIENT_ALL.FAIL:{
        return {...state, loading:false,error:true}
    }
    case GET_PATIENT_ALL_NO_START.REQUEST:{
        return {...state, loading:true,error:false}
    }
    case GET_PATIENT_ALL_NO_START.SUCCESS:{
        return {
            ...state,
            dataPatientAll:action.payload.data,
            total:action.payload.total,
            loading:false,
            error:false
        }
    }
    case GET_PATIENT_ALL_NO_START.FAIL:{
        return {...state, loading:false,error:true}
    }
    case GET_PATIENT_NAME.REQUEST:{
        return {...state, loading:true, error:false}
    }
    case GET_PATIENT_NAME.SUCCESS:{
        return {
            ...state,
            dataPatientAll:action.payload.data,
            dataPatientName:action.payload.data,
            total:action.payload.total,
            messageSuccessSearchName:action.payload.code,
            loading:false,
            error:false
        }
    }
    case GET_PATIENT_NAME.FAIL:{
        return {...state, loading:false, error:true}
    }
    case GET_NAME_AND_CODE.REQUEST:{
        return {...state, loading:true, error:false}
    }
    case GET_NAME_AND_CODE.SUCCESS:{
        return {
            ...state,
            dataPatientAll:action.payload.data,
            dataNameAndCode:action.payload.data,
            messageSuccessNameAndCode:action.payload.code,
            total:action.payload.total,
            loading:false,
            error:false
        }
    }
    case GET_NAME_AND_CODE.FAIL:{
        return {...state, loading:false, error:true}
    }
    case GET_PATIENT_CODE.REQUEST:{
        return {...state, loading:true, error:false}
    }
    case GET_PATIENT_CODE.SUCCESS:{
        return {
            ...state,
            dataPatientAll:action.payload.data,
            dataPatientCode:action.payload.data,
            messageSuccessSearchPatientCode:action.payload.code,
            messageErrorSearchPatienCode:"",
            total:action.payload.total,
            loading:false,
            error:false
        }
    }
    case GET_PATIENT_CODE.FAIL:{
        return {...state,messageSuccessSearchPatientCode:"", loading:false,error:true}
    }
    case GET_CARD_CODE.REQUEST:{
        return {...state, loadingSearch:true,error:false}
    }
    case GET_CARD_CODE.SUCCESS:{
        return {
            ...state,
            dataCardPatient:action.payload.data,
            messageSuccessSearchCardCode:action.payload.code,
            messageErrorSearchCardCode:"",
            loadingSearch:false,
            error:false,
        }
    }
    case GET_CARD_CODE.FAIL:{
        return {...state,messageErrorSearchCardCode:action.payload.message,messageSuccessSearchCardCode:"", loadingSearch:false,error:true}
    }
    case GET_CARD_CODE_FORM_USER.REQUEST:{
        return {...state, loadingSearch:true,error:false}
    }
    case GET_CARD_CODE_FORM_USER.SUCCESS:{
        return {
            ...state,
            dataCardPatient:action.payload.data,
            messageSuccessSearchCardCodeFormUser:action.payload.code,
            messageErrorSearchCardCodeFormUser:"",
            loadingSearch:false,
            error:false,
        }
    }
    case GET_CARD_CODE_FORM_USER.FAIL:{
        return {...state,messageErrorSearchCardCodeFormUser:action.payload.message,messageSuccessSearchCardCode:"", loadingSearch:false,error:true}
    }
    case GET_PATIENT_CODE_INFO.REQUEST:{
        return {...state, loadingSearch:true,error:false}
    }
    case GET_PATIENT_CODE_INFO.SUCCESS:{
        return {
            ...state,
            dataPatientCodeInfo:action.payload.data,
            messageSuccessSearchPatientCode:action.payload.code,
            messageErrorSearchPatienCode:"",
            loadingSearch:false,
            error:false,
        }
    }
    case GET_PATIENT_CODE_INFO.FAIL:{
        return {...state,messageErrorSearchPatienCode:action.payload.message,messageSuccessSearchPatientCode:"", loadingSearch:false,error:true}
    }
    case SET_MESSAGE_ERROR:{
        return {
            ...state,
            messageErrorSearchCardCode:"",
            messageErrorSearchPatienCode:""
        }
    }
    case SET_MESSAGE_SUCCESS:{
        return{
            ...state,messageSuccessSearchPatientCode:""
        }
    }
    case GET_PATIENT_CODE_VIP.REQUEST:{
        return {...state, loading:true, error:false}
    }
    case GET_PATIENT_CODE_VIP.SUCCESS:{
        return {
            ...state,
            dataPatientAll:action.payload.data,
            total:action.payload.total,
            loading:false,
            error:false
        }
    }
    case GET_PATIENT_CODE_VIP.FAIL:{
        return {...state,loading:false,error:true}
    }
    case GET_PATIENT_CODE_AND_VIP.REQUEST:{
        return{...state,loading:true,error:false}
    }
    case GET_PATIENT_CODE_AND_VIP.SUCCESS:{
        return{
            ...state,
            dataPatientAll:action.payload.data,
            total:action.payload.total,
            loading:false,
            error:false
        }
    }
    case GET_PATIENT_CODE_AND_VIP.FAIL:{
        return{...state,loading:false, error:true}
    }
    case GET_PATIENT_NAME_AND_VIP.REQUEST:{
        return{...state,loading:true,error:false}
    }
    case GET_PATIENT_NAME_AND_VIP.SUCCESS:{
        return{
            ...state,
            dataPatientAll:action.payload.data,
            total:action.payload.total,
            loading:false,
            error:false
        }
    }
    case GET_PATIENT_NAME_AND_VIP.FAIL:{
        return{...state,loading:false, error:true}
    }
    case GET_PATIENT_ONLY_VIP.REQUEST:{
        return{...state,loading:true,error:false}
    }
    case GET_PATIENT_ONLY_VIP.SUCCESS:{
        return{
            ...state,
            dataPatientAll:action.payload.data,
            total:action.payload.total,
            loading:false,
            error:false
        }
    }
    case GET_PATIENT_ONLY_VIP.FAIL:{
        return{...state,loading:false, error:true}
    }
    case GET_PATIENT_ONLY_NAME.REQUEST:{
        return{...state,loading:true,error:false}
    }
    case GET_PATIENT_ONLY_NAME.SUCCESS:{
        return{
            ...state,
            dataPatientAll:action.payload.data,
            total:action.payload.total,
            loading:false,
            error:false
        }
    }
    case GET_PATIENT_ONLY_NAME.FAIL:{
        return{...state,loading:false, error:true}
    }
    case GET_PATIENT_ONLY_NAME_AND_VIP.REQUEST:{
        return{...state,loading:true,error:false}
    }
    case GET_PATIENT_ONLY_NAME_AND_VIP.SUCCESS:{
        return{
            ...state,
            dataPatientAll:action.payload.data,
            total:action.payload.total,
            loading:false,
            error:false
        }
    }
    case GET_PATIENT_ONLY_NAME_AND_VIP.FAIL:{
        return{...state,loading:false, error:true}
    }
    default:
        return state;
}
}
export default webVIPReducer;