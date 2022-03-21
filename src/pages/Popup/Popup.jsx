import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import morse from '../../morse';
import './Popup.css';

const Popup = () => {
  const [text, setText] = useState('')
  const [textInMorse, setTextInMorse] = useState('')
  const [showMorse, setShowMorse] = useState(false)

  useEffect(() => {
    selectedText()
      .then((textSelected) => {
        console.log(textSelected);
        if (textSelected != "" && textSelected != false) {
          setText(textSelected);
        }
      })
  }, [setText]);

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
            <TextField id="textInput" value={text} label="text" variant="outlined"
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
          }}>Text in morse</h4>

          <p style={{ color: "black", fontSize: textInMorse.length <= 20 ? "2em" : "1.5em" }}>{textInMorse.replaceAll(/\s\s/g, " | ")}</p>
          {
            morse.isMorseCode(textInMorse)
            &&
            <>
              <Box m={1}>
                <Button onClick={() => morse.playMorse(textInMorse)}
                  variant="contained"
                > Play morse </Button>
              </Box>
              <br />
            </>
          }

          <Button onClick={() => setShowMorse(false)} variant="contained" > GO BACK </Button>
        </Box>
      }
    </div>
  );
};

async function selectedText() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let result;

  try {
    [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => getSelection().toString(),
    });

    return result
  } catch (e) {
    return false; // ignoring an unsupported page like chrome://extensions
  }
}

export default Popup;
