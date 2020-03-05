import React from 'react'
import Axios from 'axios'
import { Card } from 'antd';
import P_C_N from '../components/querys/p_c_s'


class SearchCatList extends React.Component{

        state={
            data:[],
           

        }


        componentDidMount(){

                const category= this.props.match.params.category;

                
                

                //console.log(this.props)


                Axios.get(`http://127.0.0.1:8000/rest/cate/${category}`)
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

                <P_C_N data={this.state.data} />
        )



    }

}

export default SearchCatList;