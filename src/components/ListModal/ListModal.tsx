import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './ListModal.scss'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { AppState } from '../../redux/store';
import { fetchLists } from '../../api/list';

interface BasicModalProps {
  open: boolean,
  handleClose: () => void
}

const BasicModal: React.FunctionComponent<BasicModalProps> = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listState = useSelector((state: AppState) => state.listState);

  useEffect(() => {
    fetchLists(dispatch)
  }, [dispatch, listState.lists])

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="custom-modal" style={{ background: 'black', color: 'red', overflow: 'hidden' }}>
          <Button
            onClick={handleClose}
            className='close-button'
          >
            X
          </Button>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: 'red' }}>Name</TableCell>
                  <TableCell style={{ color: 'red' }}>Visibility</TableCell>
                  <TableCell style={{ color: 'red' }}>Games</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listState.lists.map((list: any) => (
                  <TableRow key={list.id}>
                    <TableCell style={{ color: 'red' }} >{list.name}</TableCell>
                    <TableCell style={{ color: 'red' }} >{list.visibility}</TableCell>
                    <TableCell style={{ color: 'red' }} >{list.items.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
