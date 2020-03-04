import React from "react";
import axios from "axios";
import ListaTopP from "./querys/querys2";
import TopMeses from "./querys/months";
import ListaTopPM from "./querys/top_p_m";
import ListaTopGenero from "./querys/gender";
import ListaTopEmp from "./querys/top_emp";
import ListaTopMiem from "./querys/top_miem";
import ListaTopClients from "./querys/best_cl";
import ListaTopZones from "./querys/best_zones";
import ListaTopDelivery from "./querys/best_del";
import ListaTopFestividades from "./querys/top_fest";
import ListaTopProveedores from "./querys/top_prov";
import ListaTopVentasxMes from "./querys/month_cant";
import SearchCategoryForm from "./querys/search_cat";
import SearchNameForm from "./querys/search_name";
import DateRangeForm from "./querys/date_range";





class Charts extends React.Component{


    state={

       
        
    }


    componentDidMount(){

    axios.get("http://127.0.0.1:8000/rest/top").then(res => {
      this.setState({

        
      });

       //console.log(this.state.top_5)
       //console.log(res.data.thing)
     

     });

     

     axios.get("http://127.0.0.1:8000/rest/topm").then(res => {
      this.setState({

        
      });
      //console.log(this.state.top_prod_miembros)
       

     });

     
     axios.get("http://127.0.0.1:8000/rest/top_genero").then(res => {
      this.setState({

        
      });
     });

    

    
     axios.get("http://127.0.0.1:8000/rest/topzonas").then(res => {
      this.setState({

      
        
      });
      //console.log(this.state.best_zones)

     });


     axios.get("http://127.0.0.1:8000/rest/topdel").then(res => {
      this.setState({

      
        
      });
      //console.log(this.state.best_del)

     });


     
     
     axios.get("http://127.0.0.1:8000/rest/top_meses").then(res => {
      this.setState({

        
      });
      //console.log(this.state.mes)


     });


    


    


     }

     

    render(){
        return(

            
            <>

            
            </>
        )
    }



}

export default Charts;