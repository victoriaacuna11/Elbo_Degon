import React from "react";
import axios from "axios";
import Productss from "../../components/productComponents/products";
import PForm from "../../components/productComponents/productForm";

class ProductList extends React.Component {
  state = {
    products: []
  };

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/rest/prod/").then(res => {
      this.setState({
        products: res.data
      });
      console.log(this.state.products);
    });
  }

  render() {
    return (
      <>
        <Productss data={this.state.products} loading={false} hasMore={true} />
        <br />
        <h2 style={{ marginLeft: 650 }}>Crear un producto</h2>
        <PForm productID={null} />
      </>
    );
  }
}

export default ProductList;
