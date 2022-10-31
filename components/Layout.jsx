import React from 'react'
//same functionality as HTML head
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div className="layout">
      <Head>
        <title>AudioHero</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
          {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
