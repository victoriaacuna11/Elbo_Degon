import React from "react";
import { List } from "antd";
import InfiniteScroll from "react-infinite-scroller";

const ListaTopPM = props => {
    
    //console.log(props.data);

  return (
    <div className="demo-infinite-container">
      <InfiniteScroll initialLoad={false} pageStart={0} useWindow={false}>
        <h2>TOP 5 PRODUCTOS COMPRADOS POR MIEMBROS:</h2>
        <List
          dataSource={props.data}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                title= {<p> {item.id}°   {item.name}---Cantidad: {item.cant} </p>  }
               
              />
            </List.Item>
          )}
        ></List>
      </InfiniteScroll>
    </div>
  );
};


export default ListaTopPM;