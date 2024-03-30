import { useLayoutEffect, useState } from 'react';
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore';
import { database } from '../../../config/firebase';

export type ChatMessage = {
  _id: string;
  createdAt: string;
  text: string;
  user: any;
};

export const useGetChatMessages = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pending, setPending] = useState(true);

  useLayoutEffect(() => {
    setPending(true);
    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt,
          text: doc.data().text,
          user: doc.data().user
        }))
      );
      setPending(false);
    });
    return unsubscribe;
  }, []);

  return {
    messages,
    pending
  };
};
