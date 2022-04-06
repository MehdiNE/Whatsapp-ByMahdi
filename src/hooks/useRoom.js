import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

export default function useRoom(roomId, userId) {
  const isUserRoom = roomId.includes(userId);

  const doc = isUserRoom ? roomId?.replace(userId, "") : roomId;

  const [snapshot] = useDocument(
    db.collection(isUserRoom ? "users" : "rooms").doc(doc)
  );

  if (!snapshot) return null;

  return {
    id: snapshot.id,
    photoURL:
      snapshot.photoURL ||
      `https://avatars.dicebear.com/api/adventurer/${snapshot.id}.svg`,
    ...snapshot.data(),
  };
}
