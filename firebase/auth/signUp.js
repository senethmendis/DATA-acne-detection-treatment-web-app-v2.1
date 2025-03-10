// utils/signUp.js
import { firebase_app } from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

// Sign-up function with Firestore integration
export default async function signUp(email, password, userData) {
    let result = null,
        error = null;

    try {
        // Step 1: Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        result = userCredential.user;

        // Step 2: Store additional user info in Firestore
        await setDoc(doc(db, "users", result.uid), {
            firstName: userData.firstName,
            lastName: userData.lastName,
            age: userData.age,
            email: result.email,
            createdAt: new Date(),
        });

        console.log("User registered successfully!");
    } catch (e) {
        error = e;
        console.error("Error during registration: ", e);
    }

    return { result, error };
}
