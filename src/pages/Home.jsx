import { Link } from "react-router-dom";
import HomeSvg from "../assets/svgs/Home.svg";
export function Home() {
  return (
    <section className="home-page">
      <img src={HomeSvg} alt=""></img>
      <Link to="/myday/board">
        <button>Get Started</button>
      </Link>
    </section>
  );
}
