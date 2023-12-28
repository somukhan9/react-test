import { useState } from 'react'

function SearchBox({ setFilteredContactList, fromA }) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleOnInputChange = async (event) => {
    setSearchQuery(event.target.value)
    if (fromA) {
      const resp = await fetch(
        `https://contact.mediusware.com/api/contacts/?search=${event.target.value}`
      )
      const { results } = await resp.json()
      setFilteredContactList(results)
    } else {
      const resp = await fetch(
        `https://contact.mediusware.com/api/country-contacts/United%20States/?search=${event.target.value}`
      )
      const { results } = await resp.json()
      setFilteredContactList(results)
    }
  }
  const handleOnSubmit = async (event) => {
    event.preventDefault()

    const resp = await fetch(
      `https://contact.mediusware.com/api/country-contacts/United%20States/?search=${searchQuery}`
    )
    const { results } = await resp.json()
    setFilteredContactList(results)
  }
  return (
    <form
      onSubmit={handleOnSubmit}
      style={{ display: 'flex', rowGap: '10px', margin: '20px 0' }}
    >
      <input
        type="text"
        name="search"
        id="search"
        value={searchQuery}
        onChange={handleOnInputChange}
        placeholder="Search here..."
      />
      <button type="submit">Search</button>
    </form>
  )
}
export default SearchBox
