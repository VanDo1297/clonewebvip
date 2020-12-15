import { GET_INFO_PATIENT_BY_CARD, GET_INFO_PATIENT_BY_CODE, POST_REGIS_PATIENT, POST_UPDATE_PATIENT } from "../constants/constantsApi"
import { SET_MESSAGE_SUCCESS } from "../constants/constantsMessageSuccess"
import { GET_CODE_REGIS_SUCCESS, RESET_CODE_FORM_USER, RESET_DATA, REST_DATA_FORM_USER, SET_MESSAGE_ERROR } from "../constants/constantsVariable"

import { apiVIP } from "../utils/axiosApiTekmedi"

export const postRegisPatient = (dataRegis) =>{
    return(dispatch) =>{
        dispatch({
            type:POST_REGIS_PATIENT.REQUEST,
        })
        apiVIP.post(`Patient/register`,dataRegis).then((result) =>{
            dispatch({
                type:POST_REGIS_PATIENT.SUCCESS,
                payload:{
                    data:result.data.result,
                    message:result.data.code
                }
                
            })
        })
        .catch((error) =>{
            dispatch({
                type:POST_REGIS_PATIENT.FAIL
            })
        })
    }
}
export const postUpdatePatient = (id,dataRegis) =>{
    return(dispatch) =>{
        dispatch({
            type:POST_UPDATE_PATIENT.REQUEST,
        })
        apiVIP.post(`Patient/update/${id}`,dataRegis).then((result) =>{
            dispatch({
                type:POST_UPDATE_PATIENT.SUCCESS,
                payload:{
                    data:result.data.result,
                    message:result.data.code
                }
                
            })
        })
        .catch((error) =>{
            dispatch({
                type:POST_UPDATE_PATIENT.FAIL
            })
        })
        
    }
    
}
export const getInfoPatientByCard = (code) =>{
    return(dispatch) =>{
        dispatch({
            type:GET_INFO_PATIENT_BY_CARD.REQUEST,
        })
        apiVIP.get(`Patient/number/local/${code}`).then((result) =>{
            dispatch({
                type:GET_INFO_PATIENT_BY_CARD.SUCCESS,
                payload:{
                    data:result.data.result,
                    code:result.data.code
                }
            })
        })
        .catch((error) =>{
            dispatch({
                type:GET_INFO_PATIENT_BY_CARD.FAIL,
                payload:{
                    message:error.response.data.message
                }
            })
        })
    }
}
export const getInfoPatientByCode = (code) =>{
    return(dispatch) =>{
        dispatch({
            type:GET_INFO_PATIENT_BY_CODE.REQUEST,
        })
        apiVIP.get(`Patient/code/${code}`).then((result) =>{
            dispatch({
                type:GET_INFO_PATIENT_BY_CODE.SUCCESS,
                payload:{
                    data:result.data.result,
                    code:result.data.code
                }
            })
        })
        .catch((error) =>{
            dispatch({
                type:GET_INFO_PATIENT_BY_CODE.FAIL,
                payload:{
                    message:error.response.data.message
                }
            })
        })
    }
}
export const setMessageSuccessUser = () =>{
    return (dispatch) =>{
        dispatch({
            type: SET_MESSAGE_SUCCESS
        })
    }
    
}
export const getCodeRegisSuccess =(code) =>{
    return(dispatch) =>{
        dispatch({
            type:GET_CODE_REGIS_SUCCESS,
            code
        })
    }
}
export const setMessageErrorUser = () =>({
    type:SET_MESSAGE_ERROR
})
export const resetDataUer = () =>({
    type:REST_DATA_FORM_USER
})
export const resetCodeFormUser = () =>({
    type:RESET_CODE_FORM_USER
})