import React, {useState, useContext, useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import {GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, getAuth, onAuthStateChanged, signOut, verifyIdToken, signInWithEmailAndPassword } from 'firebase/auth'

export const AuthContext = React.createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({userName: ''})
  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()


  const registerEmail = (inputs) => {
    createUserWithEmailAndPassword(getAuth(), inputs.email, inputs.password)
      .then((userCredential) => {
        // Signed in
        setUser({userName: userCredential.user});
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  const signInWithEmail = (inputs) => {
    signInWithEmailAndPassword(auth, inputs.username, inputs.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(getAuth(), provider);
      navigate('/dashboard');
      console.log('signing in...', user.userName)
    }
    catch {
      console.error('Failed to log in')
    }
  };

  const getProfilePicUrl = () => {
    return getAuth().currentUser.photoURL;
  }

  // Returns the signed-in user's display name.
  const getUserName = () => {
    return getAuth().currentUser.displayName;
  }

  const authStateObserver = (login) => {
    if (login){
      setUser({userName: getUserName(), profilePic: getProfilePicUrl()})
      setLoggedIn(true)
    } else {
      setUser({userName: '', profilePic:''});
      setLoggedIn(false)
    }
  }

  // Initialize firebase auth
  function initFirebaseAuth() {
    // Listen to auth state changes.
    onAuthStateChanged(getAuth(), authStateObserver);
  }

  const signOutUser = async () => {
    setUser({userName: '', profilePic:''});
    signOut(getAuth())
    navigate('/')
  }


  const value = {
    user,
    loggedIn,
    signInWithGoogle,
    signInWithEmail,
    signOutUser,
    initFirebaseAuth,
    authStateObserver,
    getUserName,
    registerEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider
