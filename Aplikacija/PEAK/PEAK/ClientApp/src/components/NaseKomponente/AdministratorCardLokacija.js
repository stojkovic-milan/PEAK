import React from 'react'

export default function AdministratorCardLokacija(props) {
    // const prihvati = () => {
    //     const idDogadjaja = "1b19a562-06de-4676-8aaa-0317051244de";
    //       const res = fetch("https://localhost:5001/Planina/PromeniStanjePlanine/" + props.podatak.id,
    //       {
    //         method: 'PUT'
    //       });
    //       alert("Lokacija je potvrdjena od strane administratora");
    //   }
      
    //   const odbaci = () => {
    //     const idDogadjaja = "1b19a562-06de-4676-8aaa-0317051244de";
    //       const res = fetch("https://localhost:5001/Planina/ObrisiPlaninu/" + props.podatak.id,
    //       {
    //         method: 'DELETE'
    //       });
    //       alert("Lokacija koju je korisnik dodao ne postoji pa je administrator uklnio");
    //   }
      const [lokacija, setLokacija] = React.useState([]);

      //React.useEffect(() => {
      //  const getLokacija = async () => {
      //    const res = await fetch("https://localhost:5001/Lokacija/VratiPrvuRutuLokacije/" + props.podatak.id);
      //    const getdata = await res.json();
      //    console.log(getdata);
      //    setLokacija(getdata);
          
      //console.log(lokacija);
      //  }
      //  getLokacija();
        
      //},[]);
      console.log(props.podatak.id);
    return (
    <div>
        <div className="col-lg-4 col-md-4 col-6 mt-lg-5 mt-4">
                <div className="column">
                    <a href="blog-single.html"><img src={props.podatak.slikaPlanine} alt="" className="img-fluid"></img></a>
                    <div className='podeli'>
                      <div className="info">
                          <h4><a href="blog-single.html">{props.podatak.naziv}</a></h4>
                          <p>{props.podatak.datum}</p>
                          <div className="dst-btm">
                          <h6 className=""> {props.podatak.tip} </h6>
                        </div>
                      </div>
                      
                    </div>
                </div>
            </div>
    </div>
  )
}

