import React from "react";
import { useState } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  //onsubmit handler
  const onSubmit = (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    //fetch the response
    if (!name) {
      setError("Empty name field!");
      return;
    }
    const requestbody = JSON.stringify({
      name,
      photoUrls: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.goodhousekeeping.com%2Flife%2Fpets%2Fg4531%2Fcutest-dog-breeds%2F&psig=AOvVaw18Umvv_EppxNyQctUGY9mq&ust=1639145752319000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMi33PXz1vQCFQAAAAAdAAAAABAD",
      ],
    });

    fetch("https://petstore.swagger.io/v2/pet/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: requestbody,
    })
      .then((res) => {
        if (res.status === 201) {
          fetch(`https://petstore.swagger.io/v2/pet/${id}`)
            .then((response) => {
              if (response.status === 200) {
                setMessage("Pet added successfully after the second api call");
              }
            })
            .catch((err) => {
              setError("Error in calling Api!");
              console.log(err);
            });
        }
        if (res.status === 200) {
          setError("No need to call second api.");
        } else {
          setError("Error in fetching api!");
        }
      })
      .catch((err) => {
        setError("Error in fetching Api!");
        console.log(err);
      });
  };

  //set the name as a state
  const nameChange = (e) => {
    setName(e.target.value);
  };
  //set the id as a state
  const idChange = (e) => {
    setId(e.target.value);
  };
  return (
    <form onSubmit={onSubmit}>
      <h2>Login</h2>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name} onChange={nameChange} />
      </div>
      <div>
        <label htmlFor="identity">ID</label>
        <input type="text" value={id} onChange={idChange} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </div>

      <input type="submit" value="Submit" id="submit-button" />
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default Form;
