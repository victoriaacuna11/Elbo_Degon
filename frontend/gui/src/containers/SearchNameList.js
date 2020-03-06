import React from 'react'
import Axios from 'axios'
import { Card } from 'antd';
import P_S_N from '../components/querys/p_s_n'


class SearchNameList extends React.Component{

        state={
            data:[],
           

        }


        componentDidMount(){

                const name= this.props.match.params.name;

                
                

                //console.log(this.props)


                Axios.get(`http://127.0.0.1:8000/rest/name/${name}`)
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
            <>
            <h2>TOP 5 PRODUCTOS FILTRADOS POR NOMBRE:</h2>
                <P_S_N data={this.state.data}/>
                </>
        )



    }

}

export default SearchNameList;