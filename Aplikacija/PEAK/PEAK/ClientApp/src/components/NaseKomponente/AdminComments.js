import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "./api";
import authService from "../api-authorization/AuthorizeService";
import Rate from "./Rate";
import AdminComment from "./AdminComment";

const AdminComments = ({ commentsUrl, currentUserId, dogadjajId,drustvoId,tip,updateZaProsek }) => {
  const [komentarZaUpis, setKomentarZaUpis] = useState({});
  const [datumObjave, setDatumObjave]=useState();
  const [trenutnoUlogovan, setTrenutnoUlogovan] = useState();
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const [broj, setBroj] = useState(0);
  const [rating, setRating] = useState(0);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );
  const [komentari, setKomentari]=useState([]);
  const [komentariDrustva, setKomentariDrustva] = useState([]);
  
  
    useEffect(() => {
      const getKomentari = async() => {
        const res = await fetch("https://localhost:5001/api/Prijava/VratiPrijaveUtisakaDogadjaja");
        const getdata = await res.json();
        setKomentari(getdata);
        console.log(komentari);
      }
      getKomentari();
    },[broj]);
  
    useEffect(() => {
      const getKomentari = async() => {
        const res = await fetch("https://localhost:5001/api/Prijava/VratiPrijaveUtisakaDrustva");
        const getdata = await res.json();
        setKomentariDrustva(getdata);
        console.log(komentariDrustva);
      }
      getKomentari();
    },[broj]);
  

  const getDg = async () => {
    const token = await authService.getAccessToken();
    const res = await fetch("https://localhost:5001/ApplicationUser/PreuzmiPrijavljenogKorisnika/", {
        headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
    
    //idKorisnika = await res.json();
    setTrenutnoUlogovan(await res.text());
}
getDg();

  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  useEffect(() => {
    getCommentsApi().then((data) => {
      setBackendComments(data);
    });
  }, []);

  function ocena() {
    console.log("HELLLOOOO")
  }

  return (
    <div className="comments">
      {/* <h3 className="comments-title">Komentari i ocene</h3>
      <div className="comment-form-title">Dodaj komentar i ocenu</div>
      <Rate rating={rating} onRating={(rate) => setRating(rate)}/> */}
      {/* <StarRating /> */}
      {/* <CommentForm submitLabel="Write" handleSubmit={addComment} /> */}
      <div className="comments-container">
        {
           komentari.map((rootComment) => (
          <AdminComment
            key={rootComment.id}
            ocena={rootComment.ocena}
            comment={rootComment}
            currentUserId={currentUserId}
            korisnikId={trenutnoUlogovan}
          />
        ))}
        {
          komentariDrustva.map((rootComment) => (
          <AdminComment
            key={rootComment.id}
            comment={rootComment}
            ocena={rootComment.utisak.ocena}
            currentUserId={currentUserId}
            korisnikId={trenutnoUlogovan}
          />
        ))
        }
      </div>
    </div>
  );
};

export default AdminComments;