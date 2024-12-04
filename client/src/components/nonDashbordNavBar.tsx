"use client";

import React from "react";
import Link from "next/link";
import { Bell, BookOpen } from "lucide-react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const NonDashbordNavBar = () => {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.userType as "student" | "teacher";

  return (
    <nav className="nondashboard-navbar">
      <div className="nondashboard-navbar__container">
        <div className="nondashboard-navbar__search">
          <Link href="/" className="nondashboard-navbar__brand" scroll={false}>
            EDROH
          </Link>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Link href="/" className="nondashboard-navbar__search-input" scroll={false}>
                <span className="hidden sm:inline">Search Courses</span>
                <span className="sm:hidden"></span>
              </Link>
              <BookOpen
                size={18}
                className="nondashboard-navbar__search-icon"
              />
            </div>
          </div>
        </div>
        <div className="nondashboard-navbar__actions">
          <button className="nondashboard-navbar__notification-button">
            <span className="nondashboard-navbar__notification-indicator" />
            <Bell className="nondashboard-navbar__notification-icon" />
          </button>
          {/* SIGNIN BUTTON */}
          <SignedIn>
            <UserButton
              appearance={{
                baseTheme: dark,
                elements: {
                  userButtonOuterIdentifier: "text-customgreys-dirtyGrey",
                  userButtonBox: "scale-90 sm:scale-100",
                },
              }}
              showName={true}
              userProfileMode="navigation"
              userProfileUrl={
                userRole === "teacher" ? "/teacher/profile" : "/user/profile"
              }
            />
          </SignedIn>

          <SignedOut>
            <Link
              href="/signin"
              className="nondashboard-navbar__auth-button--login" scroll={false}
            >
              Log in
            </Link>
            <Link
              href="/signup" scroll={false}
              className="nondashboard-navbar__auth-button--signup"
            >
              Sign up
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};
export default NonDashbordNavBar;
