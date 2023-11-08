import { format } from 'date-fns';
import {
  Box,
  Card, IconButton, Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import { useState } from 'react';


export const RhTable = (props) => {
  const {
    count = 0, items = [], onDeselectAll, onDeselectOne, onPageChange = () => { }, onRowsPerPageChange, onSelectAll, onSelectOne, page = 0, rowsPerPage = 0, selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  const [value, setValue] = useState('0');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card>
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example">
          <Tab value="0" label="Beneficios" />
          <Tab value="1" label="Divisões" />
          <Tab value="2" label="Gratificações" />
          <Tab value="3" label="Incidentes" />
          <Tab value="4" label="Funções" />
          <Tab value="5" label="férias" />
        </Tabs>
      </Box>
      {value === '0' && (
        <Scrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Id
                  </TableCell>
                  <TableCell>
                    Usuário
                  </TableCell>
                  <TableCell>
                    Nome Completo
                  </TableCell>
                  <TableCell>
                    Email
                  </TableCell>
                  <TableCell>
                    Função
                  </TableCell>
                  <TableCell>
                    Divisão
                  </TableCell>
                  <TableCell>
                    Ações
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((customer) => {
                  const isSelected = selected.includes(customer.id);
                  const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

                  return (
                    <TableRow
                      hover
                      key={customer.id}
                      selected={isSelected}
                    >
                      <TableCell>
                        <Typography variant="subtitle3" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                          #{customer.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {customer.username}
                      </TableCell>
                      <TableCell>
                        {customer.name}
                      </TableCell>
                      <TableCell>
                        {customer.email}
                      </TableCell>
                      <TableCell>
                        {customer.role}
                      </TableCell>
                      <TableCell>
                        {customer.division}
                      </TableCell>
                      <TableCell>
                        <IconButton>
                          <MoreHoriz />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
          <TablePagination
            component="div"
            shape="rounded"
            count={count}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]} />
        </Scrollbar>
      )}
      {value === '4' && (
        <Scrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Id
                  </TableCell>
                  <TableCell>
                    Nome
                  </TableCell>
                  <TableCell>
                    Salário Base
                  </TableCell>
                  <TableCell>
                    Ações
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {items.map((customer) => { */}
                {/* const isSelected = selected.includes(customer.id);
                    const createdAt = format(customer.createdAt, 'dd/MM/yyyy'); */}

                {/* return ( */}
                <TableRow
                  hover
                  // key={customer.id}
                >
                  <TableCell>
                    <Typography variant="subtitle3" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                      {/* #{customer.id} */}#123
                    </Typography>
                  </TableCell>
                  <TableCell>
                    Suporte Técnico
                  </TableCell>
                  <TableCell>
                    R$ 1.700
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <MoreHoriz />
                    </IconButton>
                  </TableCell>
                </TableRow>
                {/* ); */}
                {/* })} */}
              </TableBody>
            </Table>
          </Box>
          <TablePagination
            component="div"
            shape="rounded"
            count={count}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]} />
        </Scrollbar>
      )}


    </Card>
  );
};
