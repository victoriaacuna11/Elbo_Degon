import React from "react";
import axios from "axios";
import { List } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import { fixControlledValue } from "antd/lib/input/Input";

class MonthEmployees extends React.Component {

  state = {
    employees: [],
  };

  getCI = (employees, employeeID) => {
      return employees.filter( e => (
        e.id == employeeID
      ))[0].ci;
  }

  
    componentDidMount(){
      axios.get('http://127.0.0.1:8000/rest/emp/').then(res => {
        this.setState({
          employees: res.data
        });
        console.log(this.state.employees)
      });

    }
      render(){
        
        return (
          <div className="demo-infinite-container">
            <InfiniteScroll initialLoad={false} pageStart={0} useWindow={false}>
              <h2>Empleados del Mes</h2>
              <List
                dataSource={this.props.data}
                renderItem={item => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      title={<a href={`memp/${item.id}`}> 
                      C.I. Empleado: {this.getCI(this.state.employees, item.employee)} ({item.month}-{item.year})
                      </a>}
                    />
                  </List.Item>
                )}
              ></List>
            </InfiniteScroll>
          </div>
        );
      };
    } 

export default MonthEmployees;