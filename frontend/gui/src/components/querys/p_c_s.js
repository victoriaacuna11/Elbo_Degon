import React from "react";
import { List } from "antd";
import InfiniteScroll from "react-infinite-scroller";

const P_C_S = props => {
    
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
                title= {<p> {item.product} </p>  }
               
              />
            </List.Item>
          )}
        ></List>
      </InfiniteScroll>
    </div>
  );
};
export default P_C_S;