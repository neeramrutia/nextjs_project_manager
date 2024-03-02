import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../theme";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Provider from "../components/Provider";
import '@mantine/spotlight/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/carousel/styles.css';
import { Notifications } from '@mantine/notifications';
export const metadata = {
  title: "Project Catalog",
  description: "Manage Projects",
};
import { GoogleAnalytics } from '@next/third-parties/google'
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
            <Notifications/>
            {children}
            <SpeedInsights/>
          </MantineProvider>
        </Provider>
      </body>
      <GoogleAnalytics gaId="G-S97QRV63R4"/>
    </html>
  );
}
