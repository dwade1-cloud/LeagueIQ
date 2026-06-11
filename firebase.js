// FIREBASE CONFIGURATION =============================
const firebaseConfig = {
  apiKey: "AIzaSyCcJchr26rP-GeW_6FYa5sXxpHQPT5k0eY",
  authDomain: "leagueiq-d3e04.firebaseapp.com",
  projectId: "leagueiq-d3e04",
  storageBucket: "leagueiq-d3e04.firebasestorage.app",
  messagingSenderId: "938215290237",
  appId: "1:938215290237:web:b9c4dd35e0d53772a88814",
};
// INITIALIZE FIREBASE ============================
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
