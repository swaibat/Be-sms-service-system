import Response from '../../utils/response';
import Router from '../../config';

const optMiddleware = {
  verifyOtp: async (req, res) => {
    function text(url) {
      return Router.get(url).then((res) => res.data);
    }

    text('https://www.cloudflare.com/cdn-cgi/trace').then((data) => {
      let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
      let ip = data.match(ipRegex)[0];
      console.log(ip);
    });
    // try {
    //   const response = await Router.get(
    //     `http://apilayer.net/api/validate?access_key=9ccc6d0a2b60b28b139281baf9fedc76&number=${msisdn}`
    //   );
    //   console.log(msisdn);
    //   return res.status(200).send(response.data);
    // } catch (error) {
    //   console.log(error);
    //   return res.status(422).send(response.data);
    // }
  },
};

export default optMiddleware;
