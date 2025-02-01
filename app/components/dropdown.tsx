"use client";

import { useState } from "react";

interface ListItem {
  title: string;
  location?: string;
  dateFrom?: string;
  dateTo?: string;
}

interface ListDropdownProps {
  title: string;
  items: ListItem[];
}

interface ExhibitionItem {
  id: number;
  title: string;
  place: string;
  year: string;
}

interface CollectionItem {
  title: string;
  place?: string;
}

interface ExhibitionsDropdownProps {
  title: string;
  exhibitions?: ExhibitionItem[];
  collections?: CollectionItem[];
}

interface TextDropdownProps {
  title: string;
  text: string;
}

export function ListDropdown({ title, items }: ListDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <details
      className="group border-b border-black py-5 w-full"
      open={isOpen}
      onToggle={(e) => setIsOpen(e.currentTarget.open)}
    >
      <summary className="flex justify-between items-center cursor-pointer w-full">
        <span className="text-xl">{title}</span>
        <span className="text-lg font-bold">{isOpen ? "−" : "+"}</span>
      </summary>
      <div className="mt-4  text-sm pl-4">
        <ul className="list-disc mt-4 text-lg leading-spacey">
          {items.map((item, index) => (
            <li className="p-1" key={index}>
              {item.title}
              {item.location ? `, ${item.location}` : ""}
              {item.dateFrom}
              {item.dateTo ? ` - ${item.dateTo}` : ""}
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}

// Dropdown 2: Exhibitions & Collections
export function ExhibitionsDropdown({
  title,
  exhibitions,
  collections,
}: ExhibitionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const groupedExhibitions = exhibitions?.reduce(
    (acc, item) => {
      if (!acc[item.year]) {
        acc[item.year] = [];
      }
      acc[item.year].push(item);
      return acc;
    },
    {} as Record<string, typeof exhibitions>,
  );

  return (
    <details
      className="group border-b border-black py-5 w-full"
      open={isOpen}
      onToggle={(e) => setIsOpen(e.currentTarget.open)}
    >
      <summary className="flex justify-between items-center cursor-pointer w-full">
        <span className="text-xl">{title}</span>
        <span className="text-lg font-bold">{isOpen ? "−" : "+"}</span>
      </summary>
      <div className="mt-4  text-sm pl-4">
        <div>
          {groupedExhibitions &&
            Object.keys(groupedExhibitions)
              .sort()
              .reverse()
              .map((year) => (
                <div key={year}>
                  <h4 className="text-lg mt-6">{year}</h4>
                  <ul className="list-disc pl-4 text-lg leading-spacey">
                    {groupedExhibitions[year].map((item) => (
                      <li key={item.id}>
                        {item.title}, {item.place}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          <h4 className="text-lg mt-6 mb-3 underline underline-offset-4">
            Collections
          </h4>
          <ul className="text-lg leading-spacey">
            {collections?.map((item, index) => (
              <li key={index}>
                {item.title}, {item.place}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </details>
  );
}

// Dropdown 3: Commissions, Enquiries, and Stockists
export function TextDropdown({ title, text }: TextDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <details
      className="group border-b border-black py-5 w-full"
      open={isOpen}
      onToggle={(e) => setIsOpen(e.currentTarget.open)}
    >
      <summary className="flex justify-between items-center cursor-pointer w-full">
        <span className="text-xl">{title}</span>
        <span className="text-lg font-bold">{isOpen ? "−" : "+"}</span>
      </summary>
      <div>
        {isOpen && <p className="mt-4 text-lg leading-spacey">{text}</p>}
      </div>
    </details>
  );
}
