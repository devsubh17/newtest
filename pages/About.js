import { MetaHead } from "../components/BaseComponents/Meta_Head";
import About from "../components/About/Index";

export default function Home() {
 
  return (
    <div>
      <MetaHead title="About Us | Invewer" url="/About" />
      <About />
    </div>
  );
}
