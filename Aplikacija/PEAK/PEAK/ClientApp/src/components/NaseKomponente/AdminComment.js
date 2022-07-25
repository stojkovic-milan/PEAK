import CommentForm from "./CommentForm";
import slika from './images/g3.jpg'
import {FaFlag, FaVenus} from 'react-icons/fa'
import ModalPrijavaReport from "./ModalPrijavaReport";
import React from "react";
import RateFix from "./RateFix";
import { layerGroup } from "leaflet";

const AdminComment = ({
  comment,
  replies,
  ocena,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
  komentar
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  console.log(comment);
  const [modal, setModal]=React.useState(false);
  const [rating, setRating] = React.useState(ocena);

  function gasiModal() {
    setModal(false);
}

  function prihvati(komentarId, prijavaId){
    console.log("prihvati");
    const res =  fetch("https://localhost:5001/api/Prijava/ObrisiPrijavuUtiska/" + prijavaId,{
      method:"DELETE"
    });
    const res1 =  fetch("https://localhost:5001/api/Utisak/ObrisiUtisak/" + komentarId,{
      method:"DELETE"
    });
    alert("Uspesno ste uklonili komentar koji je bio neprikladan");
    location.reload();
  }

  function odbaci(prijavaId){
    console.log("ostavi komentar");
    const res =  fetch("https://localhost:5001/api/Prijava/ObrisiPrijavuUtiska/" + prijavaId,{
      method:"DELETE"
    });
    alert("Komentar nije neprikladan sadrzaj i vraca se za prikaza");
    location.reload();
  }

  return (
    <div key={comment.utisak.id} className="comment">
    <div className="borderZaKomentari">
    <div className='pomeriDesno'>
      <button type='button' className='btn btn-style btn-secondary promeniBojuDugmetu' onClick={() => prihvati(comment.utisak.id,comment.id)}>Ukloni</button>
      <button type='button' className='btn btn-style btn-secondary' onClick={() => odbaci(comment.id)}>Ostavi kao komentar</button>
    </div>
    {/* {modal && <ModalPrijavaReport show={modal} funkcijaGasi={gasiModal} korisnikId={currentUserId} komentarId={comment.id}/>} */}
      <div className="comment-image-container">
        <img className="veliina" src={comment.utisak.korisnik.profilnaSlika} />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.utisak.korisnik.ime} {comment.utisak.korisnik.prezime}</div>
          <div><RateFix rating={rating} onRating={(rate) => setRating(rate)} /></div>
          <div>{comment.utisak.datumObjave}</div>
          <div className="pomeriDesnoZastavu">
            </div>
        </div>
        {!isEditing && <div className="comment-text">{comment.utisak.komentar}</div>}
      </div>
    </div>
    </div>
  );
};

export default AdminComment;