
import { clerkClient } from "@clerk/clerk-sdk-node";
import { StreamChat } from "stream-chat";

export async function POST(request: Request) {
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  const chatSecret = process.env.STREAM_SECRET_KEY;

  if (!apiKey || !chatSecret) {
    console.error("Clés API manquantes");
    return new Response("Clés API manquantes", { status: 500 });
  }

  const serverClient = StreamChat.getInstance(apiKey, chatSecret);

  try {
    // Parse the incoming request body
    const body = await request.json();
    console.log("[/api/register-user] Body:", body);

    const userId = body?.userId;
    const email = body?.email; // Updated from `mail` to `email`

    // Validate required parameters
    if (!userId || !email) {
      console.error("Paramètres manquants");
      return new Response("Paramètres manquants", { status: 400 });
    }

    // Register the user in Stream Chat
    await serverClient.upsertUser({
      id: userId,
      role: "user",
      name: email,
      image: `https://getstream.io/random_png/?id=${userId}&name=${email}`,
    });

    // Update user metadata in Clerk
    const params = {
      publicMetadata: {
        streamRegistered: true,
      },
    };

    const updatedUser = await clerkClient.users.updateUser(userId, params);
    console.log("[/api/register-user] Updated User:", updatedUser);

    // Send success response
    const response = {
      userId: userId,
      userName: email,
    };

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("[/api/register-user] Erreur:", error);
    return new Response("Erreur lors du traitement", { status: 500 });
  }
}


