import React from "react";
import SharedNotificationSettings from "@/components/sharedNotificationSettings";

const Page = () => {
  return (
    <div className="w-3/5">
      <SharedNotificationSettings
        title="User Settings"
        subtitle="Manage your user notification settings"
      />
    </div>
  );
};
export default Page;
