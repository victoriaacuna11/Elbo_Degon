import React from "react";
import axios from "axios";
import Locals from "../../components/localComponents/locals";
import LocalForm from "../../components/localComponents/localForm";

class LocalList extends React.Component {
  state = {
    locals: []
  };

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/rest/local/").then(res => {
      this.setState({
        locals: res.data
      });
    });
  }

  render() {
    return (
      <>
        <Locals data={this.state.locals} />
        <br />
        <h2>Crear un Local</h2>
        <LocalForm localID={null} />
      </>
    );
  }
}

export default LocalList;
