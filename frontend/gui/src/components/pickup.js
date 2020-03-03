import React from "react";
import { List } from "antd";
import InfiniteScroll from "react-infinite-scroller";

const Pickup = props => {
    
    //console.log(props.data);

  return (
    <div className="demo-infinite-container">
      <InfiniteScroll initialLoad={false} pageStart={0} useWindow={false}>
        <h2>PickUps</h2>
        <List
          dataSource={props.data}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                title= {<p> CI: {item.ci}------- fecha: {item.date} </p>  }
               
              />
            </List.Item>
          )}
        ></List>
      </InfiniteScroll>
    </div>
  );
};
export default Pickup;