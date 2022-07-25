import React from "react";
import { SliderData } from "./SliderData";
import slika from './images/g1.jpg'

export default function HomeCard(props){

    const [najvisiVrh, setNajvisiVrh] = React.useState([]);

    React.useEffect(() => {
        const getVrh = async () => {
            const res = await fetch("https://localhost:5001/Planina/PronadjiNajvisiVrhPlanine/" + props.planina.id);
            const getdata = await res.json();
            setNajvisiVrh(getdata);
        }
        getVrh();
        
        }
    ,[])
    console.log(props);
    console.log(najvisiVrh);
    return (
        
                <div className="card">
                    {/* <div class="col-lg-6 subject-card mt-lg-0 mt-4">
                            <div class="subject-card-header p-4"> */}
                                <a href="#" className="card_title p-lg-4d-block">
                                    <div className="row align-items-center">
                                        <div className="col-sm-5 subject-img">
                                            <img src={props.slika} className="img-fluid image--velicina home--velicina--slike" alt="" />
                                        </div>
                                        <div className="col-sm-7 subject-content mt-sm-0 mt-4">
                                            <div>
                                            <h4>{props.planina.naziv}</h4>
                                            </div>
                                            {/* <p> </p> */}
                                            <div className="dst-btm spoji">
                                                <h6 className="spoji"> Najvisi vrh:</h6>
                                                {/* <p></p> */}
                                                <div className="spoji">
                                                <span className="spoji">{najvisiVrh.naziv}</span>
                                                </div>
                                            </div>
                                            {/* <p className="sub-para">Per person on twin sharing</p> */}
                                        </div>
                                    </div>
                                </a>
                            {/* </div>
                        </div> */}
                </div>
    );
}