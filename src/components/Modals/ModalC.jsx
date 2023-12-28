import Button from 'react-bootstrap/Button'

import Modal from 'react-bootstrap/Modal'

const ModalC = ({ showModalC, handleCloseC, contact }) => {
  return (
    <Modal
      show={showModalC}
      onHide={handleCloseC}
      style={{ backgroundColor: 'white' }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Contact Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{contact?.country?.name}</h4>
        <p>{contact?.phone}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseC}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCloseC}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ModalC
