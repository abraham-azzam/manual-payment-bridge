
import { useParams } from "react-router-dom";
import { StatusIndicator } from "@/components/StatusIndicator";

const Waiting = () => {
  const { sessionId } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <StatusIndicator
        sessionId={sessionId!}
        onStatusChange={(status) => {
          if (status === "completed") {
            // Handle success
            console.log("Payment completed");
          } else if (status === "failed") {
            // Handle failure
            console.log("Payment failed");
          }
        }}
      />
    </div>
  );
};

export default Waiting;
