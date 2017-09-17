import {callApi} from '../../utils/utils.js';
import Apis from '../util/api.js';

import {Request, RequestSuccess, RequestFailure} from "../actionType/actionType.js";

import {
    ALARM_TREND_DATA,
    ALARM_TREND_DATA_SUCCESS,
    ALARM_TREND_DATA_FAILURE
} from "../actionType/actionType.js";


export function GetAlarmTrendLineData(parm){
    let url=Apis.GET_TOPLINE_URL;
    return callApi(
        url,
        parm,
        Request(ALARM_TREND_DATA),
        RequestSuccess(ALARM_TREND_DATA_SUCCESS),
        RequestFailure(ALARM_TREND_DATA_FAILURE)
    );
}