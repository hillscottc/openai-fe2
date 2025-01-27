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
  TextareaAutosize,
  FormHelperText,
} from "@mui/material";
import { DNA as DNASpinner } from "react-loader-spinner";

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

const chatTypes = [
  "rap battle",
  "love song",
  "interview",
  "debate",
  "argument",
  "comedy skit",
];

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

const ChatBot: React.FunctionComponent = () => {
  const [formData, setFormData] = useState({
    person1: "",
    person2: "",
    chatType: "",
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
      elevation={8}
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "5px",
        margin: "10px",
        backgroundColor: "#f0f0f0",
        height: "100%",
        // height: "100vh",
      }}
    >
      <Typography variant="h1" margin="10px" border="10px">
        ConvoComposer
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ minWidth: 120, marginBottom: "25px" }}>
          <Box sx={{ display: "flex", justifyContent: "center", p: 1, m: 1 }}>
            <Typography variant="h4" gutterBottom>
              Use AI to create an interaction between any two people
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "50px",
            }}
          >
            <FormControl error={formError && !formData.chatType}>
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
                    label={<Typography variant="h5">{value}</Typography>}
                    labelPlacement="bottom"
                  />
                ))}
              </RadioGroup>
              <FormHelperText>
                {!formData.chatType && "Please select an option."}
              </FormHelperText>
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
          <Typography variant="h4" gutterBottom>
            Choose two people
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            justifyContent: "center",
            marginBottom: "5px",
          }}
        >
          <Typography variant="body1" gutterBottom sx={{ textAlign: "center" }}>
            Enter two people or things that can interact.
          </Typography>
          <Typography variant="body2" gutterBottom>
            For example:&nbsp;
            {sampleItems.map((item) => `${item}, `)} etc. Go crazy.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            size="small"
            onChange={(e) =>
              setFormData({ ...formData, person1: e.target.value })
            }
            value={formData.person1}
            label={"Person 1"}
            variant="filled"
            error={formError && !formData.person1}
            sx={{ paddingRight: "10px" }}
          />
          <TextField
            size="small"
            onChange={(e) =>
              setFormData({ ...formData, person2: e.target.value })
            }
            value={formData.person2}
            label={"Person 2"}
            variant="filled"
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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <DNASpinner
            visible={isLoading}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </Box>
      )}

      <br />
      {chatResults && <TextareaAutosize value={chatResults} readOnly />}
    </Paper>
  );
};

export default ChatBot;
