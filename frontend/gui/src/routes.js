import React from "react";
import { Route } from "react-router-dom";
import ProductList from "./containers/ProductListView";
import ProductDetail from "./containers/ProductDetailView";
import ProviderList from "./containers/ProviderListView";
import ProviderDetail from "./containers/ProviderDetailView";
import BillList from "./containers/BillListView";
import MonthEmployeeList from './containers/MonthEmployeeListView';
import EmployeeList from './containers/EmployeesListView';
import LocalList from './containers/LocalListView';
import CurrencyExchangeList from './containers/CurrencyExchangesListView';
import CategoryList from './containers/CategoryListView';
import ZoneList from './containers/ZoneListView';
import PaymentList from './containers/PaymentListView';
import AdminData from "./components/querys"
import DeliveryListView from "./containers/DeliveryListView"
import PickupListView from "./containers/PickupListView"
import BatchListView from "./containers/Batch.ListView"
import SearchListVies from "./containers/SearchCatList"
import SearchCatList from "./containers/SearchCatList";
import SearchNameList from "./containers/SearchNameList";
import RangeDateList from "./containers/RangeDateList";
import Charts from "./containers/AdminInfoChats";


const BaseRouter = () => (
  <div>
    <Route exact path="/prov" component={ProviderList} />
    <Route exact path="/prod" component={ProductList} />
    <Route exact path="/prod/:productID" component={ProductDetail} />
    <Route exact path="/prov/:providerID" component={ProviderDetail} />
    <Route exact path="/bill" component={BillList}/>
    <Route exact path="/memp" component={MonthEmployeeList}/>
    <Route exact path="/emp" component={EmployeeList}/>
    <Route exact path="/local" component={LocalList}/>
    <Route exact path="/currency" component={CurrencyExchangeList}/>
    <Route exact path="/category" component={CategoryList}/>
    <Route exact path="/zone" component={ZoneList}/>
    <Route exact path="/pay" component={PaymentList}/>
    
    <Route exact path="/admin_info" component={AdminData} />
    <Route exact path="/delivery" component={DeliveryListView} />
    <Route exact path="/pickup" component={PickupListView} />
    <Route exact path="/lotes" component={BatchListView} />





    <Route exact path="/admin_info/cate/:category" component={SearchCatList} />
    <Route exact path="/admin_info/name/:name" component={SearchNameList} />
    <Route exact path="/admin_info/dates/:start/:end" component={RangeDateList} />



    <Route exact path="/admin_info/charts" component={Charts} />



    





    
  </div>
);

export default BaseRouter;
