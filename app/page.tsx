'use client'
import { Authenticator } from "@aws-amplify/ui-react";
import { AIConversation } from '@aws-amplify/ui-react-ai';
import { useAIConversation, useAIGeneration } from "./client";
import { useAuthenticator } from "@aws-amplify/ui-react";
import {
  Button,
  Flex,
  Heading,
  Loader,
  Text,
  TextAreaField,
  View,
} from "@aws-amplify/ui-react";
import React from "react";
export default function Page() {
  const [
    {
      data: { messages },
      isLoading,
    },
    handleSendMessage,
  ] = useAIConversation('chat');
  // 'chat' is based on the key for the conversation route in your schema.
  const { signOut } = useAuthenticator();
  const [description, setDescription] = React.useState("");
  const [{ data, hasError }, generateRecipe] =
    useAIGeneration("generateRecipe");

  const handleClick = () => {
    generateRecipe({ description });
  };

  return (
    <>
      <AIConversation
        messages={messages}
        isLoading={isLoading}
        handleSendMessage={handleSendMessage}
      />
       <Flex direction="column">
      <Flex direction="row">
        <TextAreaField
          autoResize
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
        />
        <Button onClick={handleClick}>Generate Suggestion</Button>
      </Flex>
      {isLoading ? (
        <Loader variation="linear" />
      ) : (
        <>
          <Heading level={2}>{data?.name}</Heading>
          <View as="ul">
            {data?.ingredients?.map((ingredient) => (
              <Text as="li" key={ingredient}>
                {ingredient}
              </Text>
            ))}
          </View>
          <Text>{data?.instructions}</Text>
        </>
      )}
    </Flex>
      <br />
    <button onClick={signOut}>Sign out</button>
    
    </>
  );

}