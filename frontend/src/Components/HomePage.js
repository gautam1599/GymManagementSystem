import UncontrolledExample from './InfoCarousel.js';
import Calendar from './classSchedule';
import Navbar from "./Navbar";
import MembershipPlans from './MembersipPlans.js';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const locationOptions = [
  { value: 'one', label: 'one' },
  { value: 'two', label: 'two' },
  { value: 'three', label: 'three' },
];

function HomePage({ selectedLocation }) {
  const [showModal, setShowModal] = useState(false);
  //const history = useHistory();
  const navigate = useNavigate();
  const handleCalendarClick = () => {

    setShowModal(true);

  }
  const handleModalConfirm = () => {
    setShowModal(false);
    //history.push('/login');
    navigate('/login')
  }

  const handleModalCancel = () => {
    setShowModal(false);
  }

  const handleClose = () => setShowModal(false);

  return (
    <div>
      <UncontrolledExample />
      <MembershipPlans id="membership" />
      <div > <Calendar selectedLocation={selectedLocation} id="sch" /></div>

      <Modal show={showModal} onHide={handleModalCancel}>
        <Modal.Header closeButton>
          <Modal.Title>You must login to register for classes</Modal.Title>
        </Modal.Header>
        <Modal.Body>Go to Login?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleModalCancel}>
            No
          </Button>
          <Button variant="dark" onClick={handleModalConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  );
}

export default HomePage;