import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import "./App.css";
import "antd/dist/antd.css";
import Layout from "./containers/Layout";

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <BaseRouter />
        </Layout>
      </Router>
    </div>
  );
}
export default App;
