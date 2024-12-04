"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { Form } from "@/components/ui/form";
import { useUpdateUserMutation } from "@/state/api";
import { useForm } from "react-hook-form";
import {
  NotificationSettingsFormData,
  notificationSettingsSchema,
} from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/Header";
import { CustomFormField } from "@/components/CustomFormField";
import { Button } from "@/components/ui/button";

const SharedNotificationSettings = ({
  title = "Notification Settings",
  subtitle = "Manage your notification Settings",
}) => {
  const { user } = useUser();
  const [updateUser] = useUpdateUserMutation();
  const currentSettings =
    (user?.publicMetadata as { settings?: UserSettings })?.settings || {};
  const method = useForm<NotificationSettingsFormData>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      courseNotifications: currentSettings.courseNotifications || false,
      emailAlerts: currentSettings.emailAlerts || false,
      smsAlerts: currentSettings.smsAlerts || false,
      notificationFrequency: currentSettings.notificationFrequency || "daily",
    },
  });
  const onSubmit = async (data: NotificationSettingsFormData) => {
    if (!user) return;
    const updatedUser = {
      userId: user.id,
      publicMetadata: {
        ...user.publicMetadata,
        settings: {
          ...currentSettings,
          ...data,
        },
      },
    };
    try {
      await updateUser(updatedUser);
    } catch (error) {
      console.log("Failed to update use setttings", error);
    }
  };
  if (!user) return <div>Plese signin to manage your settongs</div>;

  return (
    <div className="notification-settings">
      <Header title={title} subtitle={subtitle} />
      <Form {...method}>
        <form
          onSubmit={method.handleSubmit(onSubmit)}
          className="notification-settings__form"
        >
          <div className="notification-settings__fields">
            <CustomFormField
              name="courseNotification"
              type="switch"
              label="Course Notification"
            />
            <CustomFormField
              name="emailAlerts"
              type="switch"
              label="Email Alerts"
            />
            <CustomFormField
              name="smsAlerts"
              type="switch"
              label="SMS Alerts"
            />
            <CustomFormField
              name="notificationFrequency"
              type="select"
              label="Notification Frequency"
              options={[
                { value: "immediate", label: "Immediate" },
                { value: "daily", label: "Daily" },
                { value: "weekly", label: "Weekly" },
              ]}
            />
          </div>
          <Button type="submit" className="notification-settings__submit">
            Update Settings
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default SharedNotificationSettings;
