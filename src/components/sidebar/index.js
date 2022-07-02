import useUser from "../../hooks/use-user";
import User from "./user";
import Suggestions from "./suggestions";

export default function Sidebar() {
  const {
    user: { docId, fullName, username, userId, following },
  } = useUser();
  return (
    <div className="col-span-2 hidden p-4 pt-8 lg:block">
      <User username={username} fullName={fullName} />
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </div>
  );
}
