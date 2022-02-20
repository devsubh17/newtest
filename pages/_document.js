import Document, { Html, Head, Main, NextScript } from "next/document";
import { Children } from "react";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="facebook-domain-verification" content="8s2rzrkea8eoddk6rcnz7mr1pmelah" />
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
          <meta name="application-name" content="Reegram" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
          <meta name="apple-mobile-web-app-title" content="Reegram" />
          <meta name="description" content="Reegram is an Instagram online web Viewer. Browse Instagram content without logging in."/>
          <meta name="format-detection" content="telephone=yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta property="og:locale" content="en_US"/>
          <meta property="og:type" content="article"/>
          <meta property="fb:app_id" content="455371749529057"/>
          <meta property="og:title" content="Reegram | Instagram online web Viewer Website"/>
          <meta property="og:description" content="Reegram is an Instagram online web Viewer. Browse Instagram content without logging in."/>
          <meta property="og:url" content="https://Reegram.com"/>
          <meta property="og:site_name" content="Reegram"/>
          <meta property="og:image" content="https://Reegram.com/reegram-logo.png"/>
          <meta property="og:image:alt" content="https://Reegram.com/Reegram-logo.png"/>
          <meta property="og:image:width" content="1024"/>
          <meta property="og:image:height" content="576"/>
          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="twitter:creator" content="@Reegram"/>
          <meta name="twitter:site" content="@Reegram"/>
          <meta name="twitter:label1" content="Written by"/>
          <meta name="twitter:data1" content="Jack Rude"/>
          <meta name="twitter:label2" content="Est. reading time"/>
          <meta name="twitter:data2" content="5 minutes"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        ...Children.toArray(initialProps.styles),
        sheet.getStyleElement(),
      ],
    };
  } finally {
    sheet.seal();
  }
};
