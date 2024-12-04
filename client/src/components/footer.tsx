import React from 'react'
import Link from "next/link";

const Footer = () => {
    return (
        <footer className='footer'>
            <p>&copy; 2024 EDROH. All Rights Reserved.</p>
            <div className='footer__links'>
                {["About","Privacy Policy","Licensing","Contact"].map((item)=><Link scroll={false} href={`/${item.toLowerCase().replace(" ","-")}`} key={item} className='footer__link'>{item}</Link> )}
            </div>
        </footer>
    )
}
export default Footer
