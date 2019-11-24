import firebase from 'firebase';
const config = {
    /*apiKey: "AIzaSyC4fDs_hFrxFvu11OFrdYWtYF_uZ-CI__E",
    //apiKey: "AIzaSyDeVNBYaBBZ-fQJNxyzptwacCKjuh8bXRw",
    authDomain: "matalan-inventory-mgmt.firebaseapp.com",
    // authDomain: "matlan-inventory-poc.firebaseio.com",
    databaseURL: "https://matalan-inventory-mgmt.firebaseio.com",
    // databaseURL: "https://matlan-inventory-poc.firebaseio.com",
    projectId: "matalan-inventory-mgmt",
    // projectId: "matlan-inventory-poc",
    storageBucket: "matalan-inventory-mgmt.appspot.com",
    messagingSenderId: "979799136658",
    //messagingSenderId: "221390419657",
    appId: "1:979799136658:web:ca3f2a45c62e7430af094b",
    measurementId: "G-7Z7067SE9E" */
    apiKey: "AIzaSyDeVNBYaBBZ-fQJNxyzptwacCKjuh8bXRw",
    authDomain: "matlan-inventory-poc.firebaseapp.com",
    databaseURL: "https://matlan-inventory-poc.firebaseio.com",
    projectId: "matlan-inventory-poc",
    storageBucket: "matlan-inventory-poc.appspot.com",
    messagingSenderId: "221390419657",
    appId: "1:221390419657:web:f2ad4f82951192c2d6bf18",
    measurementId: "G-82BHRYCF4F"
}
firebase.initializeApp(config);
export default firebase;