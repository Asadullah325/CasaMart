import React from "react";

const Table = ({ data }) => {
  console.log(data);

  return (
    <div>
      <h1>Table</h1>
      {data.map((item) => {
        return (
          <div key={item._id}>
            <p>{item.name}</p>
            <p>{item.image}</p>
            {item.catagory.map((cat) => {
              return (
                <div key={cat._id}>
                  <p>{cat.name}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Table;
