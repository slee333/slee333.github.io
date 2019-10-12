import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "../Routes/Main"

const LoggedInRoutes = () => (
  <Switch>
    <Route path="/" component={Main} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = () => <LoggedInRoutes /> ;

// AppRouter.propTypes = {
//   isLoggedIn: PropTypes.bool.isRequired
// };

export default AppRouter;
