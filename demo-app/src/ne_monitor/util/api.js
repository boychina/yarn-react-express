/***
 * @description:模拟加载路径.
 */
 let Apis;
 let development="development";
 let basePath = window.basePath;

 /***
  * @GET_ONETOPLINE_URL：NE监控上部折线图请求路径.
  * @GET_TABEL_URL:告警列表请求数据路径.
  * @GET_OPENTABEL_URL:告警详细列表表格数据请求路径.
  * @GET_TOPOLOGY_URL:告警网元TOPO图请求路径.
  * @GET_TABLE_PAGE_URL:分页获取告警数据.
  * @GOTO_KQI_URL:进入KQI页面传递数据.
  * @DATA_EXPORT_URL:数据导出的请求路径.
  */
if(development === "localhost"){
  Apis = {
  	GET_TOPLINE_URL: 'http://localhost:2621/getAllUser',
  	GET_TWOTOPLINE_URL: 'http://localhost:2621/api/TWOECHART',
  	GET_TABEL_URL: 'http://localhost:2621/api/TABEL',
  	GET_OPENTABEL_URL: 'http://localhost:2621/api/OPENTABEL',
    GET_TOPOLOGY_URL: 'http://localhost:2621/api/TOPOLOGY',
    GET_TABLE_PAGE_URL: 'http://localhost:2621/api/TABLEBYPAGE',
    GOTO_KQI_URL: 'http://localhost:2621/api/GOTOKQI',
    DATA_EXPORT_URL: 'http://localhost:2621/api/EXPORT'
  };
} else if(development === "development"){
  Apis = {
    GET_TOPLINE_URL: basePath+'neMonitor/getTrend.action',
    GET_TABEL_URL: basePath+'neMonitor/getAlarm.action',
    GET_OPENTABEL_URL: basePath+'neMonitor/detailDataQuery.action',
    GET_TOPOLOGY_URL: basePath+'neMonitor/getIcon.action',
    GET_TABLE_PAGE_URL: basePath+'neMonitor/getPaging.action',
    GOTO_KQI_URL: basePath+'multiAnalysis/initPage.action',
    DATA_EXPORT_URL: basePath+'neMonitor/dataExport.action'
  }
}

 export default Apis
