import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes';
import renderRouter from './renderRouter';

class RouteConfig extends Component<{}> {
  public state = {
    Routes: []
  };
  public componentDidMount() {
    this.setState({
      Routes: renderRouter({ routes })
    });
  }
  public render() {
    return <BrowserRouter>{this.state.Routes}</BrowserRouter>;
  }
}

export default RouteConfig;
