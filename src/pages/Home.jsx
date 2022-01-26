import { Link } from "react-router-dom";
import HomeSvg from "../assets/svgs/Home.svg";
import HomeLogo from "../assets/imgs/2day.png";

export function Home() {
  return (
    <section className="home-page">
      <header className="flex">

<div className="logo-header">
<img src={HomeLogo} alt=""></img>
</div>
        <button className="start-btn">Login</button>


      </header>
      <div className="main-home-page-container">
        <div>

        <h1>
          A new way to manage 
        </h1>
        <h1>
        your <span>work</span>
        </h1>
        <p>Plan, Organize, Track. In One Visual collaborative space.    </p>
        </div>
        <div className="home-page-img-container">

          <img src={HomeSvg} alt=""></img>
        </div>
      </div>
      <Link className="clean-link link-container" to="/myday/board">
        <button className="start-btn">Quick Start</button>
      </Link>
    </section>
  );
}
