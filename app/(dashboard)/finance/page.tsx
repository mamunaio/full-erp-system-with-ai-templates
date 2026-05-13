import { Metadata } from 'next';

export const metadata: Metadata = { title: 'FINANCE | Injaazh ERP' };

export default function Page() { return ( <div className='p-8'> <h1 className='text-3xl font-bold'>FINANCE</h1> <p className='text-muted-foreground mt-2'>Manage your finance operations here.</p> </div> ); }
