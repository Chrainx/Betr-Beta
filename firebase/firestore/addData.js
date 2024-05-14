import firebase_app from "../config";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function addData(collection, id, data) {
    let result = null;
    let error = null;

    try {
        const docRef = doc(db, collection, id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            throw new Error('Document does not exist');
        }

        // Retrieve the existing array field (assuming it's named 'data')
        const existingData = docSnap.data().data || [];

        // Update the document with the new object added to the array
        await updateDoc(docRef, {
            data: arrayUnion(data) // Add the new object to the existing array
        });

        result = 'Data added successfully';
    } catch (e) {
        error = e;
    }

    return { result, error };
}