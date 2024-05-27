import axios from "axios";
import { useState, MouseEvent } from "react";

function Search() {

    const [searchKey, setSearchKey] = useState('');
    const [limit, setLimit] = useState(10);

    const [results, setResults] = useState<string[]>([]);

    async function search(evt: MouseEvent<HTMLButtonElement>) {

        evt.preventDefault();
        if (searchKey) {
            try {

                const url = `https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=${searchKey}&limit=${limit}`
                const response = await axios.get(url);
                setResults(response.data[1]);


            } catch (error) {
                alert("Error fetching data");
            }
        }


    }

    return (
        <div>
            <h4>Search</h4>

            <form>
                <div className="form-group" style={{ width: '400px' }}>
                    <label>Search</label>
                    <input type="text" className="form-control" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
                </div>
                <div className="form-group" style={{ width: '100px' }}>
                    <label>Limit</label>
                    <select className="form-control" value={limit} onChange={e => setLimit(Number(e.target.value))}>
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                        <option>40</option>
                    </select>
                </div>

                <br />
                <button className="btn btn-primary" onClick={search}>Search</button>
            </form>

            <div>
                <h6>Results</h6>
                {results.map((item, index) => {

                    return (
                        <p key={index}>{item}</p>
                    )
                })}
            </div>
        </div>
    )
}

export default Search;