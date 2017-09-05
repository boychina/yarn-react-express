import {
    ALARM_TREND_DATA_SUCCESS
} from "../actionType/actionType.js";

// function updateState(state, action){
//     switch (action.type){
//         case ALARM_TREND_DATA_SUCCESS:
//             return{
//                 data:action.data
//             }
//     }
// }

export function AlarmTrendData(state={},action){
    switch (action.type){
        case ALARM_TREND_DATA_SUCCESS:
            return {
                data: action.data
            }
        default:
            return state
    }
}