import { GET_CARD_CODE, GET_CARD_CODE_FORM_USER, GET_LOCATION, GET_NAME_AND_CODE, GET_PATIENT_ALL, GET_PATIENT_ALL_NO_START, GET_PATIENT_CODE, GET_PATIENT_CODE_AND_VIP, GET_PATIENT_CODE_INFO, GET_PATIENT_CODE_VIP, GET_PATIENT_NAME, GET_PATIENT_NAME_AND_VIP, GET_PATIENT_ONLY_NAME, GET_PATIENT_ONLY_NAME_AND_VIP, GET_PATIENT_ONLY_VIP } from "../constants/constantsApi"
import { SET_MESSAGE_SUCCESS } from "../constants/constantsMessageSuccess"
import { CLEAR_CODE, GET_CODE, RESET_DATA, SET_MESSAGE_ERROR } from "../constants/constantsVariable"
import { apiVIP, axiosLocation } from "../utils/axiosApiTekmedi"




export const getPatientAll = (start, length) =>{
    return (dispatch) =>{
        dispatch({
            type:GET_PATIENT_ALL.REQUEST,
        })
        apiVIP.get(`Patient/all?Skip=${start}&Take=${length}`).then((result) =>{
            dispatch({
                type: GET_PATIENT_ALL.SUCCESS,
                payload:{
                    data: result.data.result.patients,
                    total: result.data.result.total
                }
            })
        })
        .catch((error) =>{
            dispatch({
                type:GET_PATIENT_ALL.FAIL,
                payload:{
                    // message:error.response.data.message
                }
            })
        })
    }
}
export const getPatientNoStart = () =>{
    return (dispatch) =>{
        dispatch({
            type:GET_PATIENT_ALL_NO_START.REQUEST,
        })
        apiVIP.get(`Patient/all`).then((result) =>{
            dispatch({
                type: GET_PATIENT_ALL_NO_START.SUCCESS,
                payload:{
                    data: result.data.result.patients,
                    total: result.data.result.total
                }
            })
        })
        .catch((error) =>{
            dispatch({
                type:GET_PATIENT_ALL_NO_START.FAIL,
                payload:{
                    // message:error.response.data.message
                }
            })
        })
    }
}
export const getPatientName = (start,length,name) =>{
    return(dispatch) =>{
        dispatch({
            type:GET_PATIENT_NAME.REQUEST,
        })
        apiVIP.get(`Patient/all?Skip=${start}&Take=${length}&PatientName=${name}`).then((result) =>{
            dispatch({
                type:GET_PATIENT_NAME.SUCCESS,
                payload:{
                    data:result.data.result.patients,
                    total: result.data.result.total,
                    code:result.data.code
                }
            })
        })
        .catch((error) =>{
            dispatch({
                type:GET_PATIENT_NAME.FAIL,
                payload:{
                    // message:error.response.data
                }
            })
        })
    }
}
export const getPatientOnlyName = (name) =>{
    return(dispatch) =>{
        dispatch({
            type:GET_PATIENT_ONLY_NAME.REQUEST,
        })
        apiVIP.get(`Patient/all?PatientName=${name}`).then((result) =>{
            dispatch({
                type:GET_PATIENT_ONLY_NAME.SUCCESS,
                payload:{
                    data:result.data.result.patients,
                    total: result.data.result.total
                }
            })
        })
        .catch((error) =>{
            dispatch({
                type:GET_PATIENT_ONLY_NAME.FAIL,
                payload:{
                    // message:error.response.data
                }
            })
        })
    }
}
export const getPatientNameAndVIP = (start, length,name, vip) =>{
    return(dispatch) =>{
        dispatch({
            type:GET_PATIENT_NAME_AND_VIP.REQUEST,
        })
        apiVIP.get(`Patient/all?Skip=${start}&Take=${length}&PatientName=${name}&VipType=${vip}`).then((result) =>{
            dispatch({
                type:GET_PATIENT_NAME_AND_VIP.SUCCESS,
                payload:{
                    data:result.data.result.patients,
                    total: result.data.result.total
                }
            })
        })
        .catch((error) =>{
            dispatch({
                type:GET_PATIENT_NAME_AND_VIP.FAIL,
                payload:{
                    // message:error.response.data
                }
            })
        })
    }
}
export const getPatientOnlyNameAndVIP = (name,vip) =>{
    return(dispatch) =>{
        dispatch({
            type:GET_PATIENT_ONLY_NAME_AND_VIP.REQUEST,
        })
        apiVIP.get(`Patient/all?PatientName=${name}&VipType=${vip}`).then((result) =>{
            dispatch({
                type:GET_PATIENT_ONLY_NAME_AND_VIP.SUCCESS,
                payload:{
                    data:result.data.result.patients,
                    total: result.data.result.total
                }
            })
        })
        .catch((error) =>{
            dispatch({
                type:GET_PATIENT_ONLY_NAME_AND_VIP.FAIL,
                payload:{
                    // message:error.response.data
                }
            })
        })
    }
}
export const getCode =(codes) =>{
    return(dispatch) =>{
        dispatch({
            type:GET_CODE,
            codes
        })
    }
}
export const getPatientCode = (code, a) =>{
    return(dispatch) =>{
        dispatch({
            type:GET_PATIENT_CODE.REQUEST,
        })
        apiVIP.get(`Patient/all?PatientCode=${code}`).then((result) =>{
            dispatch({
                type:GET_PATIENT_CODE.SUCCESS,
                payload:{
                    data:result.data.result.patients,
                    total: result.data.result.total,
                    code :result.data.code
                }
            })
        })
        .catch((error) =>{
            dispatch({
                type:GET_PATIENT_CODE.FAIL,
            })
        })
    }
}
export const getPatientCodeAndVIPCODE = (code,vip) =>{
    return(dispatch) =>{
        dispatch({
            type:GET_PATIENT_CODE_AND_VIP.REQUEST,
        })
        apiVIP.get(`Patient/all?PatientCode=${code}&VipType=${vip}`).then((result) =>{
            dispatch({
                type:GET_PATIENT_CODE_AND_VIP.SUCCESS,
                payload:{
                    data:result.data.result.patients,
                    total: result.data.result.total
                }
            })
        })
        .catch((error) =>{
            dispatch({
                type:GET_PATIENT_CODE_AND_VIP.FAIL,
            })
        })
    }
}
export const getNameAndCode =(code,name) =>{
    return(dispatch) =>{
        dispatch({
            type:GET_NAME_AND_CODE.REQUEST,
        })
        apiVIP.get(`Patient/all?PatientCode=${code}&PatientName=${name}`).then((result) =>{
            dispatch({
                type:GET_NAME_AND_CODE.SUCCESS,
                payload:{
                    data:result.data.result.patients,
                    total: result.data.result.total,
                    code:result.data.code
                }
            })
        })
        .catch((error) =>{
            dispatch({
                type:GET_NAME_AND_CODE.FAIL,
            })
        })
    }
}
export const getCardCode =(code) =>{
    return(dispatch) =>{
        dispatch({
            type:GET_CARD_CODE.REQUEST,
        })
        apiVIP.get(`Patient/number/local/${code}`).then((result) =>{
            dispatch({
                type:GET_CARD_CODE.SUCCESS,
                payload:{
                    data:result.data.result,
                    code:result.data.code
                }
            })
        })
        .catch((error) =>{
            dispatch({
                type:GET_CARD_CODE.FAIL,
                payload:{
                    message:error.response.data.message
                }
            })
        })
    }
}
export const getCardCodeFormUser =(code) =>{
    return(dispatch) =>{
        dispatch({
            type:GET_CARD_CODE_FORM_USER.REQUEST,
        })
        apiVIP.get(`Patient/number/local/${code}`).then((result) =>{
            dispatch({
                type:GET_CARD_CODE_FORM_USER.SUCCESS,
                payload:{
                    data:result.data.result,
                    code:result.data.code
                }
            })
        })
        .catch((error) =>{
            dispatch({
                type:GET_CARD_CODE_FORM_USER.FAIL,
                payload:{
                    message:error.response.data.message
                }
            })
        })
    }
}
export const getPatientCodeInfo = (code) =>{
    return(dispatch) =>{
        dispatch({
            type:GET_PATIENT_CODE_INFO.REQUEST,
        })
        apiVIP.get(`Patient/code/${code}`).then((result) =>{
            dispatch({
                type:GET_PATIENT_CODE_INFO.SUCCESS,
                payload:{
                    data:result.data.result,
                    code:result.data.code
                }
            })
        })
        .catch((error) =>{
            dispatch({
                type:GET_PATIENT_CODE_INFO.FAIL,
                payload:{
                    // message:error.response.data.message
                }
            })
        })
    }
}

