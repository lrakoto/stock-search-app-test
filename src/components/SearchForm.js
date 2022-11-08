import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import FavTicker from './FavTicker';

function SearchForm() {
    const baseURL = 'https://api.polygon.io/v2/aggs/ticker/';
    const [tickerValue, setTickerValue] = useState('');
    const [stockData, setStockData] = useState([]);
    const [tickerTitle, setTickerTitle] = useState('');
    const [favStocks, setFavStocks] = useState([]);
    const [favesArr, setFavesArr] = useState([]);
    const [newFavStocks, setNewFavStocks] = useState();
    let counter = 0;
    const [tickChange, setTickChange] = useState(counter);
    let searchArr = [];
    const [recentSearches, setRecentSearches] = useState(searchArr);
    useEffect(() => {
        setTickerValue(document.querySelector('#ticker').value)
        setFavStocks(favStocks)
        axios.get(`${baseURL}${tickerValue}/range/1/day/2021-07-22/2021-07-22?adjusted=true&sort=asc&limit=120&apiKey=mPXKNaP2Kf7fIbMiSPvl1qWIRMGyaTjf`)
            .then(response => {
                setStockData(response.data.results[0])
                setTickerTitle(response.data.ticker)
                let oldArr = recentSearches
                setRecentSearches(oldArr.concat([tickerValue]))
                console.log('DATA', stockData)
                console.log('SEARCHES', recentSearches)
            })
            .catch((err) => {
                console.log('ERROR:', err)
            })
    }, [tickerValue]);


    function searchFn(e) {
        e.preventDefault();
        setTickerValue(document.querySelector('#ticker').value);
        console.log(tickerValue);
    }

    function renderSearches() {
        let recents = recentSearches.map((s, idx) => <p>{s}</p>)
        return recents
    }

    // FAVORITES
    function addStock() {
        const newStock = tickerTitle
        let addList = favStocks;
        addList.push(newStock);
        setFavStocks(addList);
        counter += 1;
        setTickChange(counter)
        console.log('NEWSTOCK', favStocks)
    }

    function renderStocks() {
        let newFaves = [];
        favStocks.forEach((fs, idx) => newFaves.push({ fs }));
        function removeDuplicates(arr) {
            return arr.filter((item, index) => arr.indexOf(item) === index);
        }
        let testArr = removeDuplicates(newFaves);
        let newArray = testArr.map((a, idx) => <FavTicker title={a.fs} />)
        removeDuplicates(newArray)
        console.log('ERRRR', newArray)
        return newArray;
    }

    useEffect(() => {
        function favFn() {
            console.log('HHH', favStocks)
        }
        setTimeout(favFn, 500)
    }, [tickChange])

    return (
        <div>
            <main>
                <div class="container py-4">
                    <header class="pb-3 mb-4 border-bottom">
                        <a href="/" class="d-flex align-items-center text-dark text-decoration-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b9bd2" stroke-width="3" stroke-linecap="round" stroke-linejoin="arcs"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                            <span class="fs-4">Stock Search App</span>
                        </a>
                    </header>

                    <div class="p-5 mb-4 bg-light rounded-3">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-6">
                                    <h1 class="display-5 fw-bold">Search Stock Tickers</h1>
                                    <p class="col-md-8 fs-4">Use the form below to search stocks by their symbol.</p>

                                    <form class="row row-cols-lg-auto g-3 align-items-center" onSubmit={searchFn}>
                                        <div class="col-12">
                                            <label class="visually-hidden" for="inlineFormInputGroupUsername">ex. AAPL</label>
                                            <div class="input-group">
                                                <div class="input-group-text">Ticker</div>
                                                <input type="text" class="form-control" name="ticker" id="ticker" placeholder="ex. AAPL" />
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <button type="submit" class="btn btn-primary">Search</button>
                                        </div>
                                    </form>


                                </div>
                                <div class="col-md-6">
                                    <h3>{tickerTitle}</h3>
                                    <button class="btn btn-outline-secondary" onClick={addStock}>Add to favorites</button>
                                    <ul>
                                        <li>Close Price: {stockData.c}</li>
                                        <li>Highest Price: {stockData.h}</li>
                                        <li>Lowest Price: {stockData.l}</li>
                                        <li>Transactions: {stockData.t}</li>
                                        <li>Open Price: {stockData.o}</li>
                                        <li>Trading Volume: {stockData.v}</li>
                                        <li>Trading Volume Weighted: {stockData.vw}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row align-items-md-stretch">
                        <div class="col-md-6">
                            <div class="h-100 p-5 bg-light border rounded-3">
                                <h2>Recent Searches</h2>
                                <p>{renderSearches()}</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="h-100 p-5 text-bg-dark rounded-3">
                                <h2>Favorite Stocks</h2>
                                <p>{renderStocks()}</p>
                            </div>
                        </div>
                    </div>

                    <footer class="pt-3 mt-4 text-muted border-top">
                        &copy; 2022
                    </footer>
                </div>
            </main>
        </div>
    )
}

export default SearchForm;