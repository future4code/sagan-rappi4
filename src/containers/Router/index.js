import React from "react";
import { ConnectedRouter } from "connected-react-router";
import splashscreen from "../Login/splashscreen";
import loginPage from "../Login/loginPage";
// import signUpPage from "../SignUp/signUpPage";
import informAddressPage from "../Profile/informAdressPage";
import feedPage from "../Feed/feedPage";
import searchPage from "../Feed/searchPage";
import restaurantPage from "../Restaurant/restaurantPage";
import cartPage from "../Cart/cartPage";
import profilePage from "../Profile/profilePage";
import editProfilePage from "../Profile/editProfilePage";
import editAddressPage from "../Profile/editProfilePage";
import { Switch, Route } from "react-router-dom";

const routes = {
  root: "/",
  loginPage: "/login",
  signUpPage: "/signup",
  informAddressPage: "/informAdress",
  feedPage: "/feed",
  searchPage: "/search",
  restaurantPage: "/restaurant",
  cartPage: "/cart",
  profilePage: "/profile",
  editProfilePage: "/editProfile",
  editAddressPage: "/editAdress",

};

function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route exact path={routes.root} component={splashscreen} />
        <Route exact path={routes.loginPage} component={loginPage} />
        {/* <Route exact path={routes.signUpPage} component={signUpPage} /> */}
        <Route exact path={routes.informAddressPage} component={informAddressPage} />
        <Route exact path={routes.feedPage} component={feedPage} />
        <Route exact path={routes.searchPage} component={searchPage} />
        <Route exact path={routes.restaurantPage} component={restaurantPage} />
        <Route exact path={routes.cartPage} component={cartPage} />
        <Route exact path={routes.profilePage} component={profilePage} />
        <Route exact path={routes.editProfilePage} component={editProfilePage} />
        <Route exact path={routes.editAddressPage} component={editAddressPage} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;
