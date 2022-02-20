import Head from "next/head";
import Router from "next/router";
import { IsCSR } from "../../util/helper";

const defaultKeywords = [
  "Reegram",
  "Instagram Story Viewer",
  "Browse Instagram posts without logging in.",
  "Search the profile",
  "Search through the Hashtags",
  "Visit profiles without logging in",
  "Check out Highlight Stories",
];

export function MetaHead({
  desc,
  title = "Reegram",
  imgUrl,
  children,
  keywords,
  url,
}) {
  const formattedTitle = title ? `${title} | ` : "";
  const domainedURL = `${process.env.NEXT_PUBLIC_DOMAIN}${url}`;
  const domainedImgURL = `${process.env.NEXT_PUBLIC_DOMAIN}${imgUrl}`;

  return (
    <>
      <Head>
        <title>{formattedTitle} Reegram</title>
        <meta property="title" content={formattedTitle} />
        <meta property="og:title" content={formattedTitle} />
        <meta property="twitter:title" content={formattedTitle} />

        <meta charSet="utf-8" />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta name="application-name" content={title} />
        <meta name="theme-color" content="#d6249f" />
        <meta name="apple-mobile-web-app-title" content={title} />
        <meta name="msapplication-TileColor" content="#d6249f" />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, minimum-scale=1"
        />

        <meta property="type" content="website" />
        <meta property="og:type" content="website" />
        <meta property="twitter:type" content="website" />

        {keywords && (
          <>
            <meta name="keywords" content={keywords} />
          </>
        )}
        <meta name="keywords" content={defaultKeywords} />

        {domainedURL && (
          <>
            <meta property="url" content={domainedURL} />
            <meta property="og:url" content={domainedURL} />
            <meta property="twitter:url" content={domainedURL} />
          </>
        )}

        {desc && (
          <>
            <meta name="description" content={desc} />
            <meta property="description" content={desc} />
            <meta property="og:description" content={desc} />
            <meta property="twitter:description" content={desc} />
          </>
        )}

        {imgUrl && (
          <>
            <meta property="image" content={domainedImgURL} />
            <meta property="og:image" content={domainedImgURL} />
            <meta property="twitter:image" content={domainedImgURL} />
            <meta property="twitter:card" content="summary_large_image" />
          </>
        )}
        {children}
      </Head>
    </>
  );
}
