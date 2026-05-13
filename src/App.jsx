import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MyList from './pages/MyList'
import ShowDetails from './pages/ShowDetail'
import {MyListProvider} from './context/MyListContext'

function App() {
  return (
    <MyListProvider>
      <Router>
        <div className='min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-black'>
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/shows/:id" element={<ShowDetails />} />
          </Routes>
        </div>
        </div>
      </Router>
    </MyListProvider>
  )
}
