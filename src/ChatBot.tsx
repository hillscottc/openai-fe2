import { useState } from "react";
import OpenAI from "openai";
import {
  Button,
  Paper,
  Typography,
  FormControl,
  TextField,
  Box,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { DNA } from "react-loader-spinner";
import ChatIcon from "@mui/icons-material/Chat";

const API_KEY = import.meta.env.VITE_OPENAI_APIKEY || "";

/* https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety */
async function fetchChat({
  content = "Tell me a joke",
  apiKey = "",
}: {
  content: string;
  apiKey: string;
}): Promise<string | null> {
  const client = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });
  const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content }],
    temperature: 0.8,
    max_tokens: 1024,
  });
  return response.choices[0]?.message?.content;
}

const chatTypes = ["discussion", "rap battle", "love ballad"];

const personHelperText = "A real or fictional person by name or description.";

const sampleItems = [
  "Trump",
  "Tupac",
  "Liz Taylor",
  "Ghandi",
  "a cat",
  "Dracula",
  "Obama",
  "Churchill",
  "a gangster",
  "Malcolm X",
  "Homer Simpson",
  "Eric Cartman",
  "Taylor Swift",
];

function ChatBot() {
  const [formData, setFormData] = useState({
    person1: "",
    person2: "",
    chatType: "discussion",
  });
  const [chatResults, setChatResults] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { chatType, person1, person2 } = formData;
    if (!chatType || !person1 || !person2) {
      setFormError(true);
      setChatResults("Please fill out all fields.");
      return;
    }
    setFormError(false);

    const content = `Write ${chatType} between ${person1} and ${person2}`;

    try {
      setIsLoading(true);
      setChatResults("Thinking...");
      const chatResponse = await fetchChat({ content, apiKey: API_KEY });
      setChatResults(() => chatResponse || "No response");
      setIsLoading(false);
    } catch (error) {
      setChatResults(`Error: ${error}`);
      setIsLoading(false);
    }
  };

  return (
    <Paper
      style={{
        display: "grid",
        gridRowGap: "20px",
        padding: "1px",
        margin: "1px",
        backgroundColor: "#f0f0f0",
        height: "100%",
      }}
    >
      <Typography variant="h2" margin="10px" border="10px">
        <ChatIcon fontSize={"inherit"} /> ConvoComposer
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ minWidth: 120, marginBottom: "25px" }}>
          <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
            <Typography variant="h4" gutterBottom>
              Use AI to create an interaction between any two people
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
            <Typography variant="h6" gutterBottom>
              Interaction Type
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "50px",
            }}
          >
            <FormControl>
              <RadioGroup
                row
                defaultValue={"discussion"}
                name="radio-buttons-group"
                onChange={(e) =>
                  setFormData({ ...formData, chatType: e.target.value })
                }
              >
                {chatTypes.map((value) => (
                  <FormControlLabel
                    value={value}
                    key={value}
                    control={<Radio />}
                    label={value}
                    labelPlacement="bottom"
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "3px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Choose two people or things to interact with each other
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Typography
            variant="caption"
            gutterBottom
            sx={{ textAlign: "center" }}
          >
            It can be anybody, or anything, as long as they can interact.
          </Typography>
          <Typography variant="caption" gutterBottom>
            For example:&nbsp;
            {sampleItems.map((item) => `${item}, `)} etc. Go crazy.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            helperText={personHelperText}
            size="small"
            onChange={(e) =>
              setFormData({ ...formData, person1: e.target.value })
            }
            value={formData.person1}
            label={"Person"}
            variant="outlined"
            error={formError && !formData.person1}
            sx={{ paddingRight: "10px" }}
          />
          <TextField
            helperText={personHelperText}
            size="small"
            onChange={(e) =>
              setFormData({ ...formData, person2: e.target.value })
            }
            value={formData.person2}
            label={"Person"}
            variant="outlined"
            error={formError && !formData.person2}
          />
        </Box>

        <br />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" type="submit" sx={{ width: "250px" }}>
            GO !
          </Button>
        </Box>
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
