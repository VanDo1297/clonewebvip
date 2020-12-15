import {createActionTypes} from "../utils/createAsyncAction";


export const GET_PATIENT = createActionTypes('GET_PATIENT');



export const GET_PATIENT_ALL = createActionTypes("GET_PATIENT_ALL")
export const GET_PATIENT_NAME = createActionTypes("GET_PATIENT_NAME")
export const GET_PATIENT_CODE = createActionTypes("GET_PATIENT_CODE")
export const GET_CARD_CODE = createActionTypes("GET_CARD_CODE")
export const GET_PATIENT_CODE_VIP = createActionTypes("GET_PATIENT_CODE_VIP")
export const GET_PATIENT_CODE_AND_VIP = createActionTypes("GET_PATIENT_CODE_AND_VIP")
export const GET_PATIENT_NAME_AND_VIP =createActionTypes("GET_PATIENT_NAME_AND_VIP")
export const POST_DEACTIVE = createActionTypes("POST_DEACTIVE")
export const GET_PATIENT_ONLY_VIP = createActionTypes("GET_PATIENT_ONLY_VIP")
export const GET_PATIENT_ONLY_NAME = createActionTypes("GET_PATIENT_ONLY_NAME")
export const GET_PATIENT_ONLY_NAME_AND_VIP = createActionTypes("GET_PATIENT_ONLY_NAME_AND_VIP")
export const POST_EXPORT =createActionTypes("POST_EXPORT")
export const GET_PATIENT_ALL_NO_START = createActionTypes("GET_PATIENT_ALL_NO_START")
export const GET_LOCATION = createActionTypes("GET_LOCATION")
export const GET_PATIENT_CODE_INFO = createActionTypes("GET_PATIENT_CODE_INFO")
export const GET_CARD_CODE_FORM_USER = createActionTypes("GET_CARD_CODE_FORM_USER")
export const GET_NAME_AND_CODE = createActionTypes("GET_NAME_AND_CODE")
//Form Regis
export const POST_REGIS_PATIENT = createActionTypes("POST_REGIS_PATIENT")
export const POST_UPDATE_PATIENT = createActionTypes("POST_UPDATE_PATIENT")
export const GET_INFO_PATIENT_BY_CARD =createActionTypes("GET_INFO_PATIENT_BY_CARD")
export const GET_INFO_PATIENT_BY_CODE = createActionTypes("GET_INFO_PATIENT_BY_CODE")
