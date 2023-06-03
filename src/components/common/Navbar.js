import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

    const searchQuery = (query) => document.location.assign("/Search/" + query)
    return (
        <nav className="main-nav navbar navbar-expand-lg sticky-top">
            <div className="container">
                <Link to="/"><span className='fs-5'><span className='fs-2 fst-italic fw-bold' style={{color: "#FF0000", fontStyle: "italic"}}>Otaku </span>Palace</span></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                    <div className="d-flex">
                        <div className="input-group">
                            <input type="text" id="searchbox" onKeyDown={
                                (e) => {
                                    if(e.key === "Enter" && e.target.value.length > 0) {
                                        searchQuery(e.target.value)
                                    }
                                }
                            } className="form-control" placeholder="Search Something" aria-describedby="SearchButton" />
                            <button onClick={
                                () => {
                                    const searchBoxValue = document.getElementById('searchbox').value
                                    if(searchBoxValue.length > 0) searchQuery(searchBoxValue)
                                }
                            } type="button" className="btn btn-outline-secondary" id="searchButton">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
