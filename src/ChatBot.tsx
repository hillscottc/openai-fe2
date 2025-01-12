import { useState } from "react";
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
import { fetchChat } from "./utils/dataFunctions"


enum ChatType {
  Discussion = "discussion",
  RapBattle = "rap battle",
  LoveBallad = "love ballad",
  YoMaMa = "yo mamma joke battle",
}

function ChatBot() {
  const [formData, setFormData] = useState({
    person1: "tupac",
    person2: "trump",
    chatType: ChatType.Discussion,
  });

  const [chatResults, setChatResults] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(false);
  const [isDebug, setIsDebug] = useState(true);

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
    let chatResponse: string | null;

    if (isDebug) {
      chatResponse = "DEBUG:\n" + JSON.stringify(formData) + "\n" + content;
    } else {
      chatResponse = await fetchChat({ content });
    }

    setIsLoading(false);
    setChatResults(() => chatResponse || "No response");

  };

  const personHelperText = "A real or fictional person by name or description.";

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
                  defaultValue={ChatType.Discussion}
                  name="radio-buttons-group"
                  onChange={(e) => {
                    const selectedChatType = e.target.value as keyof typeof ChatType;
                    setFormData({ ...formData, chatType: ChatType[selectedChatType] })
                  }}
                >
                  {(Object.keys(ChatType) as Array<keyof typeof ChatType>).map((key) => (
                    <FormControlLabel value={key} control={<Radio />} label={ChatType[key]} />
                  ))}
                </RadioGroup>

              </FormControl>
            </Box>

            <br />
            between <br />

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
