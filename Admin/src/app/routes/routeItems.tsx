import { RoutePath } from "./constants/routePath";
import { routeMap } from "./routeMap";

const configAndPath = Object.entries(routeMap);

export const routeItems = configAndPath.map(([path, config]) => ({
  path: path as RoutePath,
  ...config.route,
}));
