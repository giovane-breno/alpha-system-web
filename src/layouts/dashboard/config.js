import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { AccountBox, AdminPanelSettings, AirplaneTicket, Apartment, BarChart, GraphicEq, House, ManageSearch, Person, Quickreply, Receipt } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Inicio',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <House />
      </SvgIcon>
    )
  },
  {
    title: 'Consultas',
    path: '/consultas',
    icon: (
      <SvgIcon fontSize="small">
        <ManageSearch />
      </SvgIcon>
    )
  },
  {
    title: 'Funcionarios',
    path: '/funcionarios',
    icon: (
      <SvgIcon fontSize="small">
        <Person />
      </SvgIcon>
    )
  },
  {
    title: 'Demonstrativos',
    path: '/demonstrativos',
    icon: (
      <SvgIcon fontSize="small">
        <Receipt />
      </SvgIcon>
    )
  },
  {
    title: 'Empresas',
    path: '/empresas',
    icon: (
      <SvgIcon fontSize="small">
        <Apartment />
      </SvgIcon>
    )
  },
  {
    title: 'Recursos Humanos',
    path: '/rh',
    icon: (
      <SvgIcon fontSize="small">
        <AccountBox />
      </SvgIcon>
    )
  },
  {
    title: 'Administradores',
    path: '/admins',
    icon: (
      <SvgIcon fontSize="small">
        <AdminPanelSettings />
      </SvgIcon>
    )
  },
];
