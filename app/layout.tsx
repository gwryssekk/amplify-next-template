"use client"

import React from "react";
import { Amplify } from "aws-amplify";
import "./app.css";
import { Authenticator, ThemeProvider, defaultDarkModeOverride } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);

const DefaultDarkMode = () => {
  const [colorMode, setColorMode] = React.useState('system');
  const theme = {
    name: 'my-theme',
    overrides: [defaultDarkModeOverride],
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>  

          <Authenticator>
            {children}
          </Authenticator>

        
      </body>
    </html>
  );
}