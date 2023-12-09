import { HuddleClient, HuddleProvider } from "@huddle01/react";

const huddleClient = new HuddleClient({
  projectId: env.NEXT_PUBLIC_PROJECT_ID,
  options: {
    activeSpeakers: {
      size: 8,
    },
  },
});

const Parent = () => {
  return (
    <HuddleProvider key="huddle01-provider" client={huddleClient}>
        <div>
            <h1>Meet Room</h1>
            <h2>Welcome, all!</h2>
        </div>
    </HuddleProvider>
  );
};
