'use client'
import { generateClient } from "aws-amplify/data";
import { createAIHooks, AIConversation } from '@aws-amplify/ui-react-ai';
import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";

const client = generateClient<Schema>({ authMode: 'userPool' });
const { useAIConversation } = createAIHooks(client);

export default function page() {
  const [
    {
      data: { messages },
    },
    sendMessage,
  ] = useAIConversation('chat');
  // 'chat' here should be the key in your schema

  const { user, signOut } = useAuthenticator();
  return (
    <>
        <p>Hello {user.username}</p>
        <br />
        <p>
        <AIConversation
            messages={messages}
            handleSendMessage={sendMessage}
        />
        </p>
        <br />
        <p >
            <button onClick={signOut} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign Out</button>
        </p>
      
    
    </>
  )
}