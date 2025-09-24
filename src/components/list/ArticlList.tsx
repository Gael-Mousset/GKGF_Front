import React from "react";

const data = [
  {
    id: 1,
    title: "Pokemon red",
    description: "Pokemon red is a video game series developed by Nintendo",
    image: "https://media.s-bol.com/x6EljX7O31xE/1200x1070.jpg",
    author: "Nintendo",
    category: "Games",
    rating: 4.5,
    price: 200,
    date: "2022-05-25",
  },
  {
    id: 2,
    title: "Mario Kart wii",
    description: "Mario Kart wii is a racing video game developed by Nintendo",
    image: "https://m.media-amazon.com/images/I/81nWR8OwryL.jpg",
    author: "Nintendo",
    category: "Games",
    rating: 4.5,
    price: 200,
    date: "2022-05-25",
  },
  {
    id: 3,
    title: "new Super Mario Bros",
    description:
      "new Super Mario Bros is a platform video game developed by Nintendo",
    image: "https://m.media-amazon.com/images/I/917+5vALQyL.jpg",
    author: "Nintendo",
    category: "Games",
    rating: 4.5,
    price: 200,
    date: "2022-05-25",
  },
];

const ArticlList = () => {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Articles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-5">
        {data.map((item) => (
          <div key={item.id} className="card">
            <img src={item.image} alt={item.title} />
            <div className="card-body">
              <h2 className="card-title">{item.title}</h2>
              <p className="card-text">{item.description}</p>
              <div className="card-footer">
                <p>
                  Author -{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    {item.author}
                  </a>
                </p>
                <p>
                  Category -{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    {item.category}
                  </a>
                </p>
                <p>
                  Rating -{" "}
                  <span className="text-yellow-500">{item.rating}</span>
                </p>
                <p>
                  Price - <span className="text-green-500">{item.price}</span>
                </p>
                <p>
                  Date - <span className="text-red-500">{item.date}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlList;
