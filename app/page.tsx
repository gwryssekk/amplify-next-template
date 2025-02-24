'use client'
import { generateClient } from "aws-amplify/data";
import { createAIHooks, AIConversation } from '@aws-amplify/ui-react-ai';
import type { Schema } from "../amplify/data/resource";
import { useAuthenticator, Flex, Card, Text, View, Button, Heading} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

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
    <View
      marginTop="large"
      marginLeft={{base: "50"}}
      maxWidth={{base:"1000", medium: "40vw"}}
      minWidth={{base:"300", medium: "40vw"}}
      
    >

       <Heading level={4}>Hello {user.signInDetails?.loginId}</Heading>
        <div style={{ width: '50%' }}>
        <AIConversation
            messages={messages}
            handleSendMessage={sendMessage}
            welcomeMessage = {
                <Card variation="outlined">
                   <Text>Hello.  I'd like to help you find the best career path for you. Please respond to my questions in the ugly text box below.  That cool with you?</Text>
                </Card> }
        />
        </div>
        <br />
        <p >
            <Button onClick={signOut} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign Out</Button>
        </p>

      
    
    </View>
  )
}