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
import DeliveryListView from "./containers/deliveryViews/DeliveryListView";
import DeliveryDetail from "./containers/deliveryViews/DeliveryDetailView";
import PickupListView from "./containers/pickupViews/PickupListView";
import BatchListView from "./containers/BatchViews/BatchListView";
import BatchDetail from "./containers/BatchViews/BatchDetailView";
import PickupDetail from "./containers/pickupViews/PickupDetailView";
import ClientList from "./containers/clientViews/clientListView";
import ClientDetail from "./containers/clientViews/clientDetailView";
import TaxList from "./containers/taxViews/taxListView";
import TaxDetail from "./containers/taxViews/taxDetailView";

const BaseRouter = () => (
  <div>
    <Route exact path="/prov" component={ProviderList} />
    <Route exact path="/prov/:providerID" component={ProviderDetail} />
    <Route exact path="/prod" component={ProductList} />
    <Route exact path="/prod/:productID" component={ProductDetail} />
    <Route exact path="/delivery" component={DeliveryListView} />
    <Route exact path="/delivery/:deliveryID" component={DeliveryDetail} />
    <Route exact path="/pickup" component={PickupListView} />
    <Route exact path="/pickup/:pickupID" component={PickupDetail} />
    <Route exact path="/lotes" component={BatchListView} />
    <Route exact path="/lotes/:batchID" component={BatchDetail} />
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
    <Route exact path="/client" component={ClientList} />
    <Route exact path="/client/:clientID" component={ClientDetail} />
    <Route exact path="/tax" component={TaxList} />
    <Route exact path="/tax/:taxID" component={TaxDetail} />

    <Route exact path="/bill" component={BillList} />

    <Route exact path="/pay" component={PaymentList} />
    <Route exact path="/admin_info" component={AdminData} />
  </div>
);

export default BaseRouter;
