import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Stream API key or Secret is Missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    const user = {
      id: userData.id,
      name: userData.name,
      image: userData.image || "",
    };

    await streamClient.upsertUser(user); // ✅ Not upsertUsers
    return user;
  } catch (error) {
    console.error("Error upserting Stream user:", error);
  }
};

export const generateStreamToken = (userId) => {
  try {
    //ENSURE USERID IS A STRING
    const userIdStr = userId.toString()
    return streamClient.createToken(userIdStr)
  } catch (error) {
    console.error ("Error generating Stream token:", error)
  }
}