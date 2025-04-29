import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ThemeProvider } from "next-themes";
import { I18nextProvider } from "react-i18next";
import { BrowsingProvider } from "./hooks/use-browsing-context";
import i18n from "./lib/i18n"; // Import i18n configuration

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark">
      <I18nextProvider i18n={i18n}>
        <BrowsingProvider>
          <App />
        </BrowsingProvider>
      </I18nextProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
