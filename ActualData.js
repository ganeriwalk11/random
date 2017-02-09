import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkIDAction } from '../actions/validations';
import { checkIndexAction } from '../actions/validations';
import rootReducer from '../reducers/index';
import { postData } from '../actions/index';
require("babel-polyfill");


class ActualData extends Component {
  constructor(props) {
    super(props);
    this.x = [];
    this.undo = [];
    this.redo = [];
    this.filter = [];
    this.heads = [];
    this.datas =[];
    }

  renderHeadData(data){
      var heads = [];
      heads = Object.keys(data[0]);
      return heads.map(function(head){
          if(head == 'fname')
          { return <th colSpan='2' rowSpan='1'>Name</th>;}
          else if (head == 'lname')
          {}
          else
          return <th rowSpan='2'>{head}</th>;
        });
  }

  renderNestedHead(data){
    var heads = [];
    heads = Object.keys(data[0]);
    var fname =heads[8];
    var lname = heads[9];
    return <tr key='a'><th key={fname}>{fname}</th><th key={lname}>{lname}</th></tr> ;
  }

  componentDidUpdate(){
    var t1 = performance.now();
    console.log(t1);
   // this.props.filterState(this.filter);
  }

checkFocus(event){
    this.x.push(event.target.innerText);
}

async xt(head,i,j,event){
    var a = event.target;
    //console.log(this);
    //console.log(this.datas[i]);
    var flag = await this.validateData(head,event,i,j);
    if(flag == 1)
    {
        a.style.color = this.props.vad.color;
        /*if(this.props.vad.color == "green"){
            this.datas[i][this.heads[j]] = a;
            console.log(this.datas[i]);
        }*/
        //console.log(a.style.border);
        a.style.border = this.props.vad.borderColor;
    } 
}


validateData(head,event,i,j){
    var flag = 0;
    let t = this.x[this.x.length -1];
    let a = event.target.innerText;
    if(event.target.innerText != this.x)
    {
        this.undo.push({i,j,t,a});
        if(head["head"] === 'index')
        {
            this.props.checkIndexAction(event.target.innerText,head,event.target.style.color);
        }
        else if(head["head"] === '_id')
        {
            this.props.checkIDAction(this.props.data,head["head"],event.target.innerText,event.target.style.color);
        }
        flag =1;
    }
    this.x.pop();
    return flag;
};

    renderHead = (len) => {
        let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        var a = [<td key="a"></td>];
       for(var i=0;i<len;i++){
           a.push(<td key={i}>{alpha[i]}</td>);
       }
       return (<tr>{a}</tr>);
    }

    renderHe = (len) => {
        var a= [];
       for(var i=0;i<len;i++){
           a.push(<br>{i}</br>);
           //a.push(<tr key={i}>{i}</tr>);
       }
       return a;
    }


   renderData = (data,i) => {
        let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        let len = this.props.data.length;
        var b = [];
        var a = [];
        var dupdata = data; 
        var head = Object.keys(dupdata);
        var ke = alpha[i+1] + i+1;
        a.push(head.map((h,j) => {
            var s = alpha[i] + j;
                    //console.log(dupdata[h]);
                    return (<td key={s}>{dupdata[h]}</td>);
            }))
        //     var c= [];
        //     for(var t = 0;t<a.length;t++)
        //     c.push(a[t]);
        //     console.log("c->",c);
    //         b.push(<tr key={i}>{a}</tr>);
    //     //    // console.log(b,i);
    // console.log(a,b);
    return (<tr key={i}>{a}</tr>);
        //return b;
    }

    saveData(){
       var dats = this.props.data;
       this.props.postData(dats[0]);
       //console.log(this);
    }
    

  render() {
        return (
        <div>
        <button id="save" onClick={this.saveData.bind(this)}>SAVE</button>
        <table>
            <tbody>
                {this.renderHead(this.props.data.length)}
            </tbody>
        </table>
            <table>
                <thead>
                </thead>
                <tbody>
                    {this.props.data.map(this.renderData)}
                </tbody>
            </table>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      data: state.data,
      vad : state.vad
  };
}

function mapDispatchToProps(dispatch) {
return {
    //filterState: bindActionCreators(filterState, dispatch),
    checkIndexAction: bindActionCreators(checkIndexAction, dispatch),
    checkIDAction: bindActionCreators(checkIDAction, dispatch),
    postData: bindActionCreators(postData,dispatch)
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(ActualData);
