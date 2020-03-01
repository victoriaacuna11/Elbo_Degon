import React from "react";
import { Route } from "react-router-dom";
import ProductList from "./containers/ProductListView";
import ProductDetail from "./containers/ProductDetailView";
import ProviderList from "./containers/ProviderListView";
import ProviderDetail from "./containers/ProviderDetailView";
import BillList from "./containers/BillListView";
import MonthEmployeeList from './containers/MonthEmployeeList';

const BaseRouter = () => (
  <div>
    <Route exact path="/prov" component={ProviderList} />
    <Route exact path="/prod" component={ProductList} />
    <Route exact path="/prod/:productID" component={ProductDetail} />
    <Route exact path="/prov/:providerID" component={ProviderDetail} />
    <Route exact path="/bill" component={BillList}/>
    <Route exact path="/memp" component={MonthEmployeeList}/>
  </div>
);

export default BaseRouter;
