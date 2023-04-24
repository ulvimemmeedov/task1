const ping = require("ping");
const { response } = require("../helpers/utils");

module.exports = {
  latency: async (req, res) => {
    const host = "google.com";
    const result = await ping.promise.probe(host);
    return response.success({ time: result.time + " ms", times: result.times });
  },
};
