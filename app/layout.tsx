import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../theme";
import Provider from "../components/Provider";
import '@mantine/spotlight/styles.css';
export const metadata = {
  title: "NextGen Project Management",
  description: "Manage Projects",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/logo.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        
        <Provider>
          <MantineProvider defaultColorScheme="dark">
            {children}
          </MantineProvider>
        </Provider>
      </body>
    </html>
  );
}
