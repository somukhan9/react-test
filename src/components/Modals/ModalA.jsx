import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'

import Modal from 'react-bootstrap/Modal'
import SearchBox from '../SearchBox'

const ModalA = ({
  showModalA,
  handleCloseA,
  handleShowB,
  handleShowC,
  setModalCData,
}) => {
  const [contactList, setContactList] = useState([])
  const [filteredContactList, setFilteredContactList] = useState([])
  const [loading, setLoading] = useState(true)
  const [checked, setChecked] = useState(false)

  const showEventContacts = () => {
    const eventContacts = contactList.filter((contact) => contact.id % 2 === 0)
    setFilteredContactList(eventContacts)
  }

  const showAllContacts = () => {
    setFilteredContactList(contactList)
  }

  useEffect(() => {
    // https://contact.mediusware.com/api/contacts/?page=2
    ;(async () => {
      try {
        const resp = await fetch(
          `https://contact.mediusware.com/api/contacts/?page=1`,
          { method: 'GET' }
        )

        const data = await resp.json()

        // console.log(data.results)
        setFilteredContactList(data.results)
        setContactList(data.results)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <Modal show={showModalA} onHide={handleCloseA}>
      <Modal.Header closeButton>
        <Modal.Title>All Contacts</Modal.Title>
      </Modal.Header>
      {loading ? (
        <Modal.Body>Loading...</Modal.Body>
      ) : (
        <Modal.Body>
          <SearchBox
            fromA={false}
            setFilteredContactList={setFilteredContactList}
          />
          {filteredContactList?.map((data, index) => (
            <div
              key={index}
              onClick={() => {
                setModalCData(data)
                handleShowC()
              }}
              style={{
                display: 'flex',
                rowGap: '10px',
                cursor: 'pointer',
                margin: '10px 0',
              }}
            >
              <h5>{data.country.name}</h5>
              <p>{data.phone}</p>
            </div>
          ))}
        </Modal.Body>
      )}
      <Modal.Footer>
        <label htmlFor="eventContact">Only Even</label>
        <input
          type="checkbox"
          name="eventContact"
          id="eventContact"
          value={checked}
          onChange={(e) =>
            e.target.checked ? showEventContacts() : showAllContacts()
          }
        />
        <Button variant="secondary" onClick={handleCloseA}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleCloseA}
          style={{ backgroundColor: '#46139f', border: '1px solid #46139f' }}
        >
          All Contacts
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleCloseA()
            handleShowB()
          }}
          style={{ backgroundColor: '#ff7f50', border: '1px solid #ff7f50' }}
        >
          US Contacts
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ModalA
