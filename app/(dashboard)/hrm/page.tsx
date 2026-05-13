import { Metadata } from 'next';

export const metadata: Metadata = { title: 'HRM | Injaazh ERP' };

export default function Page() { return ( <div className='p-8'> <h1 className='text-3xl font-bold'>HRM</h1> <p className='text-muted-foreground mt-2'>Manage your hrm operations here.</p> </div> ); }
