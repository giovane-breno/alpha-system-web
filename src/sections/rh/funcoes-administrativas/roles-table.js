import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  Chip,
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
import { DeleteModal, DemoteModal, MenuButton, PromoteModal, ViewModal } from './modal/roles-actions-modal';
import { ErrorOutline } from '@mui/icons-material';

export const RolesTable = (props) => {
  const {
   refreshState,
    setRefreshState,
    count = 0,
    items = [],
    onPageChange = () => { },
    onRowsPerPageChange,
    page = 1,
    rowsPerPage = 0,
    isLoading = true,
    isEmpty = true,
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
                  Função
                </TableCell>
                <TableCell>
                  Data da Criação
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
                          {data.name}
                        </TableCell>
                        <TableCell>
                          <Chip sx={{ backgroundColor: 'info.main', color: 'white' }} label={data.created_at} size='small' />
                        </TableCell>
                        <TableCell>
                          <ButtonGroup aria-label="outlined primary button group">
                            <ViewModal id={data.id} refreshState={refreshState} setRefreshState={setRefreshState}/>
                            <DeleteModal id={data.id} refreshState={refreshState} setRefreshState={setRefreshState} />
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