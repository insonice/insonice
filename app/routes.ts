import { type RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

const createRoutes = async () => {
  const routes = await flatRoutes();
  return routes;
};

export default createRoutes() satisfies RouteConfig;
