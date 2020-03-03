import React from "react";
import axios from "axios";
import { Card } from "antd";
import ModifyCatForm from "../../components/categoryComponents/modifyCatForm";

class CategoryDetail extends React.Component {
  state = {
    category: {}
  };

  componentDidMount() {
    const categoryID = this.props.match.params.categoryID;
    axios.get(`http://127.0.0.1:8000/rest/category/${categoryID}`).then(res => {
      this.setState({
        category: res.data
      });
      console.log(this.state.category);
    });
  }

  render() {
    return (
      <>
        <h2>Producto:</h2>
        <Card
          title={this.state.category.name + " (" + this.state.category.id + ")"}
        ></Card>
        <br />
        <h2 style={{ marginLeft: 650 }}>Modificar Categoria:</h2>
        <ModifyCatForm categoryID={this.props.match.params.categoryID} />
      </>
    );
  }
}

export default CategoryDetail;
