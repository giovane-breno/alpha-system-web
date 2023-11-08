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
import { DeleteModal, DemoteModal, MenuButton, PromoteModal, ViewModal } from './modal/gratification-actions-modal';

export const GratificationTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => { },
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
                  Salário Base
                </TableCell>
                <TableCell>
                  Data da Criação
                </TableCell>
                <TableCell>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((data) => {
                const isSelected = selected.includes(data.id);
                const createdAt = format(data.createdAt, 'dd/MM/yyyy');


                return (
                  <TableRow
                    hover
                    key={data.id}
                    selected={isSelected}
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
                      <Typography color={'success.dark'} sx={{ fontWeight: 600 }}>
                        R$ {data.base_salary}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip sx={{ backgroundColor: 'info.main', color: 'white' }} label={createdAt} size='small' />
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
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        shape="rounded"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

GratificationTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
