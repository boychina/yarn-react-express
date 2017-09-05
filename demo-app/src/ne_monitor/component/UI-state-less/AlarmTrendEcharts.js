/**
 * 网元监控页面告警趋势图折线图echarts。
 */
import React,{Component} from "react";
import ReactDOM from "react-dom";
import echarts from "echarts";
import moment from "moment";

export default class AlarmTrendEcharts extends Component{
    constructor(props){
        super(props);
        this.state={

        };
        this.trendLineEcharts=null;
    }
    render(){
        let now = new Date();
        console.log(now);
        return(
            <div className="alarm-trend">
                <div ref="AlarmTrendLine" style={{height:"1.44rem"}} className="alarm-trend-line"></div>
            </div>
        )
    }
    setOption(xAxisData,yAxisData){
        /**
         * [option Object]
         * @func {创建告警趋势图echarts的option}
         */
        let option={
            tooltip : {
                trigger: 'axis',
                axisPointer : {
                    type : 'shadow',
                    shadowStyle:{
                        color:'rgba(139,191,90,0.4)'
                    }
                },
                formatter:function(params){
                    if(Array.isArray(params)===true){
                        return "Time:"+params[0].name+"<br>"+"Alarm Number:"+params[0].value;
                    }
                }
            },
            grid: {
                left: 0,
                right: 40,
                bottom: 0,
                top: 50,
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    nameTextStyle:{
                        color:'#666',
                        fontFamily:'Arial',
                        fontSize:'0.12rem'
                    },
                    axisLine:{show:false},
                    axisTick:{show:false},
                    axisLabel:{
                        show:true,
                        textStyle:{
                            color: "#fff"
                        }
                    },
                    boundaryGap : false,
                    data:xAxisData
                }
            ],
            yAxis : [
                {

                    type : 'value',
                    axisLine:{show:false},
                    axisTick:{show:false},
                    splitNumber:3,
                    splitLine:{
                        lineStyle:{
                            type:'dotted'
                        }
                    },
                    axisLabel:{
                        textStyle:{
                            color: "#fff"
                        }
                    }
                }
            ],
            series : [
                {
                    name:'',
                    showSymbol:false,
                    type:'line',
                    smooth:true,
                    itemStyle:{
                        normal:{
                            borderColor:'#3C9EF8'
                        }
                    },
                    lineStyle:{
                            normal: {
                            color:'rgba(173,254,222,1)' 
                        }
                    },
                    areaStyle: {
                        normal: {
                            color:'rgba(173,254,222,.2)'
                        }
                    },
                    markPoint: {
                        data: [{}],
                        itemStyle:{
                            normal:{
                                color:'rgba(139,191,90,1)'
                            }
                        },
                        label: {
                            normal: {
                                textStyle: {
                                    fontSize: 12
                                }
                            }
                        }
                    },
                    data:yAxisData
                }
            ]
        };
        return option;
    }
    componentDidMount(){
        /**
         * [trendLineEcharts 生成的告警趋势echarts对象]
         * @func {初始化告警趋势图的容器}
         */
        this.trendLineEcharts=echarts.init(ReactDOM.findDOMNode(this.refs.AlarmTrendLine));
    }
    componentWillUnmount(){
        /**
         * @func:当组件被移除之前清理容器。
         */
        window.onresize="";
    }
    resetUTCTime(seriseData,formatStr){
        /**
         * 根据formatStr的格式返回seriseData转换后的格式
         */
        let arr = [];
        seriseData.map((params,index)=>{
            let dataTime = (new Date().getTimezoneOffset() + window.serviceTimezoneOffset)*60;
            let time = (Number(params)+dataTime)*1000;
            arr.push(moment(time).format(formatStr));
        });
        return arr;
    }
    componentWillReceiveProps(nextprops){
        const {xAxisData, seriseData} = nextprops;
        window.onresize="";
        let me = this;
        if(nextprops.cause === false){
            this.trendLineEcharts.setOption(
                this.setOption(xAxisData,seriseData)
            );
        }
        window.onresize = this.trendLineEcharts.resize;
        this.trendLineEcharts.off('click');
        this.trendLineEcharts.on('click',function (params) {
            // let xData = params.seriesType ? xAxisData[params.dataIndex]:"";
            me.echartsPosition=params.dataIndex;

            me.trendLineEcharts.setOption({
                series: [{
                    markPoint: {
                        data: [{
                            coord: [params.dataIndex, params.value]
                        }],
                        label: {
                            normal: {
                                textStyle: {
                                    fontSize: 12
                                }
                            }
                        }
                    }
                }]
            });
        })
    }
}