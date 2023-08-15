const ROUTE_ROLES = "/roles";
const ROUTE_USER = "/user";

const ROUTES = {
  roles: {
    base: ROUTE_ROLES,
    id: `${ROUTE_ROLES}/:id`,
  },
  user: {
    base: ROUTE_USER,
    signup: `${ROUTE_USER}/signup`,
    login: `${ROUTE_USER}/login`,
    logout: `${ROUTE_USER}/logout`,
    refresh_token: `${ROUTE_USER}/refresh-token`,
    profile: `${ROUTE_USER}/profile`,
  },
};

export default ROUTES;
