import React from "react";
import axios from "axios";
import ChartTop from "../components/charts/top5_chart";
import {Bar,Line ,Pie} from "react-chartjs-2"





class Charts extends React.Component{


    state={

        top5:[],
        cant_bills_fest:{},
        cant_bills_genero:{},
        best_zones:[],
        best_del:[],
        mes:[],
        chardata1:{},
        chardata2:{},
        chardata3:{},
        chardata4:{},
        chardata5:{},
        chardata6:{},




       
        
    }


    componentDidMount(){

    axios.get("http://127.0.0.1:8000/rest/top").then(res => {
      this.setState({

        top5:res.data.thing

      });
      console.log(this.state.top5) 
      let lab=[]
      let dat=[]
      for (let index = 0; index < this.state.top5.length; index++) {     
        lab.push(this.state.top5[index].name)
        dat.push(this.state.top5[index].cant)
          
      }


        this.setState({
            chardata1:{
                labels:lab,
                datasets:[{

                    label:'Productos mas Vendidos',
                    data:dat,
                    backgroundColor:[
                        '#EE4A4A',
                        '#4AEEA0',
                        '#EEEB4A',
                        '#4A65EE',
                        '#A74AEE',
                    ]

                }]
            }
        })

    

     

     });
    axios.get("http://127.0.0.1:8000/rest/cant_bills_fest").then(res => {

      this.setState({

        cant_bills_fest:res.data
        
      });


      let lab=['Navidad','San Valentin', 'Halloween']
      let cant=[this.state.cant_bills_fest.navidad,this.state.cant_bills_fest.san_val,this.state.cant_bills_fest.halloween]
      


      this.setState({
        chardata2:{
            labels:lab,
            datasets:[{

                label:'Productos mas Vendidos',
                data:cant,
                backgroundColor:[
                    '#EE4A53',
                    '#EE4ADD',
                    '#EEA74A',
                    
                ]

            }]
        }
    })


       
     

     });

     



     axios.get("http://127.0.0.1:8000/rest/cant_bill_genero").then(res => {
      this.setState({

        cant_bills_genero:res.data

      });


      let lab=['Hombres','Mujeres', 'Otros']
      let cant=[this.state.cant_bills_genero.hombres,this.state.cant_bills_genero.mujeres,this.state.cant_bills_genero.otros]

      this.setState({
        chardata3:{
            labels:lab,
            datasets:[{

                label:'Productos mas Vendidos',
                data:cant,
                backgroundColor:[
                    '#EE4A4A',
                        '#4AEEA0',
                        '#EEEB4A',
                        '#4A65EE',
                        '#A74AEE',
                ]

            }]
        }
    })

     });

    

    
     axios.get("http://127.0.0.1:8000/rest/topzonas").then(res => {
      this.setState({

        best_zones:res.data.zonas,

        
      });
      console.log(this.state.best_zones)

      let lab=[]
      let dat=[]
      for (let index = 0; index < this.state.best_zones.length; index++) {     
        lab.push(this.state.best_zones[index].zone)
        dat.push(this.state.best_zones[index].cant)
          
      }

      this.setState({
        chardata4:{
            labels:lab,
            datasets:[{

                label:'Productos mas Vendidos',
                data:dat,
                backgroundColor:[
                    '#EE4A4A',
                        '#4AEEA0',
                        '#EEEB4A',
                        '#4A65EE',
                        '#A74AEE',
                ]

            }]
        }
    })


     });


     axios.get("http://127.0.0.1:8000/rest/topdel").then(res => {
      this.setState({

        best_del:res.data.zonas,

        
      });
      //console.log(this.state.best_del)
      let lab=[]
      let dat=[]
      for (let index = 0; index < this.state.best_del.length; index++) {     
        lab.push(this.state.best_del[index].zone)
        dat.push(this.state.best_del[index].cant)
          
      }

      this.setState({
        chardata5:{
            labels:lab,
            datasets:[{

                label:'Productos mas Vendidos',
                data:dat,
                backgroundColor:[
                    '#EE4A4A',
                        '#4AEEA0',
                        '#EEEB4A',
                        '#4A65EE',
                        '#A74AEE',
                ]

            }]
        }
    })


     });


     
     
     axios.get("http://127.0.0.1:8000/rest/top_meses").then(res => {
      this.setState({

        mes:res.data.data

        
      });
      //console.log(this.state.mes)
      let lab=[]
      let dat=[]
      for (let index = 0; index < this.state.mes.length; index++) {     
        lab.push(this.state.mes[index].mes)
        dat.push(this.state.mes[index].cant)
          
      }



      this.setState({
        chardata6:{
            labels:lab,
            datasets:[{

                label:'Productos mas Vendidos',
                data:dat,
                backgroundColor:'#4AEEBF',
                        
                

            }]
        }
    })



     });


    


    


     }

     

    render(){
        return(

            
            <>
                    <h1>Top Productos</h1>
                    <Bar data={this.state.chardata1} height={100} />
                    <br></br>
                    <h1>Ventas por Festividades</h1>
                    <Pie data={this.state.chardata2} height={100}/>
                    <br></br>
                    <h1>Ventas por Genero</h1>
                    <Pie data={this.state.chardata3} height={100}/>
                    <br></br>
                    <h1>Top de zonas de venta</h1>
                    <Pie data={this.state.chardata4} height={100}/>
                    <br></br>
                    <h1>Top zonas delivery</h1>
                    <Pie data={this.state.chardata5} height={100} />
                    <br></br>
                    <h1>Ventas por Mes</h1>
                    <Line data={this.state.chardata6} height={100} />
                    <br></br> <br></br> <br></br>
                    
            
            </>
        )
    }



}

export default Charts;