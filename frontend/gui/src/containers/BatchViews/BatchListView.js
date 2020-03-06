import React from "react";
import axios from "axios";
import Lotes from "../../components/batchComponents/batch";
import BatchForm from "../../components/batchComponents/batchForm";

class BatchListView extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/rest/vista_lotes").then(res => {
      this.setState({
        data: res.data.data
      });
      console.log(this.state.data);
    });
  }

  render() {
    return (
      <>
        <Lotes data={this.state.data} />
        <br />
        <h2 style={{ marginLeft: 650 }}>Crear un lote</h2>
        <BatchForm batchID={null} />
      </>
    );
  }
}

export default BatchListView;
