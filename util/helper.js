import moment from 'moment';


export const numFormatter = (num) => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + "k"; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + "m"; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
};

export const IsCSR = typeof window !== "undefined";


/**
 * Redirects for the browser and server
 * @param {object} ctx Next.js context or null for browser
 * @param {string} url Redirect url
 * @param {number} status HTTP status code for redirect, defaults to 302 (temporary redirect)
 */
export const redirect = ( ctx, url, status = 302 ) => {

  if ( !process.browser ) {

      ctx.res.writeHead( status, {
          Location: url,
          // Add the content-type for SEO considerations
          'Content-Type': 'text/html; charset=utf-8',
      } );
      ctx.res.end();

  }
  else {

      location.assign( url );

  }

};


export const fromNow = (timestamp) => {
  return moment(timestamp).fromNow();
}