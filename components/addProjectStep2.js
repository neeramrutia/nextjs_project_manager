import { Box, Button, Flex, Grid } from "@mantine/core";
import "../public/styleForAddProjectStep2.css";
import Markdown from "react-markdown";
import { useState } from "react";
// import SyntaxHighlighter from 'react-syntax-highlighter';
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import prism from "react-syntax-highlighter/dist/esm/styles/prism/prism";
const step2Object = {
  content:""
}
export function AddProjectStep2() {
  const [input, setInput] = useState("");
  const onSave = ()=>{
    step2Object.content = input;
  }
  return (
    <div>
    <div className="App">
      <textarea
        autoFocus
        className="textarea"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />

      {/* <Markdown className="markdown" components={{code:Component}}>{input}</Markdown> */}

      <Markdown
        className="markdown"
        children={input}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                showLineNumbers
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={materialDark}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      />
      
    </div>
    <div className="button">
    <Button color="teal" onClick={()=>{onSave(); console.log(step2Object.content)}} type="submit">Save</Button>
    </div>
    </div>
    
  );
}
export { step2Object }
// const Component = ({children , language}) => {
//   var codeString = '(num) => num + 1';
//   console.log(children ?? "");
//   console.log(language ?? "");
//   return (

//     <SyntaxHighlighter language={language} style={materialDark}>
//       {children}
//     </SyntaxHighlighter>
//   );
// };
