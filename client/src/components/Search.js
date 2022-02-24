import React, { useState, useEffect } from 'react'
import '../css/search.css'
const removePunctuation = require('../formatString')

export default function Search() {

    const [searchQuery, setSearchQuery] = useState('')
    const [queryResponse, setQueryResponse] = useState([])

    //set input text, fetch and set query response on each input
    const handleChange = (e) => {
        setSearchQuery(e.target.value)
    }


    //when searchquery input is changed, send query and get response, add response to array
    useEffect(() => {
        console.log(removePunctuation(searchQuery))
        if (searchQuery !== '') { 

        fetch('http://localhost:5000/search', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({query: removePunctuation(searchQuery)})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data['results'])
            setQueryResponse(data['results'])
        })
    }
    }, [searchQuery])

  return (
    <div id='search-container'>
        <h1>Search FAQ's</h1>
        <input 
            type='text' 
            name='query' 
            id='search-input'
            placeholder='Enter search query...'
            onChange={handleChange}
            autocomplete='off'
        />
        <ul id='response-list'>
        {queryResponse.length === 0 && searchQuery !== '' ? <li  className='response-item' >No matches</li> : 
            queryResponse.map((res, i) => (
                
                <li 
                className='response-item' key={i}>
                <h4>{(res['text'].substr(0, res['text'].indexOf('?') + 1).substr(9)).replace('â€™', "'")}</h4>
                <p>{(res['text'].substr(res['text'].indexOf('?') + 2, 100)).replace('â€™', "'")}...</p>
                </li>
            ))
        }
        </ul>
    </div>
  )
}

