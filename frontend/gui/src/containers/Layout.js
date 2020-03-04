import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
const { Header, Content } = Layout;

const ProductLayout = props => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          defaultSelectedKeys={[]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">
            <Link to="/prov">Proveedores</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/prod">Productos</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/lotes">Lotes</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/bill">Facturas</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/delivery">Deliverys</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/pickup">Pick Ups</Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to="/pay">Pagos</Link>
          </Menu.Item>
          <Menu.Item key="8">
            <Link to="/zone">Zonas</Link>
          </Menu.Item>
          <Menu.Item key="9">
            <Link to="/category">Categorías</Link>
          </Menu.Item>
          <Menu.Item key="10">
            <Link to="/currency">Tasas de cambio</Link>
          </Menu.Item>
          <Menu.Item key="11">
            <Link to="/local">Locales</Link>
          </Menu.Item>
          <Menu.Item key="12">
            <Link to="/emp">Empleados</Link>
          </Menu.Item>
          <Menu.Item key="13">
            <Link to="/memp">Empleados del Mes</Link>
          </Menu.Item>
          <Menu.Item key="14">
            <Link to="/client">Clientes</Link>
          </Menu.Item>
          <Menu.Item key="15">
            <Link to="/tax">Impuestos</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/">List</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">{props.children}</div>
      </Content>
    </Layout>
  );
};
export default ProductLayout;
