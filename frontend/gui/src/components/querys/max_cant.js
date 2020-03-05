import React from "react";
import { Form, Input, Button, Select, InputNumber, Radio } from "antd";
import axios from "axios";
import { Route, Link ,Redirect} from "react-router-dom";
import PaymentList from "../../containers/PaymentListView"


const { Option } = Select;

const layout = {
  labelCol: {
    span: 11
  }
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};



class MaxCantSold extends React.Component {

    
  formRef = React.createRef();

  onFinish = values => {
    console.log(values);
  };

  

    state = {
        providers: [],
        category: [],
        currProd: {},
        data:[],
        redirect:null,
      };

  

  componentDidMount() {

  }


  
  handleFormSubmit = (event, requestType, productID) => {
    //event.preventDefault();


    const cant = event.Cant;
    //console.log(cant)
    
    //redirigir al componente con la info
    this.setState({redirect:`/admin_info/max/${cant}`})

    // axios.get(`http://127.0.0.1:8000/rest/cate/${name}`).then(res => {
    //    console.log('epa')
    //   this.setState({

    //       data:res.data.data
        
    //   });
    //   console.log(this.state.data)

  
    //  });
}
  
    onChange(value) {
            
      }



  render() {

        if (this.state.redirect){


            return <Redirect to={this.state.redirect}/>


        }


    return (

      <>

      <h2>PRODUCTOS QUE HAN VENDIDO MAS DE LA CANTIDAD INGRESADA</h2>
      <br></br>
      <br></br>

      <Form
        {...layout}
        ref={this.formRef}
        name="control-ref"
        onFinish={event =>
          this.handleFormSubmit(
            event,
            this.props.requestType,
            this.props.productID
          )
        }
      >
        <Form.Item
          name="Cant"
          rules={[
            {
              required: true
            }
          ]}
          label="Cantidad"
          key={this.state.currProd.product_name}
        >
          <Input
            name="name"
            type="number"
            defaultValue={this.state.currProd.product_name}
            onChange={this.onChange()}
            placeholder="Cantidad"
          />
        </Form.Item>


        <br />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Buscar
          </Button>
        </Form.Item>
      </Form>


      </>

    );
  };

 }





export default MaxCantSold;