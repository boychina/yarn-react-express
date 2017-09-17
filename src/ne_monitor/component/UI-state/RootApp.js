import './RootApp.css';
import '../../../common/css/antd.css';
import React from 'react';

import {LocaleProvider} from "antd";
import enUS from 'antd/lib/locale-provider/en_US';
import TopLine from "./TopLine.js";

export default class RootApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return(
            <LocaleProvider locale={enUS}>
            <div>
                <TopLine />
            </div>
          </LocaleProvider>
        )
    }
}