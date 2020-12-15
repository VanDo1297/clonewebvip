import { POST_DEACTIVE } from "../constants/constantsApi"
import { SET_MESSAGE_SUCCESS } from "../constants/constantsMessageSuccess"
import { apiVIP } from "../utils/axiosApiTekmedi"

export const postDeactive = (id) =>{
    return(dispatch) =>{
        dispatch({
            type:POST_DEACTIVE.REQUEST,
        })
        apiVIP.post(`Patient/deactive/${id}`).then((result) =>{
            dispatch({
                type:POST_DEACTIVE.SUCCESS,
                payload:{
                    data:result.data.result,
                    code:result.data.code
                }
            })

        })
        .catch((error) =>{
            dispatch({
                type:POST_DEACTIVE.FAIL,
            })
        })
    }
}
export const setMessageSuccessDeActive = () =>({
    type:SET_MESSAGE_SUCCESS
})