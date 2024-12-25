import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

import { getDatabase, push, ref, set, onChildAdded } from "firebase/database";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import sound from './assets/ding-101492.mp3';

function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        console.log (token, user)
        setUser({ name: result.user.displayName, email: result.user.email });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const audioplay =  () => {
    new Audio (sound).play ();
  }

  // var audio = new Audio("ding-101492.mp3");

  const [user, setUser] = useState("");
  const [chats, setChats] = useState([]);

  const [msg, setMsg] = useState("");

  const db = getDatabase();
  const chatListRef = ref(db, "chats");

  const Updateheight = () => {
    const el = document.getElementById("chat");

    if (!el) {
      return;
    } else {
      el.scrollTop = el.scrollHeight;
    }
  };

  // if (user) {
  //   const photoURL = user.photoURL;
  //   console.log(photoURL);
  // }

  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      // console.log (data.val ())
      setChats((chats) => [...chats, data.val()]);

      setTimeout (() => {
        Updateheight();
      }, 500)
    });
  }, []);

  const handleInput = (e) => {
    setMsg(e.target.value);
  };

  const sendChat = () => {
    if (!msg.trim()) {
      alert("enter some message to send");
      return;
    }

    setTimeout(() => {
      const chatRef = push(chatListRef);
    set(chatRef, {
      user,
      message: msg,
    });
    }, 500)

    audioplay ();

    // audio.play();

    // const c = [...chats];
    // c.push ({name: name, message: msg})
    // setChats (c);
    setMsg("");
  };
  return (
    <>
      {user.email ? null : (
        <div className="box1">
          {/* <input
            type="text"
            placeholder="enter name to start"
            onBlur={(e) => setName(e.target.value)}
          /> */}

          <div className="cont1">
            <div className="container2">
              <div className="box9">
                <img src="https://i.postimg.cc/HxQdp47P/social.png" alt="logo" />
                <h4>Connect Secure</h4>
                <button className="btn"
                  onClick={(e) => {googleLogin();}}>
                  Google Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {user.email ? (
        <div>
          <h2>
            Name: <span id="username">{user.name}</span>
          </h2>
          <div id="chat" className="chat-container">
            {chats.map((c, i) => (
              <div
                key={i}
                className={`container ${
                  c.user.email === user.email ? "me" : ""
                }`}
              >
                <p className="chatbox">
                  <strong> {c.user.name}:</strong>
                  <span> {c.message}</span>
                </p>
              </div>
            ))}
          </div>

          <div className="btm">
            <input className="form-control"
              type="text"
              placeholder="enter your message"
              onInput={handleInput}
              value={msg}
            />
            <button onClick={(e) => sendChat()}>Send</button>
          </div>
        </div>
     ) : null}
    </>
  );
}

export default App;
