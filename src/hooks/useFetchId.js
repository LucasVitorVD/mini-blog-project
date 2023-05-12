import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export const useFetchId = (docCollection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadDocument() {
      setLoading(true);

      try {
        const q = query(collection(db, docCollection), where('postId', '==', id))
  
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let post = {}
          querySnapshot.forEach((doc) => {
            post = { ...doc.data() }
          })
          setDocument(post)
          setLoading(false)
        })

        return () => unsubscribe();
      } catch (err) {
        console.log(err);
        setError(err.message);
        setLoading(false);
      }
    }

    loadDocument();
  }, [docCollection, id, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { document, loading, error };
};
