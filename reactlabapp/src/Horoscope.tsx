import React, {useState} from 'react';
import { isPropertyAccessChain } from 'typescript';
import './App.css';

// @ts-ignore
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

import axios from 'axios';

  function Horoscope() {
    const [sunv, setSun] = useState("");
    const [moonv, setMoon] = useState("");
    const [risingv, setRising] = useState("");

    //TODO: Fill in the ? with appropriate names/values for a horoscope.
    //HINT: Look at the HoroscopeHandler's response in Main.java to choose a default useState value.

    const [horoscope, setHoroscope] = useState([]);

    const requestHoroscope = () => {
      const toSend = {
          //TODO: Pass in the values for the data. Follow the format the route expects!
          sun : sunv,
          moon : moonv,
          rising : risingv
      };

      let config = {
          headers: {
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin': '*',
          }
      }

      //Install and import axios!
      //TODO: Fill in 1) location for request 2) your data 3) configuration
        axios.post('http://localhost:4567/horoscope', toSend, config)
        .then(response => {
            console.log(response.data);
            //TODO: Go to the Main.java in the server from the stencil, and find what field name you should put here.
            //Note: It is very important that you understand how this is set up and why it works!
            setHoroscope(response.data['horoscope']);
        })
        .catch(error => {
            console.log(error);
        });
        
        // return (
        //   <ul>
        //       {
        //         horoscope.map(item => {
        //           return <li>{item}</li>
        //         })
        //       }
        //       <li>ayo wtf</li>
        //   </ul>
        // )
      }

      function Button() {
        return <AwesomeButton type="primary" onPress={() => {requestHoroscope(); Display();}}>Submit</AwesomeButton>;
      }

      function Display() {
        return (
          <ul>
              {
                horoscope.map(item => {
                  return <li>{item}</li>
                })
              }
          </ul>
        )
      }
    return (
        <div>
          Horoscope Inputs
          <TextBox label={"Sun Sign"} change={setSun}/>
          <TextBox label={"Moon Sign"} change={setMoon} />
          <TextBox label={"Rising Sign"} change={setRising} />
          <Button></Button>
          <Display></Display>
        </div>
    );
  }

 

  interface TextProps {
      label: string;
      change: React.Dispatch<React.SetStateAction<string>>
  }

  function TextBox(props: TextProps) {
      return (
        <div>
          <label> {props.label +': '} </label>
          <input type={'text'} onChange={(e: React.FormEvent<HTMLInputElement>) : void => props.change(e.currentTarget.value)}/>
        </div>
      );
  }

  export default Horoscope;