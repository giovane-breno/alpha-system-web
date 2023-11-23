import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  CircularProgress,
  IconButton,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import { useState } from 'react';
import { DeleteModal, ViewModal } from './modal/workers-actions-modal';
import { ErrorOutline } from '@mui/icons-material';

export const WorkersTable = (props) => {
  const {
    abilities,
    count = 0,
    items = [],
    onPageChange = () => { },
    onRowsPerPageChange,
    page = 1,
    rowsPerPage = 0,
    isLoading = true,
    isEmpty = true,

    refreshState,
    setRefreshState,
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }} >
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
            {!isLoading ?
              !isEmpty ?
                <TableBody>
                  {items.map((data) => {
                    return (
                      <TableRow
                        hover
                        key={data.id}
                      >
                        <TableCell>
                          <Typography variant="subtitle3" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                            #{data.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {data.username}
                        </TableCell>
                        <TableCell>
                          {data.full_name}
                        </TableCell>
                        <TableCell>
                          {data.email}
                        </TableCell>
                        <TableCell>
                          {data.role.name}
                        </TableCell>
                        <TableCell>
                          {data.division.name}
                        </TableCell>
                        <TableCell>
                          <ButtonGroup aria-label="outlined primary button group">
                            <ViewModal id={data.id} data={data} refreshState={refreshState}
                              setRefreshState={setRefreshState} />
                            {abilities.includes('deleteUser') &&
                              <DeleteModal id={data.id} refreshState={refreshState} setRefreshState={setRefreshState} />
                            }
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                :
                <TableBody>
                  <TableCell colSpan={7}>
                    <Box sx={{ justifyContent: 'center' }}>
                      <Typography variant='subtitle'><ErrorOutline sx={{ verticalAlign: 'bottom' }} /> Não há dados nessa tabela.</Typography>

                    </Box>
                  </TableCell>
                </TableBody>
              :
              <TableBody>
                <TableCell colSpan={7}>
                  <Box sx={{ justifyContent: 'center' }}>
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableBody>

            }


          </Table>
        </Box>
      </Scrollbar>
      {!isLoading && !isEmpty &&
        <TablePagination
          labelDisplayedRows={
            ({ from, page, count }) => {
              return 'Mostrando ' + from + ' de ' + count + ' itens | Página ' + (page + 1)
            }
          }
          rowsPerPageOptions={-1}
          component="div"
          shape="rounded"
          count={count}
          onPageChange={onPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      }

    </Card>
  );
};

