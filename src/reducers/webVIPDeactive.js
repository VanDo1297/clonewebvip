import { POST_DEACTIVE } from "../constants/constantsApi"
import { SET_MESSAGE_SUCCESS } from "../constants/constantsMessageSuccess"

export const initialState = {
    dataPatienDeActive:{},
    messageSuccessDeActive:"",
    loading:false,
    error:false
}
const webVIPDeActiveReducer = (state = initialState, action) =>{
    switch(action.type){
        case POST_DEACTIVE.REQUEST:{
            return {...state, loading:true, error:false}
        }
        case POST_DEACTIVE.SUCCESS:{
            return {
                ...state,
                dataPatienDeActive:action.payload.data,
                messageSuccessDeActive:action.payload.code,
                loading:false,
                error:false
            }
        }
        case POST_DEACTIVE.FAIL:{
            return {...state,loading:false, error:true}
        }
        case SET_MESSAGE_SUCCESS:{
            return{...state,messageSuccessDeActive:""}
        }
        default:
            return state;
    }
    
}
export default webVIPDeActiveReducer