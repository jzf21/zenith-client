import "@/styles/globals.css";

import { HuddleClient, HuddleProvider } from "@huddle01/react";

const huddleClient = new HuddleClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  options: {
    activeSpeakers: {
      size: 8,
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <HuddleProvider key="huddle01-provider" client={huddleClient}>
      <Component {...pageProps} />
    </HuddleProvider>
  );
}
