import { POST_EXPORT } from "../constants/constantsApi"
import { apiVIP } from "../utils/axiosApiTekmedi"

export const postExportAll = (data) =>{
    return (dispatch) =>{
        dispatch({
            type:POST_EXPORT.REQUEST,
        })
        apiVIP.post(`Patient/export`,data).then((result) =>{
            dispatch({
                type: POST_EXPORT.SUCCESS,
                payload:{
                    data: result.data.result,
                }
            })
        })
        .catch((error) =>{
            dispatch({
                type:POST_EXPORT.FAIL,
                payload:{
                    // message:error.response.data.message
                }
            })
        })
    }
}