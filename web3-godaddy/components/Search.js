const Search = () => {
    return (
        <div className="bg-[url('/website.svg')] bg-contain bg-[#c4c4c4e2] bg-no-repeat min-h-[50vh] bg-right">
            <p className="max-w-2xl text-xl font-semibold ml-10 pt-9 mb-2">
                Seek and buy available domain names
            </p>
            <h2 className="text-5xl font-bold ml-10 mb-9 max-w-lg">
                It all begins with a domain name.
            </h2>
            <div className="flex">
                <input
                    type="text"
                    className="ml-10 min-w-[30%] h-12 p-3 border-none"
                    placeholder="Find your domain"
                />
                <button
                    type="button"
                    className="text-xl w-32 bg-black text-white border-none hover:bg-zinc-500"
                >
                    Buy It
                </button>
            </div>
        </div>
    );
};

export default Search;
