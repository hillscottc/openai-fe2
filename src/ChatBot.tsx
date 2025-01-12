import { useState } from "react";
import OpenAI from 'openai';
import {
  Button,
  Paper,
  Typography,
  FormControl,
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio
} from "@mui/material";
import { DNA } from "react-loader-spinner";
import ChatIcon from "@mui/icons-material/Chat";
import Fader from "./utils/Fader";

const OPENAI_APIKEY = import.meta.env.VITE_OPENAI_APIKEY

/* https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety */
async function fetchChat({ content = 'Tell me a joke' }: { content: string }): Promise<string | null> {
  const client = new OpenAI({ apiKey: OPENAI_APIKEY, dangerouslyAllowBrowser: true })
  const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content },
    ],
    temperature: 0.8,
    max_tokens: 1024,
  });
  return response.choices[0]?.message?.content
}

const chatTypes = [
  "discussion",
  "rap battle",
  "love ballad",
  "yo mamma joke battle",
];

const personHelperText = "A real or fictional person by name or description.";

function ChatBot() {
  const [formData, setFormData] = useState({
    person1: "tupac",
    person2: "trump",
    chatType: "discussion",
  });
  const [chatResults, setChatResults] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(false);
  const [isDebug, setIsDebug] = useState(true);

  /**
   * Handle form submission and fetch chat results.
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { chatType, person1, person2 } = formData;
    if (!chatType || !person1 || !person2) {
      setFormError(true)
      return
    }
    setFormError(false)
    setIsLoading(true);

    const content = `Write ${chatType} between ${person1} and ${person2}`
    const chatResponse = isDebug ? `DEBUG:\n ${JSON.stringify(formData)} \n ${content} ` : await fetchChat({ content });

    setIsLoading(false);
    setChatResults(() => chatResponse || "No response");
  };

  return (
    <Paper
      style={{
        display: "grid",
        gridRowGap: "20px",
        padding: "20px",
        margin: "5px 10px",
      }}
    >
      <Typography variant="h2" gutterBottom>
        <ChatIcon fontSize={"inherit"} /> Chat Bot
      </Typography>

      <form onSubmit={handleSubmit}>
        <div>
          <Typography variant="subtitle1" gutterBottom>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <FormLabel id="demo-radio-buttons-group-label">Chat Type</FormLabel>
                <RadioGroup
                  row
                  defaultValue={'discussion'}
                  name="radio-buttons-group"
                  onChange={(e) => setFormData({ ...formData, chatType: e.target.value })}
                >
                  {chatTypes.map((value) => (<FormControlLabel value={value} control={<Radio />} label={value} />))}
                </RadioGroup>

              </FormControl>
            </Box>

            <br />between <br />

            <TextField
              helperText={personHelperText}
              size="small"
              onChange={(e) =>
                setFormData({ ...formData, person1: e.target.value })
              }
              value={formData.person1}
              fullWidth
              label={"Person"}
              variant="outlined"
              error={formError && !formData.person1}
            />

            &nbsp;and&nbsp;

            <TextField
              helperText={personHelperText}
              size="small"
              onChange={(e) =>
                setFormData({ ...formData, person2: e.target.value })
              }
              value={formData.person2}
              fullWidth
              label={"Person"}
              variant="outlined"
              error={formError && !formData.person2}
            />
          </Typography>
        </div>
        <br />

        <FormControlLabel
          control={<Checkbox
            checked={isDebug}
            onChange={() => setIsDebug(!isDebug)}
          />} label="Debug" />

        <Button variant="contained" type="submit">
          GO !
        </Button>
      </form>

      {isLoading && (
        <div className="container-grid">
          <div className="col col-1">
            {/* Loading spinner */}
            <DNA
              visible={isLoading}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
          <div className="col col-2">
            <Fader text="Working"></Fader>
            {/*<Fader text={getJargon()}></Fader>*/}
          </div>
        </div>
      )}

      <br />
      {chatResults && (
        <textarea value={chatResults} rows={30} cols={75} readOnly />
      )}
    </Paper>
  );
}

export default ChatBot;
