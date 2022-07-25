import Footer from "./NaseKomponente/Footer";
import ObicanKorisnikDogadjaj from "./NaseKomponente/ObicanKorisnikDogadjaj";
import React from "react";

export default function StranicaDogadjajObicanKorisnik(props){
    return(
        <div>
            <ObicanKorisnikDogadjaj id={props.id} />
            <Footer />
        </div>
    );
}

// export class StranicaDogadjajObicanKorisnik extends Component{
//     static displayName = StranicaDogadjajObicanKorisnik.name;
//     render(){
//         return(
//             <div>
//                 <ObicanKorisnikDogadjaj id={this.props.match.params.dogadjajId} />
//                 <Footer />
//             </div>
//         );
//     }
// }