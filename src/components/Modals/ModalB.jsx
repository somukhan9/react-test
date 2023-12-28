import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import SearchBox from '../SearchBox'

const ModalB = ({
  showModalB,
  handleCloseB,
  handleShowA,
  handleShowC,
  setModalCData,
}) => {
  const [contactList, setContactList] = useState([])
  const [filteredContactList, setFilteredContactList] = useState([])

  const [loading, setLoading] = useState(true)

  const showEventContacts = () => {
    const eventContacts = contactList.filter((contact) => contact.id % 2 === 0)
    setFilteredContactList(eventContacts)
  }

  const showAllContacts = () => {
    setFilteredContactList(contactList)
  }

  useEffect(() => {
    // "https://contact.mediusware.com/api/country-contacts/United%20States/?page=2"
    ;(async () => {
      try {
        const resp = await fetch(
          `https://contact.mediusware.com/api/country-contacts/United%20States/?page=1`,
          { method: 'GET' }
        )

        const data = await resp.json()

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
    <Modal show={showModalB} onHide={handleCloseB}>
      <Modal.Header closeButton>
        <Modal.Title>US Contacts</Modal.Title>
      </Modal.Header>
      {loading ? (
        <Modal.Body>Loading...</Modal.Body>
      ) : (
        <>
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
        </>
      )}
      <Modal.Footer>
        <label htmlFor="eventContact">Only Even</label>
        <input
          type="checkbox"
          name="eventContact"
          id="eventContact"
          onChange={(e) =>
            e.target.checked ? showEventContacts() : showAllContacts()
          }
        />
        <Button variant="secondary" onClick={handleCloseB}>
          Close
        </Button>
        <Button
          variant="primary"
          style={{ backgroundColor: '#46139f', border: '1px solid #46139f' }}
          onClick={() => {
            handleCloseB()
            handleShowA()
          }}
        >
          All Contacts
        </Button>
        <Button
          variant="primary"
          style={{ backgroundColor: '#ff7f50', border: '1px solid #ff7f50' }}
          onClick={handleCloseB}
        >
          US Contacts
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ModalB
