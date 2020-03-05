import React from 'react'
import Axios from 'axios'
import { Card } from 'antd';
import M_C from '../components/querys/m_c'


class MaxSoldList extends React.Component{

        state={
            data:[],
            c:0
           

        }


        componentDidMount(){

                const cant= this.props.match.params.cant;

                this.setState({
                    c:cant
                })

                
                

                console.log(this.props)


                Axios.get(`http://127.0.0.1:8000/rest/sold/${cant}`)
                .then(res=>{

                       this.setState({
                           data:res.data.thing
                       }) 
                       //console.log(res.data)
                   
                       console.log(this.state.data)
                       //console.log('jaja lol')
                       
                })
                

        }


    render(){

        return(
                <>
                <h2>PRODUCTOS CON {this.state.c} O MAS VENTAS:</h2>

                <M_C data={this.state.data}/>
                </>
        )



    }

}

export default MaxSoldList;