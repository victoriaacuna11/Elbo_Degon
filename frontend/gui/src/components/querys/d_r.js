import React from "react";
import { List } from "antd";
import InfiniteScroll from "react-infinite-scroller";

const D_R = props => {
    
    //console.log(props.data);

  return (
    <div className="demo-infinite-container">
      <InfiniteScroll initialLoad={false} pageStart={0} useWindow={false}>
        <h2>TOP 5 CLIENTES:</h2>
        <List
          dataSource={props.data.data}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                title= {<p> {item.id}°   {item.product}---Cantidad: {item.cant} </p>  }
               
              />
            </List.Item>
          )}
        ></List>
      </InfiniteScroll>
    </div>
  );
};
export default D_R;