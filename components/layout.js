import Head from 'next/head'
import Navbar from './nav'

export default function Layout({ children, home }) {
    return (
        <div className="main-container">
            <Head>

            </Head>
            <header className="header">
                <Navbar />
            </header>
            <main>{children}</main>
        </div>
    )
}