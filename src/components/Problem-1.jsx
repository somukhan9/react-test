import React, { useEffect, useState } from 'react'

const localStorageKey = 'table-data'

const data = localStorage.getItem(localStorageKey)
  ? JSON.parse(localStorage.getItem(localStorageKey))
  : []

const sortData = (data) => {
  data.sort((a, b) => {
    const statusA = a.status.toLowerCase()
    const statusB = b.status.toLowerCase()

    if (statusA.includes('active') && !statusB.includes('active')) {
      return -1
    } else if (statusB.includes('active') && !statusA.includes('active')) {
      return 1
    } else if (
      statusA.includes('completed') &&
      !statusB.includes('completed')
    ) {
      return -1
    } else if (
      statusB.includes('completed') &&
      !statusA.includes('completed')
    ) {
      return 1
    } else {
      return 0
    }
  })

  return data
}

const Problem1 = () => {
  const [show, setShow] = useState('all')
  const [displayData, setDisplayData] = useState(data)
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    name: '',
    status: '',
  })
  // const [loading, setLoading] = useState(true)

  const handleClick = (val) => {
    setShow((prev) => {
      displaySpecificData(val)
      return val
    })
  }

  const displaySpecificData = (show) => {
    if (show.toLowerCase() === 'active') {
      const filteredData = data.filter(
        (item) => item.status.toLowerCase() === 'active'
      )
      setDisplayData(filteredData)
    } else if (show.toLowerCase() === 'completed') {
      const filteredData = data.filter(
        (item) => item.status.toLowerCase() === 'completed'
      )
      setDisplayData(filteredData)
    } else {
      setDisplayData(data)
    }
  }

  const handleOnChange = (event) => {
    // console.log(event.target.value)
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!formData.name || !formData.status) {
      console.log('Name and Status are required!')
      return
    }
    data.push(formData)
    localStorage.setItem(localStorageKey, JSON.stringify(sortData(data)))
    setFormData({ name: '', status: '' })
  }

  useEffect(() => {
    ;(() => {
      setDisplayData(data)
    })()
    setLoading(false)
  }, [])

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleOnChange}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                name="status"
                value={formData.status}
                onChange={handleOnChange}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === 'all' && 'active'}`}
                type="button"
                onClick={() => handleClick('all')}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === 'active' && 'active'}`}
                type="button"
                onClick={() => handleClick('active')}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === 'completed' && 'active'}`}
                type="button"
                onClick={() => handleClick('completed')}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayData.length === 0 && (
                <h3
                  style={{
                    marginTop: '10px',
                    textAlign: 'center',
                  }}
                >
                  No Data to Display
                </h3>
              )}
              {loading ? (
                <h3>Loading...</h3>
              ) : (
                displayData?.map((item, index) => (
                  <tr key={index}>
                    <th>{item.name}</th>
                    <th>{item.status}</th>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Problem1
