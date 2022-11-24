import "./globals.css";

import { Navbar } from "./navbar";

import css from "./layout.module.css";
import AuthContext from "./auth-context";
import { Suspense } from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head />
      <body>
        <AuthContext>
          <div className={css.page}>
            <Navbar />
            <main>
              <Suspense>{children}</Suspense>
            </main>
          </div>
        </AuthContext>
      </body>
    </html>
  );
};

export default RootLayout;
