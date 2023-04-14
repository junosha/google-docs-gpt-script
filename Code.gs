const MODEL_TYPE = "gpt-3.5-turbo";
const OPENAI_API_KEY = PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY');

function onOpen() {
  DocumentApp.getUi().createMenu("AI Tools")
      .addItem("Create title/subtitle suggestions", "generateTitles")
      .addItem("Create 4 panel comic story", "fourPanelStory")
      .addItem("Use highlighted text as prompt", "textAsPrompt")
      .addToUi();
}

function generateTitles() {
  const doc = DocumentApp.getActiveDocument();
  const userText = doc.getSelection().getRangeElements()[0].getElement().asText().getText();
  const prompt = `Create a bunch of titles and subtitles for the following topic: "${userText}"`;
  callOpenAiAPI(prompt, doc);
}

function fourPanelStory() {
  const doc = DocumentApp.getActiveDocument();
  const userText = doc.getSelection().getRangeElements()[0].getElement().asText().getText();
  const prompt = `Use this idea to create a comic strip consisting of four images but answer only with brief image captions for the four images: ${userText} \n`;
  callOpenAiAPI(prompt, doc);
}

function textAsPrompt() {
  const doc = DocumentApp.getActiveDocument();
  const userText = doc.getSelection().getRangeElements()[0].getElement().asText().getText();
  const prompt = `${userText}`;
  callOpenAiAPI(prompt, doc);
}

function callOpenAiAPI(prompt, doc) {
  const body = doc.getBody();
  const temperature = 0.83;
  const maxTokens = 2060;
  const requestBody = {
    model: MODEL_TYPE,
    messages: [{role: "user", content: prompt}],
    temperature,
    max_tokens: maxTokens,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + OPENAI_API_KEY,
    },
    payload: JSON.stringify(requestBody),
  };

  const response = UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", options);
  const responseText = response.getContentText();
  const json = JSON.parse(responseText);
  const generatedText = json['choices'][0]['message']['content'];

  Logger.log(generatedText);
  body.appendParagraph(generatedText.toString());
}


