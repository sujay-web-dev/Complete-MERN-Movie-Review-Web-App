import React from "react";
import AuthProvider from "./AuthProvider";
import NotificationProvider from "./NotificationProvider";
import ThemeProvider from "./ThemeProvider";

function ContextProviders({ children }) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default ContextProviders;
