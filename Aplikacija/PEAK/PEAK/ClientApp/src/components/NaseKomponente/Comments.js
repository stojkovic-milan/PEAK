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

const Comments = ({ commentsUrl, currentUserId, dogadjajId,drustvoId,tip,updateZaProsek }) => {
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
  
  const [role,setRole] = useState(null);

  useEffect(() => {
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

  if(tip===1)
  {
    useEffect(() => {
      const getKomentari = async() => {
        const res = await fetch("https://localhost:5001/api/Utisak/PreuzmiUtiskeZaDogadjaj/" + dogadjajId);
        const getdata = await res.json();
        setKomentari(getdata);
      }
      getKomentari();
    },[]);
  }
  else if(tip===2)
  {
    useEffect(() => {
      const getKomentari = async() => {
        const res = await fetch("https://localhost:5001/api/Utisak/PreuzmiUtiskeZaDrustvo/" + drustvoId);
        const getdata = await res.json();
        setKomentariDrustva(getdata);
      }
      getKomentari();
    },[]);
  }

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
  const addComment = (text, parentId) => {
    setKomentarZaUpis(text);
    let datum=new Date()
    setDatumObjave(datum);
    // console.log(
    //   date.getFullYear() + "-" +
    //   (date.getMonth() + 1) + "-" +
    //   date.getDate() + "T" +
      
    //   date.getHours() + ":" +
    //   date.getMinutes() + ":" +
    //   date.getSeconds() );
    createCommentApi(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      if(tip===1)
      {
        const res = fetch("https://localhost:5001/api/Utisak/DodajKomentarZaDogadjaj/" + dogadjajId + "/" + text + "/" + rating + "/" + new Date().toJSON() + "/" + trenutnoUlogovan,
        {
          method: 'POST'
        });
        // if(broj1==0){
        //   broj1=1;
        // }else{
        //   broj1=0;
        // }
      }
      else if(tip===2)
      {
        const res = fetch("https://localhost:5001/api/Utisak/DodajKomentarZaDrustvo/" + drustvoId + "/" + text + "/" + rating + "/" + new Date().toJSON() + "/" + trenutnoUlogovan,
        {
          method: 'POST'
        });
        // if(broj1==0){
        //   broj1=1;
        // }else{
        //   broj1=0;
        // }
      }
      alert("Uspesno ste dodali komentar!");
      setActiveComment(null);
      updateZaProsek++;
      var b = broj+1;
      setBroj(b);
      // window.location.reload(false);
    });
  };

  const updateComment = (text, commentId) => {
    
    updateCommentApi(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

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
      <h3 className="comments-title">Komentari i ocene</h3>
      {role && <div className="comment-form-title">Dodaj komentar i ocenu</div>}
      {role && <Rate rating={rating} onRating={(rate) => setRating(rate)}/>}
      {/* <StarRating /> */}
      {role && <CommentForm submitLabel="Write" handleSubmit={addComment} />}
      <div className="comments-container">
        {
          tip===1 && komentari.map((rootComment) => (
          <Comment
            key={rootComment.id}
            ocena={rootComment.ocena}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
            korisnikId={trenutnoUlogovan}
          />
        ))}
        {
          tip===2 && komentariDrustva.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            ocena={rootComment.ocena}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
            korisnikId={trenutnoUlogovan}
          />
        ))
        }
      </div>
    </div>
  );
};

export default Comments;