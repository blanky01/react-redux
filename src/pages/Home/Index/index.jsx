/*
 * @authors :Bin Mei
 * @date    :2017-04-26
 * @description： 示例 - 首页 模块
 */

import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import classnames from 'classnames';
import { Link ,browserHistory } from 'react-router';
import {Panel,Modal,Button,Icon,Cell,Input} from 'dragon-mobile-ui';
import { fetchJson } from 'src/utils/fetch';
import StaticToast from 'src/components/common/Toast';
import format from "src/utils/format";
import dia from "src/utils/dia";
import Storage from 'src/utils/storage';
import actions from "src/actions";
import Start from "../Start";

import './Home.scss';


let store = new Storage(),
	StorageKey = 'hideStart';

class Home extends Component{
	constructor(props){
		super(props);
    	this.state = {
			isLoading:false,
			alert:false,
			disable:true,
			disableTips:""
    	};
	}
	componentDidMount(){
		dia(this);
		let {ACTIONS}=this.props;
		ACTIONS.init();
		ACTIONS.wave();
	}
	render(){
		let {_wave,_classList} = this.props;
		return ( 
			<section className="i-home">
				<div className="user-info">
		          <div className="user-icon"><img src={require('./images/logo.svg')}></img></div>
		          <div className="user-name"><p>React+Redux</p></div>
		          <div className="user-identity">
		          	<div className="inner"> 从入门到崩溃、放弃至删代码跑路</div>
		          </div>
		          <div className="wave">
		          {
		          _wave.map((item,i)=>{
		          	return (
		          		<img key={"_wave"+i} className={item._class} src={require(`${item.url}`)} alt={item._alt} />
		          	);
		          })
		          }
		          </div>
		      </div>
				<div className="icon-items">
				{
				_classList.map((item,i)=>{
					return (
						<div className="item" key={"icon"+i}>
		            		<Link to={item.href}>
			            		<div className="icon">
			            			<SVGICON />
			            		</div>
			            		<p>{item.name}</p>
		            		</Link>
		            	</div>
					);
				})
				}
				</div>
				{(store.get(StorageKey)&&store.get(StorageKey)==1)?null:(<Start/>)}
			</section>
		);
	}
};

const SVGICON = (props)=>(
	<svg className="i-svg">
		<use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={require('./images/icon.svg')+"#svg-i0"} />
	</svg>
);
function mapStateToProps(state){
	// console.log(state)
	const {homeIndex} = state;//
	return {
		_classList:homeIndex.classList,
		_wave:homeIndex.wave,
	};
}; 

function mapDispatchToProps(dispatch){
	return {
		ACTIONS:bindActionCreators(actions,dispatch)
	};
};
export default  connect(mapStateToProps,mapDispatchToProps)(Home);