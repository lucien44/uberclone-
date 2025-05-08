
 "use client"

  // Utiliser useEffect pour exécuter les appels
  import { User as StreamUser } from "stream-chat";
  import { LoadingIndicator } from "stream-chat-react";
  import { useState, useCallback, useEffect } from "react";
  import { useUser } from "@clerk/nextjs";
import MyChat from "@/components/Mychat";
  
  type HomeState = {
    apiKey: string;
    user: StreamUser;
    token: string;
  };
  
  export default function Home() {
    const { user: clerkUser } = useUser(); // Utilisation de Clerk pour récupérer les infos utilisateur
    const [homeState, setHomeState] = useState<HomeState | undefined>();
  
    const registerUser = useCallback(async () => {
      const userId = clerkUser?.id;
      const email = clerkUser?.primaryEmailAddress?.emailAddress;
  
      if (userId && email) {
        const response = await fetch("/api/register-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, email }),
        });
  
        const responseBody = await response.json();
        return responseBody;
      }
    }, [clerkUser]);
  
    const getUserToken = useCallback(
      async (userId: string, userName: string) => {
        const response = await fetch("/api/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });
        const responseBody = await response.json();
        const token = responseBody.token;
  
        if (!token) {
          console.error("Token introuvable");
          return;
        }
  
        const user: StreamUser = {
          id: userId,
          name: userName,
          image: `https://getstream.io/random_png/?id=${userId}&name=${userName}`, // Correction ici
        };
  
        const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY; // Assurez-vous que la clé est exposée en tant que variable d'environnement publique
        if (apiKey) {
          setHomeState({
            apiKey,
            user,
            token,
          });
        }
      },
      []
    );
  
    // Utiliser useEffect pour exécuter les appels
    useEffect(() => {
      if (
        clerkUser?.id &&
        clerkUser?.primaryEmailAddress?.emailAddress &&
        !clerkUser?.publicMetadata?.streamRegistered
      ) {
        registerUser().then(() => {
          getUserToken(
            clerkUser.id || "Unknown",
            clerkUser?.primaryEmailAddress?.emailAddress || "Unknown"
          );
        });
      } else if (clerkUser?.id) {
        getUserToken(
          clerkUser.id || "Unknown",
          clerkUser?.primaryEmailAddress?.emailAddress || "Unknown"
        );
      }
    }, [registerUser, clerkUser, getUserToken]);
  
    if (!homeState) {
      return <LoadingIndicator />;
    }
  
    return <MyChat{...homeState}/>;
  }
  