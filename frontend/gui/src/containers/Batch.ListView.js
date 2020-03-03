import React from "react";
import axios from "axios";
import Lotes from "../components/batch"



class BatchListView extends React.Component {
    state = {
      data: [],
    };

    componentDidMount() {
        axios.get("http://127.0.0.1:8000/rest/vista_lotes").then(res => {
          this.setState({
  
            data: res.data.data
  
          });
          console.log(this.state.data)
        });
      }
  
    render() {
      return (

        <>
          
          <Lotes data={this.state.data} />
          <br />
          
        </>
      );
    }
  }
  
  export default BatchListView;