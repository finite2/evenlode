import { fees } from "../../config/fees";

const About = () => {
  return (
    <>
      <h1>Membership</h1>
      <p>We welcome any players of a reasonable standard.</p>
      <p>
        Our current fees are <b>£{fees.adult}</b> for the season running from September to the end
        of April. The summer club is charged separately.
      </p>
      <p>
        Visitors' fees will be <b>£{fees.visitor}</b> for the first 3 visits, after that they will
        be required to join as full members of the club where their visitors fees will be deducted
        from the membership fee due.
      </p>
      <p>
        Those members picked to play in any league teams are asked to pay a nominal fee of{" "}
        <b>£{fees.match}</b> per match to cover costs.
      </p>
    </>
  );
};

export default About;
