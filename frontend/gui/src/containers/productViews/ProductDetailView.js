import React from "react";
import axios from "axios";
import { Card } from "antd";
import ModifyPForm from "../../components/productComponents/modifyPForm";

class ProductDetail extends React.Component {
  state = {
    product: {},
    provider: {},
    category: {}
  };

  componentDidMount() {
    const productID = this.props.match.params.productID;
    axios.get(`http://127.0.0.1:8000/rest/prod/${productID}`).then(res => {
      this.setState({
        product: res.data
      });
      axios
        .get(`http://127.0.0.1:8000/rest/prov/${this.state.product.provider}`)
        .then(res => {
          this.setState({
            provider: res.data
          });
          console.log(this.state.provider);
        });

      axios
        .get(
          `http://127.0.0.1:8000/rest/category/${this.state.product.category}`
        )
        .then(res => {
          this.setState({
            category: res.data
          });
          console.log(this.state.category);
        });
    });
  }

  render() {
    return (
      <>
        <h2>Producto:</h2>
        <Card
          title={
            this.state.product.product_name + " (" + this.state.product.id + ")"
          }
        >
          <p>
            Proveedor: {this.state.provider.name} ({this.state.provider.id})
          </p>
          <p>
            Categoria: {this.state.category.name} ({this.state.category.id})
          </p>
          <p>Pasillo: {this.state.product.hall}</p>
        </Card>
        <br />
        <h2 style={{ marginLeft: 650 }}>Modificar Producto:</h2>
        <ModifyPForm productID={this.props.match.params.productID} />
      </>
    );
  }
}

export default ProductDetail;
