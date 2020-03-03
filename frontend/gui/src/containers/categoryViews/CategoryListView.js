import React from "react";
import axios from "axios";
import Categories from "../../components/categoryComponents/categories";
import CatForm from "../../components/categoryComponents/categoryForm";

class CategoryList extends React.Component {
  state = {
    categories: []
  };

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/rest/category/").then(res => {
      this.setState({
        categories: res.data
      });
    });
  }

  render() {
    return (
      <>
        <Categories data={this.state.categories} />
        <br />
        <h2>Crear una Categoria</h2>
        <CatForm productID={null} />
      </>
    );
  }
}

export default CategoryList;
