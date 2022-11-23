import "./globals.css";

import { externalLinks } from "../config/external-links";

export default function Index() {
  return (
    <>
      <h1>Welcome to the Evenlode Badminton Club Website</h1>

      <h3>
        Evenlode Badminton Club is one of the oldest badminton clubs in Abingdon and was established
        nearly 60 years ago.
      </h3>

      <p>
        The club plays on a Monday night at St Helen and St Katherine School, Faringdon Road in
        Abingdon. The Club plays social and league badminton during the months of September to
        April. We also run a Summer Club from July to August. If you would like to learn more about
        us, click on one of the menu items above.
      </p>

      <p>
        Evenlode Badminton Club is a member of the{" "}
        <a href={externalLinks.oxfordBadmintonLeague}>Oxfordshire Badminton League.</a>
      </p>
    </>
  );
}
