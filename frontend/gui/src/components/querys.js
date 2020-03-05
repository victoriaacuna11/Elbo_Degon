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
import MaxCantSold from "./querys/max_cant";





class AdminData extends React.Component{


    state={

        top_5:[],

        mas10:[],



        enero:[],
        febrero:[],
        marzo:[],
        abril:[],
        mayo:[],
        junio:[],
        julio:[],
        agosto:[],
        septiembre:[],
        octubre:[],
        noviembre:[],
        diciembre:[],



        top_prod_miembros:[],

        hombres:[],
        mujeres:[],
        otros:[],

        top_emp:[],
        top_miem:[],

        best_cl:[],

        best_zones:[],
        best_del:[],

        navidad:[],
        sval:[],
        hall:[],

        prov:[],

        meses:[],
        



        cat:[],
        category:'',

        nam:[],
        name:'',
        
        s:[],
        start:'',
        
        e:[],
        end:'',
        
    }


    componentDidMount(){

    axios.get("http://127.0.0.1:8000/rest/top").then(res => {
      this.setState({

        top_5:res.data.thing
        
      });

       //console.log(this.state.top_5)
       //console.log(res.data.thing)
     

     });
   

     axios.get("http://127.0.0.1:8000/rest/pm").then(res => {
      this.setState({

        enero:res.data.enero,
        febrero:res.data.febrero,
        marzo:res.data.marzo,
        abril:res.data.abril,
        mayo:res.data.mayo,
        junio:res.data.junio,
        julio:res.data.julio,
        agosto:res.data.agosto,
        septiembre:res.data.septiembre,
        octubre:res.data.octubre,
        noviembre:res.data.noviembre,
        diciembre:res.data.diciembre,
        
      });
    
     });

     axios.get("http://127.0.0.1:8000/rest/topm").then(res => {
      this.setState({

        top_prod_miembros:res.data.top_p_m
        
      });
      //console.log(this.state.top_prod_miembros)
       

     });
     axios.get("http://127.0.0.1:8000/rest/top_genero").then(res => {
      this.setState({

        hombres:res.data.hombres,
        mujeres:res.data.mujeres,
        otros:res.data.otros
        
      });
     });

     axios.get("http://127.0.0.1:8000/rest/top_emp").then(res => {
      this.setState({

        top_emp:res.data,
        
        
      });
      //console.log(this.state.top_emp)
     });


     axios.get("http://127.0.0.1:8000/rest/top_miem").then(res => {
      this.setState({

        top_miem:res.data,
      
        
      });
      //console.log(this.state.top_miem)

     });

     axios.get("http://127.0.0.1:8000/rest/bestc").then(res => {
      this.setState({

        best_cl:res.data.client,
      
        
      });
      //console.log(this.state.best_cl)

     });
     axios.get("http://127.0.0.1:8000/rest/topzonas").then(res => {
      this.setState({

        best_zones:res.data.zonas,
      
        
      });
      //console.log(this.state.best_zones)

     });
     axios.get("http://127.0.0.1:8000/rest/topdel").then(res => {
      this.setState({

        best_del:res.data.zonas,
      
        
      });
      //console.log(this.state.best_del)

     });
     axios.get("http://127.0.0.1:8000/rest/fest").then(res => {
      this.setState({

        navidad:res.data.navidad,
        hall:res.data.halloween,
        sval:res.data.san_val,
      
        
      });
      //console.log(this.state.best_del)

      //  console.log(this.state.navidad)
      //  console.log(this.state.hall)
      //  console.log(this.state.sval)

     });
     axios.get("http://127.0.0.1:8000/rest/topp").then(res => {
      this.setState({

          prov:res.data.providers
        
      });
      //console.log(this.state.prov)


     });
     axios.get("http://127.0.0.1:8000/rest/top_meses").then(res => {
      this.setState({

          mes:res.data.data
        
      });
      //console.log(this.state.mes)


     });


    //  axios.get("http://127.0.0.1:8000/rest/top_meses").then(res => {
    //   this.setState({

    //       mes:res.data.data
        
    //   });
    //   //console.log(this.state.mes)


    //  });


    


     }

     

    render(){
        return(

            
            <>
            <h2>TOP 5 PRODUCTOS VENDIDOS:</h2>
            <ListaTopP data={this.state.top_5} />
            <br></br>
            <br></br>
          <MaxCantSold/>


            <br></br>

            <TopMeses data={this.state.enero}/>
            <br></br>
            <TopMeses data={this.state.febrero}/>
            <br></br>
            <TopMeses data={this.state.marzo}/>
            <br></br>
            <TopMeses data={this.state.abril}/><br></br>
            <TopMeses data={this.state.mayo}/><br></br>
            <TopMeses data={this.state.junio}/><br></br>
            <TopMeses data={this.state.julio}/><br></br>
            <TopMeses data={this.state.agosto}/><br></br>
            <TopMeses data={this.state.septiembre}/><br></br>
            <TopMeses data={this.state.octubre}/><br></br>
            <TopMeses data={this.state.noviembre}/><br></br>
            <TopMeses data={this.state.diciembre}/><br></br>

            <ListaTopPM data={this.state.top_prod_miembros} /><br></br>

            <ListaTopGenero data={this.state.hombres} /><br></br>
            <ListaTopGenero data={this.state.mujeres} /><br></br>
            <ListaTopGenero data={this.state.otros} /><br></br>

            <ListaTopEmp data={this.state.top_emp.algo} /><br></br>

            <ListaTopMiem data={this.state.top_miem.algo} /><br></br>
            
            <ListaTopClients data={this.state.best_cl} /><br></br>
            
            <ListaTopZones data={this.state.best_zones} /><br></br>
            
            <ListaTopDelivery data={this.state.best_del} /><br></br>

            <ListaTopFestividades data={this.state.navidad} /><br></br>
            <ListaTopFestividades data={this.state.hall} /><br></br>
            <ListaTopFestividades data={this.state.sval} /><br></br>


            <ListaTopProveedores data={this.state.prov} /><br></br>

            <ListaTopVentasxMes data={this.state.mes} />
          

            <br></br>
            <br></br>
            <SearchCategoryForm  />
            <br></br>
            <br></br>
            <SearchNameForm />
            <br></br>
            <br></br>
           <DateRangeForm/>
            </>
        )
    }



}

export default AdminData;