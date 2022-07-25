import CommentForm from "./CommentForm";
import slika from './images/g3.jpg'
import {FaFlag} from 'react-icons/fa'
import ModalPrijavaReport from "./ModalPrijavaReport";
import React from "react";
import RateFix from "./RateFix";

const Comment = ({
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
  korisnikId,
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
  const canDelete =
    currentUserId === comment.userId && replies.length === 0 && !timePassed;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !timePassed;
  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  console.log(komentar);
  const [modal, setModal]=React.useState(false);
  const [rating, setRating] = React.useState(ocena);

  function gasiModal() {
    setModal(false);
}

  return (
    <div key={comment.id} className="comment">
    {modal && <ModalPrijavaReport show={modal} funkcijaGasi={gasiModal} korisnikId={korisnikId} komentarId={comment.id}/>}
      <div className="comment-image-container">
        <img className="veliina" src={comment.korisnik.profilnaSlika} />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.korisnik.ime} {comment.korisnik.prezime}</div>
          <div><RateFix rating={rating} onRating={(rate) => setRating(rate)} /></div>
          <div>{comment.datumObjave}</div>
          <div className="pomeriDesnoZastavu">
          <div className={`ikonaZaZatvaranje`}>
                <FaFlag className="far fa-flag" title="Neprikladan sadrzaj" onClick={()=> setModal(true)}/>
            </div>
            </div>
        </div>
        {!isEditing && <div className="comment-text">{comment.komentar}</div>}
      </div>
    </div>
  );
};

export default Comment;