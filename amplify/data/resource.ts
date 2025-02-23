import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  chat: a.conversation({
    aiModel: a.ai.model("Claude 3.5 Haiku"),
    systemPrompt:
      `You are advising students who want to know what the best career path for them is.  Ask a series of questions (no more than 5), and when that is complete provide the student with a list of the 3 best career fields.  Generate a fit score, where 100 is the best fist, and 0 is the worst fit, and tell them the fit score for each career choice`,
  }).authorization(allow => allow.owner()),

});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});