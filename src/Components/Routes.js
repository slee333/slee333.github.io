import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "../Routes/Main"

const MainRoutes = () => (
  <Switch>
    <Route path="/" component={Main} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = () => <MainRoutes /> ;

// AppRouter.propTypes = {
//   isLoggedIn: PropTypes.bool.isRequired
// };

export default AppRouter;
