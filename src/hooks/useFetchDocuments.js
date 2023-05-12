import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    setLoading(true);

    let q

    try {
      if (search) {
        q = query(collection(db, docCollection), where('tags', 'array-contains', search));
      } else if (uid) {
        q = query(collection(db, docCollection), where('userId', '==', uid))
      } else {
        q = query(collection(db, docCollection));
      }

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let postsArr = [];
        querySnapshot.forEach((doc) => {
          postsArr.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(postsArr);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.log(err);
      setError(err.message);
      setLoading(false);
    }
  }, [docCollection, search, uid, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
};
