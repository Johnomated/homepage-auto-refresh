import genericProxyHandler from "utils/proxy/handlers/generic";

const widget = {
  api: "{url}/api/?apikey={key}&output=json&mode={endpoint}&limit={limit}",
  proxyHandler: genericProxyHandler,

  mappings: {
    queue: {
      endpoint: "queue",
      validate: ["queue"],
      params: ["limit"], // limit caps the number of queued jobs to display
    },
    history: {
      endpoint: "history",
      validate: ["history"],
      params: ["limit"], // limit caps the number of queued jobs to display
    },
  },
};

export default widget;
