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
import { DeleteModal, DemoteModal, MenuButton, PromoteModal, ViewModal } from './modal/incident-actions-modal';
import { ErrorOutline } from '@mui/icons-material';

export const IncidentTable = (props) => {
  const {
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
                  Funcionário
                </TableCell>
                <TableCell>
                  Motivo
                </TableCell>
                <TableCell>
                  Descontos
                </TableCell>
                <TableCell>
                  Data de Inicio
                </TableCell>
                <TableCell>
                  Data de Final
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
                          {data.user.full_name}
                        </TableCell>
                        <TableCell>
                          {data.incident_reason}
                        </TableCell>
                        <TableCell>
                          <Typography color={'error.main'} sx={{ fontWeight: 600 }}>
                            R$ {data.discounted_amount}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip sx={{ backgroundColor: 'success.main', color: 'white' }} label={data.start_date} size='small' />
                        </TableCell>
                        <TableCell>
                          <Chip sx={{ backgroundColor: 'error.main', color: 'white' }} label={data.end_date} size='small' />
                        </TableCell>
                        <TableCell>
                          <ButtonGroup aria-label="outlined primary button group">
                            <ViewModal id={data.id} />
                            <DeleteModal id={data.id} />
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