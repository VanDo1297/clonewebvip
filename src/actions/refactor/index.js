import * as contstantApi from "../../constants/constantsApi"
import { SET_MESSAGE_SUCCESS } from "../../constants/constantsMessageSuccess"
import { CLEAR_CODE, GET_CODE, RESET_DATA, SET_MESSAGE_ERROR } from "../../constants/constantsVariable"
import { apiVIP, axiosLocation } from "../../utils/axiosApiTekmedi"

export const getPatient = (state) =>{

    const {start, length, name, vip, code}= state
    const data ={
        start: start || 0 ,
        length : length || 10,
        name: name || '',
        vip: vip || '',
        code: code || ''
    }

    return (dispatch) =>{
        dispatch({
            type: contstantApi.GET_PATIENT.REQUEST
        })
        apiVIP.get(`Patient/all?Skip=${data.start}&Take=${data.length}&PatientName=${data.name}&VipType=${data.vip}&PatientCode=${data.code}`).then((result) =>{
            dispatch({
                type: contstantApi.GET_PATIENT.SUCCESS,
                payload:{
                    data: result.data.result.patients,
                    total: result.data.result.total,
                    code : result.data.code || '' 
                }
            })
        })
        .catch((error) =>{
            dispatch({
                type:contstantApi.GET_PATIENT.FAIL,
                payload:{
                    // message:error.response.data.message
                }
            })
        })
    }
}


