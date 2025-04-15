import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {
  MemoryRouter,
  Route,
  Routes,
  Link,
  matchPath,
  useLocation,
  StaticRouter,
} from 'react-router';

import Usuarios from '../components/usuarios.js'
import Medicos from '../components/medicos.js'
import App from '../App.js'


function Router(props) {
    const { children } = props;
    if (typeof window === 'undefined') {
      return <StaticRouter location="/drafts">{children}</StaticRouter>;
    }
  
    return (
      <MemoryRouter initialEntries={['/drafts']} initialIndex={0}>
        {children}
      </MemoryRouter>
    );
  }
  
  Router.propTypes = {
    children: PropTypes.node,
  };
  
  function useRouteMatch(patterns) {
    const { pathname } = useLocation();
  
    for (let i = 0; i < patterns.length; i += 1) {
      const pattern = patterns[i];
      const possibleMatch = matchPath(pattern, pathname);
      if (possibleMatch !== null) {
        return possibleMatch;
      }
    }
  
    return null;
  }
  
  function MyTabs() {
    // You need to provide the routes in descendant order.
    // This means that if you have nested routes like:
    // users, users/new, users/edit.
    // Then the order should be ['users/add', 'users/edit', 'users'].
    const routeMatch = useRouteMatch(['/consultas', '/pacientes', '/medicos', '/especialidades']);
    const currentTab = routeMatch?.pattern?.path;
  
    return (
      <Tabs value={currentTab}>
        <Tab label="Consultas" value="/consultas" to="/consultas" component={Link} />
        <Tab label="Pacientes" value="/pacientes" to="/pacientes" component={Link} />
        <Tab label="Médicos" value="/medicos" to="/medicos" component={Link} />
        <Tab label="Especialidades" value="/especialidades" to="/especialidades" component={Link} />
      </Tabs>
    );
  }
  
  function CurrentRoute() {
    const location = useLocation();
  
    return (
      <Typography variant="body2" sx={{ color: 'text.secondary', pb: 2 }}>
        Current route: {location.pathname}
      </Typography>
    );
  }
  
  export default function TabsRouter() {
    return (
      <Router>
        <Box sx={{ width: '100%' }}>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/pacientes" element={<Usuarios />} />
            <Route path="/medicos" element={<Medicos />} />
            {/* <Route path="/especialidades" element={<Especialidade />} />
            <Route path="/consultas" element={<Consulta />} /> */}
        </Routes>
          <MyTabs />
        </Box>
      </Router>
    );
  }