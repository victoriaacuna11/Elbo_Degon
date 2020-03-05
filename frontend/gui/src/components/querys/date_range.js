import React from "react";
import { Form, Input, Button, Select, InputNumber, Radio ,DatePicker} from "antd";
import axios from "axios";
import { Route, Link ,Redirect} from "react-router-dom";
import PaymentList from "../../containers/PaymentListView";
//import Calendar from "react-calendar";
import moment from "moment";


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



class DateRangeForm extends React.Component {

    
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


    const start = moment(event.start).format("YYYY-MM-DD");
    const end = moment(event.end).format("YYYY-MM-DD");

   // console.log(start)
    //console.log(end)
    

    this.setState({redirect:`/admin_info/dates/${start}/${end}`})




    
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

      <h2>BUSQUEDA POR FECHAS</h2>
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
         <Form.Item label="DatePickerstart" name="start">
          <DatePicker />
        </Form.Item>


        <br />
        

        <Form.Item label="DatePickerend" name="end">
          <DatePicker />
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





export default DateRangeForm;
