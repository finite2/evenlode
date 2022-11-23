import "./globals.css";

import { Navbar } from "./navbar";

import css from "./layout.module.css";
import AuthContext from "./auth-context";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head />
      <body>
        <AuthContext>
          <div className={css.page}>
            <Navbar />
            <main>{children}</main>
          </div>
        </AuthContext>
      </body>
    </html>
  );
};

export default RootLayout;
