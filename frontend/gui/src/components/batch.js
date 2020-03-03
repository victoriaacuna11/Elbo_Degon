import React from "react";
import { List } from "antd";
import InfiniteScroll from "react-infinite-scroller";

const Lotes = props => {
    
    

  return (
    <div className="demo-infinite-container">
      <InfiniteScroll initialLoad={false} pageStart={0} useWindow={false}>
        <h2>Lotes</h2>
        <List
          dataSource={props.data}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                title= {<p> {item.product}---(e){item.elab}---(v){item.exp} </p>  }
               
              />
            </List.Item>
          )}
        ></List>
      </InfiniteScroll>
    </div>
  );
};
export default Lotes;