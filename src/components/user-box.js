import React, { useEffect } from "react";
import $, { data, error } from "jquery";
// import {Component} from "react";
import "./css/App.css";
import Item from "./user_window.js";
import SortField from "./sort_field";

let help_array = [];

function TodoItem() {
  let [data_array, setData_array] = React.useState([]);
  useEffect(() => {
    $.ajax(
      "https://api.github.com/repos/thomasdavis/backbonetutorials/contributors"
    )
      .then(function (data) {
        let promises = [];
        for (let i in data) {
          promises.push(
            new Promise((resolve, reject) => {
              $.ajax("https://api.github.com/users/" + data[i].login)
                .then(function (user_data) {
                  help_array.push({
                    login: data[i].login,
                    contributions: data[i].contributions,
                    avatar_url: data[i].avatar_url,
                    company: user_data.company,
                    location: user_data.location,
                    email: user_data.email,
                    id: i,
                  });
                  resolve();
                })
                .fail(function (error) {
                  reject(error);
                });
            })
          );
        }

        Promise.all(promises)
          .then(() => {
            setData_array((data_array = help_array));
            console.log(data_array);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .fail((error) => {
        console.log(error);
      });
  }, []);
  const onToggle = (id) => {
    setData_array(
      data_array.map((data) => {
        if (data.id === id) {
          data.click = !data.click;
        }
        return data;
      })
    );
  };

  const sort = (mode) => {
    console.log(mode);
    if (mode) {
      help_array.sort((a, b) =>
        a.login.toLowerCase() > b.login.toLowerCase() ? 1 : -1
      );
      setData_array((data_array = help_array));
    } else {
      help_array.sort((a, b) => (a.contributions < b.contributions ? 1 : -1));
      setData_array((data_array = help_array));
    }
  };

  return (
    <div className="per-box">
      <SortField sort={sort} />
      {data_array.length < 5 ? (
        <div class="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        data_array.map((data, index) => {
          return (
              <Item data={data} key={index + 1} onChange={onToggle} /> 
          );
        })
      )}
    </div>
  );
}

export default TodoItem;
