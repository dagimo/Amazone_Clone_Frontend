import React from 'react'
import { RingLoader } from 'react-spinners'

function Loader() {
  return (
    <div
    style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
    }}>
        <RingLoader />
    </div>
  )
}

export default Loader