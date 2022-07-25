import React from "react";

export default function CrtajRed(props) {

    // return (
    //     <tr key={ props.key }>
            {/* <td>{props.redniBroj}</td>
            <td>{props.ucesnik.ime}</td>
            <td>{props.ucesnik.prezime}</td>
            <td>{props.ucesnik.spremnost}</td> */}
            {/* {
                props.podatak.map((element, index) => {
                    return (
                        <td>{element[index]}</td>
                    );
                })
            } */}
        {/* </tr>
        ) */}
        if(props.tip==1){
            return(
                <tr key={props.key}>
                    <td>{props.redniBroj}</td>
                    <td>{props.podatak.ime}</td>
                    <td>{props.podatak.prezime}</td>
                    <td>{props.podatak.spremnost}</td>
                </tr>
            );
            
        }
        else if(props.tip==2){
            return (
                <tr key={props.key}>
                    <td>{props.redniBroj}</td>
                    <td>{props.podatak.nazivVrha}</td>
                    <td>{props.podatak.visina}m</td>
                </tr>
            );
        
        }
        else if(props.tip==3){
            return (
                <tr key={props.key}>
                    <td>{props.redniBroj}</td>
                    <td>{props.podatak.nazivRute}</td>
                    <td>{props.podatak.duzina}km</td>
                    <td>{props.podatak.tezina}</td>
                </tr>
            );
        }
            
            
}