import { firebase_app } from "@/firebase/config";
import { doc, setDoc, getFirestore } from "firebase/firestore";

const db = getFirestore(firebase_app);

const addData = async (collection, id, data) => {

    let results = null
    let error = null

    try {
        results = await setDoc(doc(db, collection, id), data, {
            merge: true
        });
    } catch (e) {
        error = e
    }

    return { results, error }
};

export default addData