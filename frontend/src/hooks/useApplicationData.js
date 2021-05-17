import React, { useState } from 'react';

export default function userApplicationData() {

  // const [user, setUser] = useState(initUser);
  // const [message, setMessage] = useState('');
  // const [chatHistory, setChatHistory] = useState([]);
  // const [wsConn, setWsConn] = useState(null);

  const [state, useState] = useState({
    user: initUser,
    message: '',
    chatHistory: [],
    wsConn: null
  })
}