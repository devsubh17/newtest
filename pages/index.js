import { MetaHead } from "../components/BaseComponents/Meta_Head";
import LandingPage from "../components/LandingPage";

export default function Home() {
  return (
    <div>
      <MetaHead title="Home" url="/" />
      <LandingPage />
    </div>
  );
}
