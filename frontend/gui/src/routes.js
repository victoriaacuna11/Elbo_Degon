import React from "react";
import { Route } from "react-router-dom";
import ProductList from "./containers/ProductListView";
import ProductDetail from "./containers/ProductDetailView";
import ProviderList from "./containers/ProviderListView";
import ProviderDetail from "./containers/ProviderDetailView";
import AdminData from "./components/querys"

const BaseRouter = () => (
  <div>
    <Route exact path="/prov" component={ProviderList} />
    <Route exact path="/" component={ProductList} />
    <Route exact path="/prod/:productID" component={ProductDetail} />
    <Route exact path="/prov/:providerID" component={ProviderDetail} />
    <Route exact path="/admin_info" component={AdminData} />
  </div>
);

export default BaseRouter;
