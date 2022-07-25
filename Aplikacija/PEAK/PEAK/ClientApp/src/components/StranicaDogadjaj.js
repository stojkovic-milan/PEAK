import React, { Component } from "react";
import Footer from "./NaseKomponente/Footer";
import StranicaDogadjaja from "./NaseKomponente/StranicaDogadjaja";
import StranicaDogadjajObicanKorisnik from "./StranicaDogadjajObicanKorisnik";
import authService from "./api-authorization/AuthorizeService";


// export class Dogadjaj extends Component {
//     static displayName = Dogadjaj.name;
//     render() {
//         console.log("STRANICA DOGADJAJA")
//         console.log(this.props.match.params.dogadjajId)
//         return (
//             <div>
//                 <StranicaDogadjaja id={this.props.match.params.dogadjajId} />
//                 <Footer />
//             </div>
//         );
//     }
// }

export default function Dogadjaj(props){
    const [role,setRole] = React.useState();

    React.useEffect(() => {
        const getRole = async () => {
            const token = await authService.getAccessToken();
            const res = await fetch("https://localhost:5001/ApplicationUser/PreuzmiRoleKorisnika", {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            setRole(await res.json());
        }
        getRole();
        console.log(role);
    },[]);
    if(role=="Admin" || role=="Korisnik"){
        return (
            <div>
                <StranicaDogadjaja id={props.match.params.dogadjajId} />
                <Footer />
            </div>
        )
        
    }
    else{
        return(
            <div>
                <StranicaDogadjajObicanKorisnik id={props.match.params.dogadjajId} />
            </div>
        )
    }
}