import React from "react";
import CrtajRed from "./CrtajRed";

export default function BasicTable(props){

    const [podaci, setPodaci] = React.useState(props.podaci);

    

    return (
        <div>
            <div className="hack1">
                <div className="hack2">
                    <table className="content-table">
                        <thead>
                            {
                                props.hederi.map((element,index) => {
                                    return (
                                        <th>{element}</th>
                                    );
                                })
                            }
                        </thead>
                        <tbody>
                            {
                                props.podaci.map((podatak, index) => {
                                    return (
                                        <CrtajRed podatak={podatak} redniBroj={index+1} key={podaci.id} tip={props.tip} />
                                        );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}