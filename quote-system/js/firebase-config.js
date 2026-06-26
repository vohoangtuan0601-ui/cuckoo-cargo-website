const firebaseConfig = {
  apiKey:            "AIzaSyC0dpbdbqlvb_6ITwA48C4Ur_OsE30uugc",
  authDomain:        "cuckoo-cargo.firebaseapp.com",
  projectId:         "cuckoo-cargo",
  storageBucket:     "cuckoo-cargo.firebasestorage.app",
  messagingSenderId: "215486137117",
  appId:             "1:215486137117:web:df6bed045b7080ee6817f4",
  measurementId:     "G-PKWXEZ99H9"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db   = firebase.firestore();
db.enablePersistence({ synchronizeTabs: true }).catch(() => {});
