import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalA from './Modals/ModalA'
import ModalB from './Modals/ModalB'
import ModalC from './Modals/ModalC'

const Problem2 = () => {
  const [showModalA, setShowModalA] = useState(false)
  const [showModalB, setShowModalB] = useState(false)
  const [showModalC, setShowModalC] = useState(false)
  const [modalCData, setModalCData] = useState({})

  const handleShowA = () => {
    const searchParams = new URLSearchParams(window.location.search)

    searchParams.set('cn', 'all')

    window.history.replaceState(null, null, `?${searchParams.toString()}`)

    setShowModalA(true)
  }

  const handleShowB = () => {
    const searchParams = new URLSearchParams(window.location.search)

    searchParams.set('cn', 'us')

    window.history.replaceState(null, null, `?${searchParams.toString()}`)
    setShowModalB(true)
  }

  const handleShowC = () => {
    setShowModalC(true)
  }

  const handleCloseA = () => {
    const searchParams = new URLSearchParams(window.location.search)

    searchParams.delete('cn')

    window.history.replaceState(null, null, `${window.location.pathname}`)
    setShowModalA(false)
  }
  const handleCloseB = () => {
    const searchParams = new URLSearchParams(window.location.search)

    searchParams.delete('cn')

    window.history.replaceState(null, null, `${window.location.pathname}`)
    setShowModalB(false)
  }
  const handleCloseC = () => {
    setShowModalC(false)
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={handleShowA}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={handleShowB}
          >
            US Contacts
          </button>
        </div>
      </div>
      <ModalA
        showModalA={showModalA}
        handleCloseA={handleCloseA}
        handleShowB={handleShowB}
        handleShowC={handleShowC}
        showModalC={showModalC}
        handleCloseC={handleCloseC}
        setModalCData={setModalCData}
      />
      <ModalB
        showModalB={showModalB}
        handleCloseB={handleCloseB}
        handleShowA={handleShowA}
        handleShowC={handleShowC}
        showModalC={showModalC}
        handleCloseC={handleCloseC}
        setModalCData={setModalCData}
      />

      <ModalC
        showModalC={showModalC}
        handleCloseC={handleCloseC}
        contact={modalCData}
      />
    </div>
  )
}

export default Problem2
