import React from "react";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import { FaAngleDoubleRight } from "react-icons/fa";

const url = "https://course-api.com/react-tabs-project";
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);

  // console.log(data);
  const fetchData = async () => {
    const response = await fetch(url);
    const finalResponse = await response.json();
    // console.log(finalResponse);
    setData(finalResponse);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []); //runs only on initial render

  if (isLoading) {
    return <Loading />;
  }
  const { company, dates, duties, title } = data[value]; //first item in data array//destructing
  return (
    <section className="section">
      <div className="title">
        <h2>experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          {data.map((item, index) => {
            return (
              <button
                key={item.id}
                onClick={() => setValue(index)} // set value = index
                className={`job-btn ${index === value && "active-btn"}`} // if index of current btn === index of current element in data arrary then add the following class to btn .
              >
                {item.company}
              </button>
            );
          })}
        </div>
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((item, i) => {
            return (
              <div className="job-desc" key={i}>
                <FaAngleDoubleRight />
                <p>{item}</p>
              </div>
            );
          })}
        </article>
      </div>
      <button type="button" className="btn">
        read more
      </button>
    </section>
  );
};

export default App;
