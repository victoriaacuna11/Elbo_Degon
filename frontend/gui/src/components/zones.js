import React from "react";
import axios from "axios";
import { List } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import { fixControlledValue } from "antd/lib/input/Input";

class Zones extends React.Component {
  render() {
    return (
      <div className="demo-infinite-container">
        <InfiniteScroll initialLoad={false} pageStart={0} useWindow={false}>
          <h2>Zonas</h2>
          <List
            dataSource={this.props.data}
            renderItem={item => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={
                    <a href={`zone/${item.id}`}>
                      {item.name} (Costo del delivery: {item.cost})
                    </a>
                  }
                />
              </List.Item>
            )}
          ></List>
        </InfiniteScroll>
      </div>
    );
  }
}

export default Zones;
