import React from "react";
import { Route } from "react-router-dom";
import ProductList from "./containers/productViews/ProductListView";
import ProductDetail from "./containers/productViews/ProductDetailView";
import ProviderList from "./containers/providerViews/ProviderListView";
import ProviderDetail from "./containers/providerViews/ProviderDetailView";
import BillList from "./containers/BillListView";
import MonthEmployeeList from "./containers/MonthEmployeeListView";
import EmployeeList from "./containers/employeesViews/EmployeesListView";
import EmployeeDetail from "./containers/employeesViews/EmployeeDetailView";
import LocalList from "./containers/LocalViews/LocalListView";
import CurrencyExchangeList from "./containers/CurrencyExchangesListView";
import CategoryList from "./containers/categoryViews/CategoryListView";
import CategoryDetail from "./containers/categoryViews/CategoryDetailView";
import ZoneList from "./containers/ZoneListView";
import PaymentList from "./containers/PaymentListView";
import LocalDetail from "./containers/LocalViews/LocalDetailView";

const BaseRouter = () => (
  <div>
    <Route exact path="/prov" component={ProviderList} />
    <Route exact path="/prov/:providerID" component={ProviderDetail} />
    <Route exact path="/prod" component={ProductList} />
    <Route exact path="/prod/:productID" component={ProductDetail} />
    <Route exact path="/category" component={CategoryList} />
    <Route exact path="/category/:categoryID" component={CategoryDetail} />
    <Route exact path="/emp" component={EmployeeList} />
    <Route exact path="/emp/:employeeID" component={EmployeeDetail} />
    <Route exact path="/local" component={LocalList} />
    <Route exact path="/local/:localID" component={LocalDetail} />
    <Route exact path="/bill" component={BillList} />
    <Route exact path="/memp" component={MonthEmployeeList} />
    <Route exact path="/currency" component={CurrencyExchangeList} />
    <Route exact path="/zone" component={ZoneList} />
    <Route exact path="/pay" component={PaymentList} />
  </div>
);

export default BaseRouter;
