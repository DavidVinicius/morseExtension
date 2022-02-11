import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import morse from '../../morse';
import './Popup.css';

const Popup = () => {
  const [text, setText] = useState('')
  const [textInMorse, setTextInMorse] = useState('')
  const [showMorse, setShowMorse] = useState(false)

  return (
    <div className="App">
      {!showMorse &&
        <header className="App-header">
          <h4 style={{ color: "black" }}>Converter texto para morse</h4>
          <Box sx={{
            display: 'grid',
            gridAutoColumns: '1fr',
            gap: 1,
          }}
          >
            <TextField id="outlined-basic" label="texto" variant="outlined"
              onChange={(e) => setText(e.target.value)}
            />
            <Button onClick={() => {
              setTextInMorse(morse.encode(text));
              setShowMorse(true);
            }} variant="contained" > Converter </Button>
          </Box>
        </header>
      }
      {showMorse &&
        <Box>
          <h4 style={{
            color: "black"
          }}>Texto em morse</h4>

          <p style={{ color: "black", fontSize: textInMorse.length <= 20 ? "1.8em" : "1.5em" }}>{textInMorse.replace(/\s/g, "&nbsp;")}</p>
          <Button onClick={() => setShowMorse(false)} variant="contained" > Tocar morse </Button>
          <Button onClick={() => setShowMorse(false)} variant="contained" > Voltar </Button>
        </Box>
      }
    </div>
  );
};

export default Popup;
