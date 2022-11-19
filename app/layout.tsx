import { Navbar } from "../components/navbar";

import css from "../styles/page.module.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head />
      <body>
        <div className={css.page}>
          <Navbar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
