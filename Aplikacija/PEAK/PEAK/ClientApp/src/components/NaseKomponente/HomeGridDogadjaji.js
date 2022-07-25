import React from "react";
import { Link, NavLink } from "react-router-dom";
import HomeCardDogadjaji from "./HomeCardDogadjaji";
import { SliderData } from "./SliderData";
import {
    Collapse,
    Container,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
} from "reactstrap";

function HomeGridDogadjaji() {
  const [dogadjaj, setDogadjaj]=React.useState([]);
  const [brojDogadjaja, setBrojDogadjaja] = React.useState(dogadjaj.length);
  const [popularni, setPopularni] = React.useState([]);
  // React.useEffect(() => {
  //   const getdogadjaj = async() =>{
  //     const res = await fetch("https://localhost:5001/Dogadjaj/PreuzmiDogadjaje");
  //     const getdata = await res.json();
  //     setDogadjaj(getdata);
  //     console.log(getdata);
  //   }
  //   getdogadjaj();
    
  // },[])

  React.useEffect(() => {
    const getpopularni = async() =>{
      let n = 5;
      const res = await fetch("https://localhost:5001/Dogadjaj/PreuzmiPopularneDogadjaje/"+n);
      const getdata = await res.json();
      setPopularni(getdata);
      console.log("popularni dogadjaji");
      console.log(getdata);
    }
    getpopularni();
    
  },[])

  return (
    <div>
      <div className="best-rooms py-5">
        <div className="container py-md-5">
          <div className="title-content text-left mb-lg-5 mb-4">
            <h6 className="sub-title">Poseti</h6>
            <h4 className="hny-title">Najpopularniji dogadjaji</h4>
          </div>
          <div className="najpop">
            <div className="maghny-gd-1 col-lg-6 izjednaci">
              {popularni.map((slide, index) => {
                console.log("MOJI DOGADJAJJI"+slide.dogadjaj)
                if (index === 0) {
                    return (

                    <NavItem>
                            <NavLink tag={Link} to={`/dogadjaj/${slide.dogadjaj.id}`}>
                            <div className="maghny-grid">
                                <HomeCardDogadjaji dogadjaj={slide.dogadjaj} slika={slide.dogadjaj.slikaDogadjaja}/>
                            </div>
                        </NavLink>
                    </NavItem>
                  );
                }
              })}
            </div>


            <div className="maghny-gd-1 col-lg-6 mt-lg-0 mt-4">
              <div className="row">
                {popularni.map((slide, index) => {
                  console.log("MOJI DOGADJAJI 2"+slide.dogadjaj)
                  if (index !== 0) {
                      return (
                          <NavItem>
                              <NavLink tag={Link} to={`/dogadjaj/${slide.dogadjaj.id}`}>
                                <div className="maghny-gd-1 col-6 mt-4">
                                    <div className="maghny-grid">
                                        <HomeCardDogadjaji dogadjaj={slide.dogadjaj} slika={slide.dogadjaj.slikaDogadjaja}/>
                                    </div>
                                </div>
                              </NavLink>
                          </NavItem>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeGridDogadjaji;
