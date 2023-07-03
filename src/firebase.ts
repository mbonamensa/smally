import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, } from "firebase/auth"
import { getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyDit2yw99n18_1uD0dQGt0eOFEY4rQelZY",
  authDomain: "sma-ly.firebaseapp.com",
  projectId: "sma-ly",
  storageBucket: "sma-ly.appspot.com",
  messagingSenderId: "784215888646",
  appId: "1:784215888646:web:cb1123791af2cf71828487",
  measurementId: "G-7FZQ271VWW"
};

const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase)
const auth = getAuth(firebase)


const logInWithEmailAndPassword = async (email:string, password:string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err:any) {
    console.error(err);
    alert(err.message);
  }
};

async function signUpWithEmailAndPassword(email:string, password:string) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    // const res = await createUserWithEmailAndPassword(auth, email, password);
    // const user = res.user;
    // await addDoc(collection(firestore, "users"), {
    //   uid: user.uid,
    //   name,
    //   authProvider: "local",
    //   email,
    // });
  } catch (err:any) {
    console.error(err);
    alert(err.message);
  }
}

// const sendPasswordReset = async (email) => {
//   try {
//     await sendPasswordResetEmail(auth, email);
//     alert("Password reset link sent!");
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
// const logout = () => {
//   signOut(auth);
//   console.log("logged out")
// };


export {
    firebase,
    firestore,
    auth,
    signOut,
    signUpWithEmailAndPassword,
    logInWithEmailAndPassword,
}
