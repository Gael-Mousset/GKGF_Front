const Navbar = () => {
  return (
    <>
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3 dark:bg-neutral-800">
        <nav className="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between">
          <a
            className="sm:order-1 flex-none text-xl font-semibold dark:text-white focus:outline-hidden focus:opacity-80"
            href="/"
          >
            Game Keep or Game Flip
          </a>
          <div className="sm:order-3 flex items-center gap-x-2">
            {/* Profile picture */}
            <img
              src="https://avatars.githubusercontent.com/u/101868461?v=4"
              alt="Profile picture"
              className="h-10 w-10 rounded-full"
            />
          </div>
          <div
            id="hs-navbar-alignment"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2"
            aria-labelledby="hs-navbar-alignment-collapse"
          >
            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
              <a
                className="font-medium text-gray-600 hover:text-gray-400 focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                href="/games"
                aria-current="page"
              >
                Games
              </a>
              <a
                className="font-medium text-gray-600 hover:text-gray-400 focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                href="/consoles"
              >
                Consoles
              </a>
              <a
                className="font-medium text-gray-600 hover:text-gray-400 focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                href="/accessories"
              >
                accessories
              </a>
              <a
                className="font-medium text-gray-600 hover:text-gray-400 focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                href="/sell"
              >
                Sell
              </a>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
