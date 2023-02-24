import { useDispatch } from "react-redux";
import { notification } from "antd";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAZc7H9FmBTZfKtDU0TZ-Hwhof5qTFMbyc",
    authDomain: "movie-app-e2621.firebaseapp.com",
    projectId: "movie-app-e2621",
    storageBucket: "movie-app-e2621.appspot.com",
    messagingSenderId: "28608948863",
    appId: "1:28608948863:web:1399fceab5aa3d765bed4a",
    measurementId: "G-FJPFHBPTER"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();


const openNotification = (placement) => {
    notification.success({
        message: `Logged Out!`,
        description:
            'You have been successfully logged out.',
        placement,
    });
};

const errNotification = () => {
    notification.error({
        
        description:
            '*Incorrect email address or password. Please try again',
        placement:'top'
    });
};

export const warnNotification = (placement,des) => {
    notification.warning({
        description:des,
        placement,
    });
};

const signInWithGoogle = async () => {
    try {
       
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
       
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
         
        }
    } catch (err) {
        errNotification()
    }
}

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        errNotification()
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth).then(() => {
        openNotification('top')
    });

};

export { auth, db, signInWithGoogle, logInWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordReset, logout, };
