import React from 'react'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-info mb-4">
      <div className="container-fluid">
          <Image src="/next.svg" alt="Next.js" width={100} height={50} />
        <a className="navbar-brand fw-bold fs-2 opacity-75" href="#">CRUD Next.JS Drizzle MySQL</a>
      </div>
    </nav>
  )
}