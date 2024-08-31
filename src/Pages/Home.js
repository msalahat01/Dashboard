import React  from 'react';
import Navbar from '../Component/Navbar';
import TableComponent from '../Component/Table';

function Home() {
  return (

    <>
    <Navbar/>
    
    <div className='content'>

        <div className='Table' style={{ width: '95%',margin: '0 auto',marginTop: '2%',marginBottom: '1%',
           boxShadow: "0 1px 10px rgba(0,0,0,0.4)"}}>

        <TableComponent/>

        </div>  

    </div>  
  </>
  )
}

export default Home;