# Google Docs GPT Script
A basic script to use GPT-3.5 / GPT-4 inside Google Docs 

## Setup
1. In your browser, type `docs.new` to open a new Google Doc, name the document "AI Doc".
2. Click Extensions > Apps Script
3. On the top left, name your script as ‘AI Assistant’ in top window (Do not rename Code.gs!)
4. On the left side, click the gear ⚙️ icon, scroll down to Script Properties and add your OPENAI_API_KEY as a script property.
5. In the App Script Editor ("<>" symbol in the menu on the left), copy the content of this repo's `Code.gs` into the existing `Code.gs`
6. Save the script (💾 in the top menu bar)
7. Next to the 💾 symbol you will find a drop-down menu, choose `onOpen`, then click Run.
8. You'll be asked to review permissions. Click "Go to AI Assistant" on the bottom left.
9. Go back to your Google Doc ("AI Doc") and refresh. After re-loading, the "AI Tools" menu appears in you menu bar.

## Adding menu items
Add menu items here:
```javascript
function onOpen() {
  DocumentApp.getUi().createMenu("AI Tools")
      .addItem("Create title/subtitle suggestions", "generateTitles")
      .addItem("Create 4 panel comic story", "fourPanelStory")
      .addItem("Use highlighted text as prompt", "textAsPrompt")
      .addToUi();
}
```
and create a corresponding function like
```javascript
function myNewItem() {
  const doc = DocumentApp.getActiveDocument();
  const userText = doc.getSelection().getRangeElements()[0].getElement().asText().getText();
  const prompt = `Do cool stuff with ${userText}`;
  callOpenAiAPI(prompt, doc);
}
``` 

## Changing max tokens & temperature
Change the settings for your OpenAI API call here:
```
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
```

