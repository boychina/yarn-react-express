/**
 * @description: 网元监控告警趋势图数据请求的 action.type
 */
export const ALARM_TREND_DATA="ALARM_TREND_DATA";
export const ALARM_TREND_DATA_SUCCESS="ALARM_TREND_DATA_SUCCESS";
export const ALARM_TREND_DATA_FAILURE="ALARM_TREND_DATA_FAILURE";

/**
 * @description: 网元监控告警TOPOLOGY图数据请求的 action.type
 */
export const ALARM_TOPOLOGY_DATA_SUCCESS="ALARM_TOPOLOGY_DATA_SUCCESS";

/**
 * @description: 网元监控告警列表数据请求的 action.type
 */
export const ALARM_LIST_DATA_SUCCESS="ALARM_LIST_DATA_SUCCESS";

/**
 * @description: 网元监控告警详情列表数据请求的 action.type
 */
export const ALARM_DETAILS_DATA_SUCCESS="ALARM_DETAILS_DATA_SUCCESS";

export function Request(type){
    /**
     * 导出页面中每个组件公用的fetch请求的函数：请求前
     */
    return{
        type:type
    }
}

export function RequestSuccess(type){
    /**
     * 导出页面中每个组件公用的fetch请求的函数：请求成功
     */
    return function(data){
        return{
            type:type,
            data:data
        }
    }
}

export function RequestFailure(type){
    /**
     * 导出页面中每个组件公用的fetch请求的函数：请求失败
     */
     return function(error){
        return {
            type:type,
            error
        }
     }
}

export {GetAlarmTrendLineData} from "../createAction/NeAction.js";