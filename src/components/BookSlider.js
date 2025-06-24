import React, { useState  } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/bookslider.css";
import { useNavigate } from "react-router-dom";

const books = [
  {
    id: 1,
    title: "Harry Potter",
    origin: "UK",
    years: "1997–2007",
    desc: "A young wizard’s journey through Hogwarts, filled with magic, danger, and destiny.",
    image: "/image/harry_potter.png",
  },
  {
    id: 2,
    title: "It Ends With Us",
    origin: "USA",
    years: "2016",
    desc: "A powerful story of love, pain, and resilience by Colleen Hoover.",
    image: "/image/it_ends_with_us.png",
  },
  {
    id: 3,
    title: "The Alchemist",
    origin: "Brazil",
    years: "1988",
    desc: "A shepherd’s mystical journey in search of treasure and meaning.",
    image: "/image/the_alchemist.png",
  },{
  id: 4,
  title: "Stranger Things",
  origin: "USA",
  years: "2016–Present",
  desc: "A thrilling sci-fi series where a group of kids uncover secret experiments, supernatural forces, and the Upside Down.",
  image: "/image/stranger_thing.png",
}

];

export default function BookSlider() {
  const [index, setIndex] = useState(0);

  const handleClick = (target) => setIndex(target);

  const getIndex = (offset) => (index + offset + books.length) % books.length;

  const navigate = useNavigate();

const handleDiscover = () => {
  navigate("/login"); // change path as needed
};

  return (
    <div className="bookslider-container">
      <div className="bookslider-content">
        {/* Background Title */}
        <div className="bookslider-bg-text">
          <motion.h2
            animate={{ opacity: 0.15 }}
            transition={{ duration: 0.4 }}
          >
            {books[index].title}
          </motion.h2>
        </div>

        {/* Book Covers */}
        <div className="bookslider-covers">
          <motion.img
            key={books[getIndex(-1)].id}
            className="side-cover left"
            src={books[getIndex(-1)].image}
            alt="left"
            onClick={() => handleClick(getIndex(-1))}
            whileHover={{ scale: 1.05 }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={books[index].id}
              className="center-cover"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.5 }}
            >
              <img src={books[index].image} alt={books[index].title} />
              <p className="center-subtitle">
                {books[index].origin} • {books[index].years}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.img
            key={books[getIndex(1)].id}
            className="side-cover right"
            src={books[getIndex(1)].image}
            alt="right"
            onClick={() => handleClick(getIndex(1))}
            whileHover={{ scale: 1.05 }}
          />
        </div>

        {/* Description */}
        <div className="bookslider-text">
          <motion.p
            key={books[index].desc}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {books[index].desc}
          </motion.p>
          <button className="discover-btn" onClick={handleDiscover} >Discover More</button>
        </div>

        {/* Dots */}
        <div className="bookslider-dots">
          {books.map((_, i) => (
            <div
              key={i}
              className={`dot ${i === index ? "active" : ""}`}
              onClick={() => handleClick(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
