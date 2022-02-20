import "../styles/globals.css";
import { Layout } from "../components/layout";
import { Store } from "../components/store/store";
import { getCookie } from '../util/sessions';
import { TOKEN } from '../util/constants';
import { redirect } from '../util/helper';

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyApp({ Component, pageProps, }) {
  return (
      <Store>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Store>
  );
}

MyApp.getInitialProps = async ({ ctx }) => {
  let pageProps = {};
  const allowedRoutes = [  
    "/login",
    "/about",
    "/privacy",
    "/termcondition"
  ]

  const token = getCookie(TOKEN, ctx);

  if(!token && !allowedRoutes.find((e) => ctx?.asPath?.toLowerCase().includes(e)) ){
    redirect(ctx, '/login');
  }
  return {
    pageProps: {
      ...pageProps,
    },
  };
};

export default MyApp;
