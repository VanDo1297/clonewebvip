import { GET_INFO_PATIENT_BY_CARD, GET_INFO_PATIENT_BY_CODE, POST_REGIS_PATIENT, POST_UPDATE_PATIENT } from "../constants/constantsApi"
import { SET_MESSAGE_SUCCESS } from "../constants/constantsMessageSuccess"
import { GET_CODE_REGIS_SUCCESS, RESET_CODE_FORM_USER, RESET_DATA, REST_DATA_FORM_USER, SET_MESSAGE_ERROR } from "../constants/constantsVariable"

export const initialState = {
    dataInfoPatientByCard:{},
    messageSuccessByCard:"",
    messageErrorByCard:"",
    dataInfoPatientByCode:{},
    messageSuccessByCode:"",
    messageErrorByCode:"",
    loadingRegis:false,
    loadingInfo:false,
    error:false,
    messageSuccessRegis:"",
    messgaeSuccessUpdate:"",
    codeRegisSuccess:""
}
const webVIPUserReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_INFO_PATIENT_BY_CARD.REQUEST:{
            return {...state, loadingInfo:true,error:false}
        }
        case GET_INFO_PATIENT_BY_CARD.SUCCESS:{
            return {
                ...state,
                dataInfoPatientByCard:action.payload.data,
                messageSuccessByCard:action.payload.code,
                messageErrorByCard:"",
                loadingInfo:false,
                error:false,
            }
        }
        case GET_INFO_PATIENT_BY_CARD.FAIL:{
            return {...state,messageErrorByCard:action.payload.message,messageSuccessSearchCardCode:"", loadingInfo:false,error:true}
        }
        case GET_INFO_PATIENT_BY_CODE.REQUEST:{
            return {...state, loadingInfo:true,error:false}
        }
        case GET_INFO_PATIENT_BY_CODE.SUCCESS:{
            return {
                ...state,
                dataInfoPatientByCode:action.payload.data,
                messageSuccessByCode:action.payload.code,
                messageErrorByCode:"",
                loadingInfo:false,
                error:false,
            }
        }
        case GET_INFO_PATIENT_BY_CODE.FAIL:{
            return {...state,messageErrorByCode:action.payload.message,messageSuccessByCode:"", loadingInfo:false,error:true}
        }
        case GET_CODE_REGIS_SUCCESS:{
            return {...state, codeRegisSuccess:action.code}
        }
        case POST_REGIS_PATIENT.REQUEST:{
            return {...state,loadingRegis:true,error:false}
        }
        case POST_REGIS_PATIENT.SUCCESS:{
            return {...state,messageSuccessRegis:action.payload.message, loadingRegis:false,error:false}
        }
        case POST_REGIS_PATIENT.FAIL:{
            return{...state, loadingRegis:false,error:true}
        }
        case SET_MESSAGE_SUCCESS:{
            return {...state, messageSuccessRegis:"",messgaeSuccessUpdate:""}
        }
        case POST_UPDATE_PATIENT.REQUEST:{
            return {...state,loadingRegis:true,error:false}
        }
        case POST_UPDATE_PATIENT.SUCCESS:{
            return {...state,messgaeSuccessUpdate:action.payload.message, loadingRegis:false,error:false}
        }
        case POST_UPDATE_PATIENT.FAIL:{
            return{...state, loadingRegis:false,error:true}
        }
        case SET_MESSAGE_SUCCESS:{
            return {...state,
                messageSuccessByCard:"",
                messageSuccessByCode:"",
            }
        }
        case SET_MESSAGE_ERROR:{
            return {...state,
                messageErrorByCard:"",
                messageErrorByCode:"",
            }
        }
        case REST_DATA_FORM_USER:{
            return {...state,dataInfoPatientByCard:{},dataInfoPatientByCode:{}}
        }
        case RESET_CODE_FORM_USER:{
            return{...state,codeRegisSuccess:""}
        }
        default:
            return state
    }
}
export default webVIPUserReducer