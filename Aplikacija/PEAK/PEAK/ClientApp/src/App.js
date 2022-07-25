import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import  Home    from "./components/Home";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./components/api-authorization/ApiAuthorizationConstants";
import NavBar from "./components/NavBar/NavBar";
import "./custom.css";
import ImageSlider from "./components/NaseKomponente/ImageSlider";
import { SliderData } from "./components/NaseKomponente/SliderData";
import HomeGridDogadjaji from "./components/NaseKomponente/HomeGridDogadjaji";
import  Dogadjaj  from "./components/StranicaDogadjaj"
import StranicaDog from "./components/Dogadjaj"
import  StranicaPlanine  from "./components/StranicaPlanine";
import StranicaPlaninarskihDrustava from "./components/StranicaPlaninarskihDrustava";
import StranicaPlaninarskogDrustva from "./components/StranicaPlaninarskogDrustva";
import StranicProfilKorisnika from './components/StranicaProfilKorisnika';
import StranicLicniProfilKorisnika from './components/StranicLicniProfilKorisnika';
import StranicaONama from "./components/StranicaONama";
import StranicaAdministrator from "./components/StranicaAdministrator";
import AdministratorStranica from "./components/NaseKomponente/AdministratorStranica";
import AdminStranaDogadjaji from "./components/AdminStranaDogadjaji";
import AdminPocetnaStrana from "./components/AdminPocetnaStrana";
import HomeF from "./components/HomeF";
import StranicaDogadjajObicanKorisnik from "./components/StranicaDogadjajObicanKorisnik";
import ObicanKorisnikDogadjaj from "./components/NaseKomponente/ObicanKorisnikDogadjaj";
import StranicaDrustvaObicanKorisnik from "./components/StranicaDrustvaObicanKorisnik";
import StranicaProfilObicnogKorisnika from "./components/StranicaProfilObicnogKorisnika";
import StranicaPlaninarskoDrustvoProfil from "./components/StranicaPlaninarskoDrustvoProfil";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div>
        <Layout>
                <Route exact path="/" component={Home} />
                <Route path="/dogadjajiStranica" component={ StranicaDog } />
                <Route path="/dogadjaji" component={Dogadjaj} />
                <Route path="/dogadjaj/:dogadjajId" component={Dogadjaj} />
                <Route path="/planina/:planinaId" component={ StranicaPlanine } />
                <Route path="/planinarskaDrustva" component={StranicaPlaninarskihDrustava} />
                <Route path="/planinarskoDrustvo/:drustvoId" component={StranicaPlaninarskogDrustva} />
                <Route path="/administratorDogadjaji" component={AdminStranaDogadjaji} />
                {/*<Route path="/profilKorisnika/:korisnikId" component={StranicProfilKorisnika} />*/}
                {/*<Route path="/profilKorisnika" component={StranicProfilKorisnika} />*/}
                <Route path="/profilKorisnika/:korisnikId" component={StranicProfilKorisnika} />
                <Route path="/profil" component={StranicLicniProfilKorisnika} />
                {/*TEST*/}
                <Route path="/oNama" component={StranicaONama} />
                <Route path="/administrator" component={StranicaAdministrator} />
                <Route path="/administratorPocetna" component={AdminPocetnaStrana} />
                <Route path="/korisnikDogadjaj/:dogadjajId" component={StranicaDogadjajObicanKorisnik} />
                <Route path="/korisnikDrustvo/:drustvoId" component={StranicaDrustvaObicanKorisnik} />
                <Route path="/profilObicnogKorisnika/:korisnikId" component={StranicaProfilObicnogKorisnika} />
                <Route path="/planinarskoDrustvoProfil/:drustvoId" component={StranicaPlaninarskoDrustvoProfil} />
          <AuthorizeRoute path="/fetch-data" component={FetchData} />
          <Route
            path={ApplicationPaths.ApiAuthorizationPrefix}
            component={ApiAuthorizationRoutes}
          />
        </Layout>
        {/* <ImageSlider slides={SliderData} /> */}


      </div>
    );
  }
}
