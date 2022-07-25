import React from 'react'
import AdministratorCardDogadjaj from './AdministratorCardDogadjaj';
import AdministratorCardLokacija from './AdministratorCardLokacija';
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import authService from '../api-authorization/AuthorizeService';
import AdminComment from './AdminComment';
import AdminComments from './AdminComments';
import AdminCardDrustvo from './AdminCardDrustvo';


export default function AdministratorStranica(props) {
    console.log(props);
    const [lokacijeZaPrihvatanje, setLokacijeZaPrihvatanje] = React.useState([]);
    const [dogadjajiZaPrihvatanje, setDogadjajiZaPrihvatanje] = React.useState([]);
    const [person, setPerson] = React.useState({
        id: props.id,
        ime: "",
        prezime: "",
        spremnost:0,
        email: "",
        profilnaSlika: "",
        phoneNumber:""
    });

    async function prihvati2(drustvoId){
      console.log(drustvoId);
      const res = await fetch("https://localhost:5001/PlaninarskoDrustvo/PromeniStanjeDrustva/" + drustvoId,{
          method:"PUT"
      });
      alert("Uspesno je kreirano novo drustvo");
      location.reload();
  }

  async function odbaci2(drustvoId){
      console.log("Nije proihvaceno");
      const res = await fetch("https://localhost:5001/PlaninarskoDrustvo/ObrisiDrustvo/" + drustvoId,{
          method:"DELETE"
      });
      alert("Drustvo je odbaceno!!");
      location.reload();
      
  }

    const prihvati1 = (dogId) => {
      const idDogadjaja = "1b19a562-06de-4676-8aaa-0317051244de";
        const res = fetch("https://localhost:5001/Dogadjaj/PromeniStanjeDogadjaja/" + dogId,
        {
          method: 'PUT'
        });
        alert("Dogadjaj je potvrdjen od strane administratora");
    }
    
    const odbaci1 = (dogId) => {
      const idDogadjaja = "1b19a562-06de-4676-8aaa-0317051244de";
        const res = fetch("https://localhost:5001/Dogadjaj/OtkaziDogadjaj/" + dogId,
        {
          method: 'DELETE'
        });
        alert("Dogadjaj nije bio lepo ogranizovan pa ga je administrator uklonio");
    }

    const prihvati = (lokId) => {
      const idDogadjaja = "1b19a562-06de-4676-8aaa-0317051244de";
        const res = fetch("https://localhost:5001/Planina/PromeniStanjePlanine/" + lokId,
        {
          method: 'PUT'
        });
        alert("Lokacija je potvrdjena od strane administratora");
        location.reload();
    }
    
    const odbaci = (lokId) => {
      const idDogadjaja = "1b19a562-06de-4676-8aaa-0317051244de";
        const res = fetch("https://localhost:5001/Planina/ObrisiPlaninu/" + lokId,
        {
          method: 'DELETE'
        });
        alert("Lokacija koju je korisnik dodao ne postoji pa je administrator uklnio");
        location.reload();
    }
    React.useEffect(() => {
        const getDg = async () => {
            const token = await authService.getAccessToken();
            const res = await fetch("https://localhost:5001/ApplicationUser/PreuzmiInformacijeKorisnika?id=" + props.id, {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            //setPerson(await res.json());
            /*console.log(await res.json());*/
            setPerson(await res.json());
        }
        getDg();
    }, [props.id]);
    React.useEffect(() => {
      const getDogadjaji = async () => {
        const res = await fetch("https://localhost:5001/Dogadjaj/PreuzmiSveNeodobreneDogadjaje");
        const getdata = await res.json();
        setDogadjajiZaPrihvatanje(getdata);
      }
      getDogadjaji();
    },[]);

    React.useEffect(() => {
      const getLokacije = async () => {
        const res = await fetch("https://localhost:5001/Planina/PreuzmiSveNeodobrenePlanine");
        const getdata = await res.json();
        setLokacijeZaPrihvatanje(getdata);
      }
      getLokacije();
    },[])

    const [prijaveUtisaka,setPrijaveUtsiaka] = React.useState([]);
    React.useEffect(() => {
      const getPrijave = async () => {
        const res = await fetch("https://localhost:5001/api/Prijava/VratiPrijaveUtisaka");
        const getdata = await res.json();
        console.log(getdata);
        setPrijaveUtsiaka(getdata);
        
      }
      getPrijave();
    },[]);

    const [drustva,setDrustva] = React.useState([]);
    React.useEffect(() => {
      const getPrijave = async () => {
        const res = await fetch("https://localhost:5001/PlaninarskoDrustvo/PruzmiSvaNeprihvacenaDrustva");
        const getdata = await res.json();
        console.log(getdata);
        setDrustva(getdata);
        
      }
      getPrijave();
    },[]);

    console.log(lokacijeZaPrihvatanje);
    console.log(person);
    console.log(dogadjajiZaPrihvatanje);
    return (
        <div>
            <section className="w3l-about-breadcrumb text-left">
                <div className="breadcrumb-bg breadcrumb-bg-about py-sm-5 py-4">
                    <div className="container">
                        <h2 className="title">ADMINISTRATOR</h2>
                    </div>
                </div>
            </section>


              <section className="grids-1 py-5">
  <div className="grids py-lg-5 py-md-4">
  <div className="container">
          <h3 className="hny-title mb-5 profKor">Lista lokacija koji treba da se provere</h3>
          <div className="row">
            {
              lokacijeZaPrihvatanje.map((element,index) => {
                return (
                  <div>
                  <NavItem>
                    <NavLink type={Link} to={`/planina/${element.id}`}>
                      <AdministratorCardLokacija podatak={element} key={element.id}/>
                    </NavLink>
                  </NavItem>
                  <div className='pomeriDesno'>
                        <button type='button' className='btn btn-style btn-secondary promeniBojuDugmetu' onClick={()=>prihvati(element.id)}>Prihvati</button>
                        <button type='button' className='btn btn-style btn-secondary' onClick={()=>odbaci(element.id)}>Odbaci</button>
                      </div>
                  </div>
                );
              })
            }
          </div>
      </div>
      <div className="container">
          <h3 className="hny-title mb-5 profKor">Lista događaja koji treba da se provere</h3>
          <div className="row">
            {
              dogadjajiZaPrihvatanje.map((element,index) => {
                return (
                  <div>
                  <NavItem>
                    <NavLink type={Link} to={`/dogadjaj/${element.id}`}>
                      <AdministratorCardDogadjaj podatak={element} key={element.id}/>
                    </NavLink>
                  </NavItem>
                  <div className='pomeriDesno'>
                        <button type='button' className='btn btn-style btn-secondary promeniBojuDugmetu' onClick={()=>prihvati1(element.id)}>Prihvati</button>
                        <button type='button' className='btn btn-style btn-secondary' onClick={()=>odbaci1(element.id)}>Odbaci</button>
                      </div>
                  </div>
                );
              })
            }
          </div>
      </div>
</div>
            <div>
              {/*<div className='listaPrijateljaa'>*/}
                <h3 className="hny-title mb-5 profKor">Prijave</h3>
              {/*</div>*/}
              <div>
                {/* {
                  prijaveUtisaka.forEach((element, index) => {
                    console.log(element);
                      return(  */}
                        <div>
                        <AdminComments />
                        </div>
                      {/* )
                  })
                } */}
              </div>
            </div>

            <div>
                <h3 className="hny-title mb-5 profKor">Planinarska drustva</h3>
              <div>
                {
                 
            <div className="container py-md-5 centriraj">
                <div className="ban-content-inf row  srediDrustva">
                    <div className="maghny-gd-1 srediDrustva">
            {drustva.map((slide, index) => {
              console.log(slide);
              return (
                <div className="srediDrus odvoji">
                <div className='pomeriDesno'>
            <button type='button' className='btn btn-style btn-secondary promeniBojuDugmetu' onClick={() => prihvati2(slide.id)}>Prihvati</button>
            <button type='button' className='btn btn-style btn-secondary' onClick={() => odbaci2(slide.id)}>Odbaci</button>
        </div>
                <NavItem>
                    <NavLink tag={Link} to={`/planinarskoDrustvo/${slide.id}`}>
                    <div className="maghny-gd-1 col-12 mt-4">
                                    <div className="maghny-grid">
                      <div key={index} className="srediDrus">
                        <AdminCardDrustvo dog={slide} />
                      </div>
                      </div>
                      </div>
                    </NavLink>
                  </NavItem>
                  
                  </div>
                  
              );
            })}
        </div>
        </div>
        </div>
        
                }
              </div>
            </div>
</section>
</div>
)
}
