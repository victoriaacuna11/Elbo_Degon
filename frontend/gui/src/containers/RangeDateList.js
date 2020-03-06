import React from 'react'
import Axios from 'axios'
import { Card } from 'antd';
import D_R from '../components/querys/d_r'


class RangeDateList extends React.Component{

        state={
            data:[],
           

        }


        componentDidMount(){

                const s= this.props.match.params.start;
                const e= this.props.match.params.end;


                
                
                

                //console.log(this.props)


                Axios.get(`http://127.0.0.1:8000/rest/date/${s}/${e}`)
                .then(res=>{

                       this.setState({
                           data:res.data
                       }) 
                       //console.log(res.data)
                   
                       console.log(this.state.data)
                })
                

        }


    render(){

        return(

            <D_R data={this.state.data} />

        )



    }

}

export default RangeDateList;