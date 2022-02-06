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
<Link className="clean-link link-container" to="/login">
        <button className="start-btn">Login</button>
        </Link>

      </header>
      <div className="main-home-page-container">
        <div className="homepage-content">

        <h1>
          A new way to manage 
        </h1>
        <h1>
        your <span>work</span>
        </h1>
        <p>Plan, organize, track. In one visual collaborative space.    </p>
      <Link className="clean-link link-container" to="/2day/board">
        <button className="start-btn">Quick Start</button>
      </Link>
        </div>
        <div className="home-page-img-container">

          <img src={HomeSvg} alt=""></img>
        </div>
      </div>
    </section>
  );
}
