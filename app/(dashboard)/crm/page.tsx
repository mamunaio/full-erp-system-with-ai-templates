import { Metadata } from 'next';

export const metadata: Metadata = { title: 'CRM | Injaazh ERP' };

export default function Page() { return ( <div className='p-8'> <h1 className='text-3xl font-bold'>CRM</h1> <p className='text-muted-foreground mt-2'>Manage your crm operations here.</p> </div> ); }
