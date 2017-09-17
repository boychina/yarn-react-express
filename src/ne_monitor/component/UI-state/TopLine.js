/**
 * 网元监控页面告警趋势图。
 */
import "./TopLine.css";
import React,{Component} from "react";
import {connect} from "react-redux";
import { Radio } from 'antd';

import {GetAlarmTrendLineData} from "../../createAction/NeAction.js";

import AlarmTrendEcharts from "../UI-state-less/AlarmTrendEcharts.js";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class TopLine extends Component{
    constructor(props){
        super(props);
        this.state={
            cause:false,
        }
    }
    render(){
        const {xAxisData, seriseData}=this.props;
        return(
            <div className="topLine-container">
                <div className="topLine-box">
                    <div className="topLine-title-box">
                        <div className="topLine-title-text">ALARM <span>TREND</span></div>
                        <div className="topLine-hour-button-box">
                            <RadioGroup defaultValue="12" onChange={this.radioGroupOnChange.bind(this)}>
                                <RadioButton value="12">12H</RadioButton>
                                <RadioButton value="24">24H</RadioButton>
                            </RadioGroup>
                        </div>
                    </div>
                    <AlarmTrendEcharts cause={this.state.cause} xAxisData={xAxisData} seriseData={seriseData}/>
                </div>
            </div>
        )
    }

    radioGroupOnChange(event){
        /**
         * 切换12H和24H单选按钮执行
         */
        switch(event.target.value){
            case "12":
                console.log("xuanze12xiaoshi",+event.target.value);
                break;
            case "24":
                console.log("xuanze24xiaoshi",+event.target.value);
                break;
            default:
                console.log("meiyouxuanze");
        }
    }
    componentDidMount(){
        /**
         * 组件加载之前请求后台折线图数据
         */
        let me = this;
        let dispatch = me.props.dispatch;
        dispatch(GetAlarmTrendLineData({timeLength:12}));
    }
}
function mapStateToProps(state){
    if(state.AlarmTrendData.data){
        let xarr=[];
        let yarr=[];
        xarr=state.AlarmTrendData.data.cellData.xAxis;
        yarr=state.AlarmTrendData.data.cellData.series.amounts;
        return{
            xAxisData: xarr,
            seriseData: yarr
        }
    }
    return{
        xAxisData: [],
        seriseData: []
    }
}
export default connect(mapStateToProps)(TopLine);