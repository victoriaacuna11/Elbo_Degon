import React from "react";
import { List, message, Spin } from "antd";

import InfiniteScroll from "react-infinite-scroller";

class Categories extends React.Component {
  state = {
    data: this.props.data,
    loading: false,
    hasMore: true
  };

  //Para el loader infinito
  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true
    });
    if (data.length > 14) {
      message.warning("Infinite List loaded all");
      this.setState({
        hasMore: false,
        loading: false
      });
      return;
    }

    this.setState({
      data,
      loading: false
    });
  };

  //Busca si esta habilitado ese obj o no y regresa eso
  showMessage = id => {
    const stateCurrentObject = this.props.data.filter(x => x.id == id)[0]
      .availible;
    return stateCurrentObject === true ? "Habilitado" : "Deshabilitado";
  };

  //Busca si esta habilitado ese obj o no y regresa el color correspondiente
  colorStatus = id => {
    const stateCurrentObject = this.props.data.filter(x => x.id == id)[0]
      .availible;
    return stateCurrentObject === true
      ? "rgba(11,226,8,0.5)"
      : "rgba(233,5,5,0.5)";
  };

  render() {
    return (
      <>
        <h2>Categorías:</h2>
        <div className="demo-infinite-container">
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}
          >
            <List
              dataSource={this.props.data}
              renderItem={item => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    title={<a href={`category/${item.id}`}>{item.name}</a>}
                  />
                  <p
                    style={{
                      backgroundColor: this.colorStatus(item.id),
                      padding: 1,
                      borderStyle: "solid",
                      borderWidth: 1.5,
                      borderColor: this.colorStatus(item.id)
                    }}
                  >
                    {this.showMessage(item.id)}
                  </p>
                </List.Item>
              )}
            >
              {this.state.loading && this.state.hasMore && (
                <div className="demo-loading-container">
                  <Spin />
                </div>
              )}
            </List>
          </InfiniteScroll>
        </div>
      </>
    );
  }
}

export default Categories;
