import React from 'react'
import {AiFillGithub, AiOutlineTwitter} from 'react-icons/ai'
import Link from 'next/link'


const Footer = () => {
  return (
    <div className="footer-container">
      <p>&copy;2022 AudioHero, All Rights Reserved</p>
      <p className="icons">
        <Link href='http://github.com/emlegweak'><AiFillGithub /></Link>
        <Link href="http://twitter.com/emlegweak"><AiOutlineTwitter /></Link>
      </p>
    </div>
  )
}

export default Footer
