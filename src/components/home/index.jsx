import React from 'react';
import { Link } from 'react-router-dom';
import styles from './home.module.css';
const Home = () => (
  <ul className={styles.musoCon}>
    <li>
      <Link to="/ssr">debug</Link>
    </li>
    <li>
      <Link to="/">home</Link>
    </li>
    <li>
      <Link to="/push">push</Link>
    </li>
  </ul>
);

export default Home;
