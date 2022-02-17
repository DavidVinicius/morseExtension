import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
          <h4 style={{ color: "black" }}>text to morse <br />or <br /> morse to text</h4>
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
              setTextInMorse(morse.translate(text));
              setShowMorse(true);
            }} variant="contained" > Translate </Button>
          </Box>
        </header>
      }
      {showMorse &&
        <Box>
          <h4 style={{
            color: "black"
          }}>Texto em morse</h4>

          <p style={{ color: "black", fontSize: textInMorse.length <= 20 ? "2em" : "1.5em" }}>{textInMorse.replaceAll(/\s\s/g, " | ")}</p>
          {morse.isMorseCode(textInMorse) && <Button onClick={() => morse.playMorse(textInMorse)} variant="contained" > Play morse </Button>}
          <Button onClick={() => setShowMorse(false)} variant="contained" > GO BACK </Button>
        </Box>
      }
    </div>
  );
};

export default Popup;
