import { Metadata } from 'next';

export const metadata: Metadata = { title: 'INVENTORY | Injaazh ERP' };

export default function Page() { return ( <div className='p-8'> <h1 className='text-3xl font-bold'>INVENTORY</h1> <p className='text-muted-foreground mt-2'>Manage your inventory operations here.</p> </div> ); }
