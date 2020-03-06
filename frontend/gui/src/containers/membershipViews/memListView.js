import React from "react";
import axios from "axios";
import Membership from "../../components/membershipComponents/membership";

class MemList extends React.Component {
  state = {
    data: [],
    clientss: [],
    w: 0
  };

  componentDidMount() {
    // const v = this.props.match.params.clients;
    // console.log(v);
    axios.get("http://127.0.0.1:8000/rest/qwill2").then(res => {
      this.setState({
        data: res.data.data
      });
      console.log(this.state.data);
    });

    axios.get("http://127.0.0.1:8000/rest/client").then(res => {
      this.setState({
        clientss: res.data
      });
      console.log(this.state.clientss);
      this.setState({
        w: this.state.clientss[this.state.clientss.length - 1].id
      });
    });
  }

  render() {
    return (
      <>
        <Membership data={this.state.data} />
      </>
    );
  }
}

export default MemList;
