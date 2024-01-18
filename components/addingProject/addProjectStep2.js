import { Box, Button, Flex, Grid, em } from "@mantine/core";
import "../../public/styleForAddProjectStep2.css";
import { useMediaQuery } from '@mantine/hooks';
import Markdown from "react-markdown";
import { useState } from "react";
import {mainObject} from './addProject'
// import SyntaxHighlighter from 'react-syntax-highlighter';
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
const step2Object = {
  content:""
}
export function AddProjectStep2() {
  const [input, setInput] = useState(mainObject.content);
  const isMobile = useMediaQuery(`(max-width: ${em(900)})`);
  const onSave = ()=>{
    step2Object.content = input;
    mainObject.content = input;
  }
  return (
    <>
    <Grid>
      <Grid.Col span={isMobile ? 12:6}>
      <textarea
        autoFocus
        className="textarea"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      </Grid.Col>
      <Grid.Col span={isMobile ? 12:6}>

      {/* <Markdown className="markdown" components={{code:Component}}>{input}</Markdown> */}

      <Markdown
        className="markdown1"
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
      </Grid.Col>
    
   
    
    </Grid>
     <div className="button">
     <Button color="teal" onClick={()=>{onSave();}} type="submit">Save</Button>
     </div>
</>
    
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
