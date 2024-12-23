import { inter } from './fonts';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'CV Builder using AI!',
    description: 'Create your professional CV easily with our AI-powered CV builder.',
    robots: 'noindex, nofollow',
    icons: {
        icon: '/images/favicon.ico'
    }
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <ToastContainer />

                <div className='min-h-screen flex flex-col'>
                    <main className='flex-1 relative'>
                        <div className='max-w-3xl mx-auto'>{children}</div>
                    </main>
                </div>
            </body>
        </html>
    );
}