export const getPatientCodeVIP = (start,length,code) =>{
    return(dispatch) =>{
        dispatch({
            type:GET_PATIENT_CODE_VIP.REQUEST
        })
        apiVIP.get(`Patient/all?Skip=${start}&Take=${length}&VipType=${code}`).then((result) =>{
            dispatch({
                type:GET_PATIENT_CODE_VIP.SUCCESS,
                payload:{
                    data:result.data.result.patients,
                    total: result.data.result.total
                }
            })
        })
        .catch((error) =>{
            dispatch({
                type:GET_PATIENT_CODE_VIP.FAIL
            })
        })
    }

}
export const getPatientOnlyVIP = (vip)=>{
    return(dispatch) =>{
        dispatch({
            type:GET_PATIENT_ONLY_VIP.REQUEST
        })
        apiVIP.get(`Patient/all?VipType=${vip}`).then((result) =>{
            dispatch({
                type:GET_PATIENT_ONLY_VIP.SUCCESS,
                payload:{
                    data:result.data.result.patients,
                    total: result.data.result.total
                }
            })
        })
        .catch((error) =>{
            dispatch({
                type:GET_PATIENT_ONLY_VIP.FAIL
            })
        })
    }
}
export const getLocation = () =>{
    return(dispatch) =>{
        dispatch({
            type:GET_LOCATION.REQUEST
        })
        axiosLocation.get(`/Location/all?{}&_=1598206523035`).then((result) =>{
            dispatch({
                type:GET_LOCATION.SUCCESS,
                payload:{
                    data:result.data.result,
                }
            })
        })
        .catch((error) =>{
            dispatch({
                type:GET_LOCATION.FAIL
            })
        })
    }
}
export const setMessageError = () =>({
    type:SET_MESSAGE_ERROR
})
export const setMessageSuccessSearch = () =>({
    type:SET_MESSAGE_SUCCESS
})
export const resetData = () =>({
    type:RESET_DATA
})
export const clearCode = () =>({
    type:CLEAR_CODE
})