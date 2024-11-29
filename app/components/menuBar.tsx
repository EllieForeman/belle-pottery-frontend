import Link from 'next/link';

const MenuBar: React.FC = () => {
  return (
    <header className="bg-[var(--background)] p-4 mx-8">
      <nav className="flex justify-between items-center">
        <div>
          <Link href="/">
            <h1 className="text-3xl text-left">Belle Proffitt<br />Pottery</h1>
          </Link>
        </div>
        <div className="flex items-center space-x-8">
            <ul className="flex space-x-10 text-black font-bagnard">
            <li>
                <Link className="text-lg" href="/">Shop</Link>
            </li>
            <li>
                <Link className="text-lg" href="/about">Info</Link>
            </li>
            <li>
                <Link className="text-lg" href="/contact">Work</Link>
            </li>
            <li>
                <Link className="text-lg"  target="_blank" href="https://www.instagram.com/belle.pots/">Instagram</Link>
            </li>
            </ul>
            <div className="flex items-center justify-end w-[100px]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 text-gray-600">
                <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
            </div>
        </div>
      </nav>
    </header>
  );
};

export default MenuBar;
