import React from "react";
import axios from "axios";
import Categories from "../components/categories";


class CategoryList extends React.Component {
    state = {
      categories: [],
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
          <Categories data={this.state.categories}/>
          <br />
          {/* <h2>Crear un producto</h2>
          <PForm requestType="post" productID={null} buttonText="Crear" /> */}
        </>
      );
    }
  }
  
  export default CategoryList;