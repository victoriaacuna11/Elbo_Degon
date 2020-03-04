import React from "react";
import { Route } from "react-router-dom";
import ProductList from "./containers/productViews/ProductListView";
import ProductDetail from "./containers/productViews/ProductDetailView";
import ProviderList from "./containers/providerViews/ProviderListView";
import ProviderDetail from "./containers/providerViews/ProviderDetailView";
import BillList from "./containers/BillListView";
import MonthEmployeeList from "./containers/monthEmpViews/MonthEmployeeListView";
import MEDetail from "./containers/monthEmpViews/MonthEmployeeDetailView";
import EmployeeList from "./containers/employeesViews/EmployeesListView";
import EmployeeDetail from "./containers/employeesViews/EmployeeDetailView";
import LocalList from "./containers/LocalViews/LocalListView";
import CurrencyExchangesList from "./containers/currencyExchangeViews/CeListView";
import CurrencyExchangeDetail from "./containers/currencyExchangeViews/CeDetailView";
import CategoryList from "./containers/categoryViews/CategoryListView";
import CategoryDetail from "./containers/categoryViews/CategoryDetailView";
import ZoneList from "./containers/zoneViews/ZoneListView";
import PaymentList from "./containers/PaymentListView";
import LocalDetail from "./containers/LocalViews/LocalDetailView";
import ZoneDetail from "./containers/zoneViews/ZoneDetailView";
import AdminData from "./components/querys";
import DeliveryListView from "./components/querys";
import PickupListView from "./containers/pickupViews/PickupListView";
import BatchListView from "./components/querys";
import PickupDetail from "./containers/pickupViews/PickupDetailView";

const BaseRouter = () => (
  <div>
    <Route exact path="/prov" component={ProviderList} />
    <Route exact path="/prov/:providerID" component={ProviderDetail} />
    <Route exact path="/prod" component={ProductList} />
    <Route exact path="/prod/:productID" component={ProductDetail} />
    <Route exact path="/prov/:providerID" component={ProviderDetail} />
    <Route exact path="/admin_info" component={AdminData} />
    <Route exact path="/delivery" component={DeliveryListView} />
    <Route exact path="/pickup" component={PickupListView} />
    <Route exact path="/pickup/:pickupID" component={PickupDetail} />
    <Route exact path="/lotes" component={BatchListView} />
    <Route exact path="/category" component={CategoryList} />
    <Route exact path="/category/:categoryID" component={CategoryDetail} />
    <Route exact path="/emp" component={EmployeeList} />
    <Route exact path="/emp/:employeeID" component={EmployeeDetail} />
    <Route exact path="/local" component={LocalList} />
    <Route exact path="/local/:localID" component={LocalDetail} />
    <Route exact path="/zone" component={ZoneList} />
    <Route exact path="/zone/:zoneID" component={ZoneDetail} />
    <Route exact path="/currency" component={CurrencyExchangesList} />
    <Route
      exact
      path="/currency/:currencyID"
      component={CurrencyExchangeDetail}
    />
    <Route exact path="/memp" component={MonthEmployeeList} />
    <Route exact path="/memp/:employeeID" component={MEDetail} />
    <Route exact path="/bill" component={BillList} />

    <Route exact path="/pay" component={PaymentList} />
  </div>
);

export default BaseRouter;
