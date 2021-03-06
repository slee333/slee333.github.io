import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Front from "../Routes/Front"

const MainRoutes = () => (
  <Switch>
    <Route path="/" component={Front} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = () => <MainRoutes /> ;

export default AppRouter;
