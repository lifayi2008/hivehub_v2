import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar, Stack } from '@mui/material';
// components
import * as React from 'react';
import HiveLogo from '../components/_dashboard/hive/HiveLogo';
import Scrollbar from '../components/Scrollbar';
import NavSection from '../components/NavSection';
import sidebarConfig from './dashboard/SidebarConfig';
import { MHidden } from '../components/@material-extend';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 320;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2, 2, 1.5),
  height: '62px',
  borderRadius: '31px',
  backgroundColor: theme.palette.grey[200]
}));

// ----------------------------------------------------------------------

HiveDashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

const activeLink = {
  color: 'black'
};

const NavBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '80px',
  margin: '10px auto',
  textAlign: 'center',
  color: 'rgba(0, 0, 0, 0.3)'
}));

export default function HiveDashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const [activeSection, setActiveSection] = React.useState('nodes');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to="/" sx={{ display: 'inline-flex', textDecoration: 'none' }}>
          <HiveLogo />
        </Box>
      </Box>

      <Box sx={{ my: 12, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src="/static/mock-images/avatars/avatar_default.jpg" alt="photoURL" />
            <Box sx={{ ml: 1.5, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <Typography variant="subtitle1" sx={{ color: '#FF931E' }}>
                0x6f607d724b419c9535c90004ce50834c1c2eb2a0
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <Stack sx={{ mx: 2.5, mt: 4 }}>
        <NavBox>
          <Typography variant="h5" sx={{ ...(activeSection === 'home' && activeLink) }}>
            Home
          </Typography>
        </NavBox>
        <NavBox>
          <Typography variant="h5" sx={{ ...(activeSection === 'nodes' && activeLink) }}>
            My Nodes
          </Typography>
        </NavBox>
        <NavBox>
          <Typography variant="h5" sx={{ ...(activeSection === 'vaults' && activeLink) }}>
            My Vaults
          </Typography>
        </NavBox>
      </Stack>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{
            p: 2.5,
            pt: 5,
            position: 'relative'
          }}
        >
          <Box component="img" src="/static/illustrations/github.png" sx={{ width: 90 }} />

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              @ 2022 Trinity Tech Ltd.
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              backgroundColor: 'background.default',
              borderRight: 'none',
              boxShadow: '10px 0px 20px rgba(255, 147, 30, 0.2)'
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
