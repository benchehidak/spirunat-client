import { useRouter } from "next/navigation" ;
import React, { useState } from "react";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        console.log("click");
        router.push(
            {
                pathname: "/product",
                query: { search: searchTerm },
            },
            undefined,
            { shallow: true }
        );
        setSearchTerm("");
    };

    const handleInput = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };
    return (
        <>
            <form>
                <input
                    value={searchTerm}
                    onKeyDown={handleInput}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="Search"
                />
            </form>
        </>
    );
};

export default Search;
