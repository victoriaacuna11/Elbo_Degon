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





class AdminData extends React.Component{


    state={

        top_5:[],



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

            <ListaTopP data={this.state.top_5} />
            

            <TopMeses data={this.state.enero}/>
            <TopMeses data={this.state.febrero}/>
            <TopMeses data={this.state.marzo}/>
            <TopMeses data={this.state.abril}/>
            <TopMeses data={this.state.mayo}/>
            <TopMeses data={this.state.junio}/>
            <TopMeses data={this.state.julio}/>
            <TopMeses data={this.state.agosto}/>
            <TopMeses data={this.state.septiembre}/>
            <TopMeses data={this.state.octubre}/>
            <TopMeses data={this.state.noviembre}/>
            <TopMeses data={this.state.diciembre}/>

            <ListaTopPM data={this.state.top_prod_miembros} />

            <ListaTopGenero data={this.state.hombres} />
            <ListaTopGenero data={this.state.mujeres} />
            <ListaTopGenero data={this.state.otros} />

            <ListaTopEmp data={this.state.top_emp.algo} />

            <ListaTopMiem data={this.state.top_miem.algo} />
            
            <ListaTopClients data={this.state.best_cl} />
            
            <ListaTopZones data={this.state.best_zones} />
            
            <ListaTopDelivery data={this.state.best_del} />

            <ListaTopFestividades data={this.state.navidad} />
            <ListaTopFestividades data={this.state.hall} />
            <ListaTopFestividades data={this.state.sval} />


            <ListaTopProveedores data={this.state.prov} />

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