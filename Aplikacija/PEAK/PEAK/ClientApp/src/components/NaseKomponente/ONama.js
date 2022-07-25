import React from 'react'
import LoaderAnim from "./LoaderAnim";
import slika2 from './images/sliderSlika2.jpg';


export default function ONama() {
    const [loading, setLoading] = React.useState([]);
    const [statistika, setStatistika] = React.useState({});
    //React.useEffect(() => {
    //setLoading(true);
    //setTimeout(()=>{
    //    setLoading(false);
    //},500);
    //}, [])
    React.useEffect(() => {
        setLoading(true);
        const getucesnici = async () => {
            const res = await fetch("https://localhost:5001/Dogadjaj/VratiStatistiku");
            const getdata = await res.json();
            setStatistika(getdata);
            console.log(getdata);
            setLoading(false);
        }
        getucesnici();
    }, [])

  return (
    <div>
      {loading?
      (<LoaderAnim/>):
        (<div><section class="w3l-cta4 py-5">
      <div class="container py-lg-5">
        <div class="ab-section text-center">
          <h6 class="sub-title">O nama</h6>
          <h3 class="hny-title profKor">Najlepsi pogled dolazi posle najtezeg uspona.</h3>
          <p class="py-3 mb-3">Kada sve izgleda kao da se stalno penjes uz
          planinu, samo razmisljaj o pogledu sa vrha.</p>
        </div>
        <div class="row mt-5">
          <div class="col-md-9 mx-auto">
            <img src={slika2} class="img-fluid" alt="" />
          </div>
        </div>
      </div>
  </section>
   <section class="w3l-content-6 py-5">
    <div class="container py-lg-5">
      <div class="row">
        <div class="col-lg-6 content-6-left pr-lg-5">
          <h6 class="sub-title">Krenite sa nama u nove avanture!</h6>
          <h3 class="hny-title profKor">Sreca je putovanje, a ne destinacija.</h3>
        </div>
        <div class="col-lg-6 content-6-right mt-lg-0 mt-4">
          <p class="mb-3">Planine su mesto na kojem možete zameniti život za beskrajno blaženstvo.</p>
            <p class="mb-3">“Divljina nije luksuz, već nužnost ljudskog duha i vitalna je za naše živote kao voda i izvrstan hleb.” – Edward Abbey</p>
        </div>
      </div>
    </div>
</section>
<section class="w3l-grids1">
  <div class="hny-three-grids py-5">
    <div class="container py-lg-5">
      <div class="row">
        <div class="col-md-4 col-sm-6 mt-0 grids5-info">
          <img src="https://i.postimg.cc/xT7Whgbr/Destinacija-ONama-Slika.jpg" class="img-fluid" alt="" />
          <h5>Sta vam nudimo?</h5>
          <h4><a href="#url">Popularne destinacije</a></h4>
          <p>Nudimo odlazak na mesta sa najlepsim pejzazima.</p>
        </div>
        <div class="col-md-4 col-sm-6 mt-sm-0 mt-5 grids5-info">
          <img src="https://i.postimg.cc/2SgrdrxZ/Avanture-ONama-Slika.jpg" class="img-fluid" alt="" />
          <h5>Sta vam nudimo?</h5>
          <h4><a href="#url"> 
            Nezaboravne avanture</a></h4>
          <p>Interesantni dogadjaji koje organizujemo pruzaju nezaboravno iskustvo.</p>
        </div>
        <div class="col-md-4 col-sm-6 mt-md-0 mt-5 grids5-info">
        <img src="https://i.postimg.cc/5yDCdZVQ/Prijateljstvo-ONama-Slika.jpg" class="img-fluid" alt="" />
          <h5>Sta vam nudimo?</h5>
          <h4><a href="#url">Druzenje sa prijateljima</a></h4>
          <p>Sve je lepse u drustvu dragih osoba. Pridruzite nam se i pozovite svoje prijatelje kako bi stvorili najlepse uspomene.</p>
        </div>
      </div>
    </div>
  </div>
</section>
  <section class="w3l-statshny py-5" id="stats">
    <div class="container py-lg-5 py-md-4">
      <div class="w3-stats-inner-info">
        <div class="row">
          <div class="col-lg-4 col-6 stats_info counter_grid text-left padL10">
            <span class="fa fa-smile-o"></span>
            <p class="counter">{!statistika ? 26 : statistika.brKorisnika}</p>
            <h4>Zadovoljnih korisnika</h4>
          </div>
          <div class="col-lg-4 col-6 stats_info counter_grid1 text-left padL10">
            <span class="fa fa-map"></span>
            <p class="counter">{!statistika?121:statistika.ukupnaDuzina}</p>
            <h4>Kilometara ruta</h4>
          </div>
          <div class="col-lg-4 col-6 stats_info counter_grid mt-lg-0 mt-5 text-left padL10">
            <span class="fa  fa-calendar"></span>
            <p class="counter">{!statistika ? 52 : statistika.brDogadjaja}</p>
            <h4>Uspesnih dogadjaja</h4>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="w3l-team" id="team">
    <div class="team-block py-5">
      <div class="container py-lg-5">
        <div class="title-content text-center mb-lg-3 mb-4">
          <h6 class="sub-title">Nas tim</h6>
          <h3 class="hny-title profKor">Upoznajte nas tim</h3>
        </div>
        <div class="row">
          <div class="col-lg-3 col-6 mt-lg-5 mt-4 ">
            <div class="box16 ">
              <a href="#url"><img src="https://localhost:5001/files/vratisliku/image_20220626154028.jpg" alt="" class="onama" /></a>
              <div class="box-content">
                <h3 class="title"><a href="#url">Nikola</a></h3>
                {/*<span class="post">Description</span>*/}
                <ul class="social">
                  <li>
                    <a href="#" class="facebook">
                      <span class="fa fa-facebook-f"></span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="twitter">
                      <span class="fa fa-twitter"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-6 mt-lg-5 mt-4 ">
            <div class="box16">
              <a href="#url"><img src="https://localhost:5001/files/vratisliku/image_20220629003015.jpeg" alt="" class="onama" /></a>
              <div class="box-content">
                <h3 class="title"><a href="#url">Andjela</a></h3>
                {/*<span class="post">Description</span>*/}
                <ul class="social">
                  <li>
                    <a href="#" class="facebook">
                      <span class="fa fa-facebook-f"></span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="twitter">
                      <span class="fa fa-twitter"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-6 mt-lg-5 mt-4">
            <div class="box16">
              <a href="#url"><img src="https://localhost:5001/files/vratisliku/image_20220627142619.jpg" alt="" class="onama" /></a>
              <div class="box-content">
                <h3 class="title"><a href="#url">Mladen</a></h3>
                {/*<span class="post">Description</span>*/}
                <ul class="social">
                  <li>
                    <a href="#" class="facebook">
                      <span class="fa fa-facebook-f"></span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="twitter">
                      <span class="fa fa-twitter"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-6 mt-lg-5 mt-4">
            <div class="box16">
              <a href="#url"><img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" alt="" class="onama" /></a>
              <div class="box-content">
                <h3 class="title"><a href="#url">Milan</a></h3>
                {/*<span class="post">Description</span>*/}
                <ul class="social">
                  <li>
                    <a href="#" class="facebook">
                      <span class="fa fa-facebook-f"></span>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="twitter">
                      <span class="fa fa-twitter"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    </div>)}
    </div>
  )
}
