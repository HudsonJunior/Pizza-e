import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from "./pages/HomePage"
import TopNav from "./pages/TopNav"

ReactDOM.render(
  (
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component = {Home}/>
      </Switch>
    </App>
  </Router>
  ),
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
