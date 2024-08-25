import React, { useState } from 'react';
import './App.css';

function App() {
    const [inputData, setInputData] = useState('');
    const [response, setResponse] = useState(null);
    const [filter, setFilter] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('https://your-backend-url.com/bfhl', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: JSON.parse(inputData) })
            });
            const result = await res.json();
            setResponse(result);
        } catch (error) {
            alert('Invalid JSON input');
        }
    };

    const handleFilterChange = (e) => {
        const { options } = e.target;
        const selectedOptions = Array.from(options).filter(option => option.selected).map(option => option.value);
        setFilter(selectedOptions);
    };

    const renderResponse = () => {
        if (!response) return null;
        let filteredData = {};
        if (filter.includes('Alphabets')) filteredData.alphabets = response.alphabets;
        if (filter.includes('Numbers')) filteredData.numbers = response.numbers;
        if (filter.includes('Highest lowercase alphabet')) filteredData.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
        return <pre>{JSON.stringify(filteredData, null, 2)}</pre>;
    };

    return (
        <div className="App">
            <h1>JSON Processor</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    placeholder='Enter JSON'
                />
                <button type="submit">Submit</button>
            </form>
            {response && (
                <>
                    <select multiple onChange={handleFilterChange}>
                        <option value="Alphabets">Alphabets</option>
                        <option value="Numbers">Numbers</option>
                        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
                    </select>
                    {renderResponse()}
                </>
            )}
        </div>
    );
}

export default App;
