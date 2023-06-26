import { Icon, PrimaryButton, Stack, TextField } from "@fluentui/react";
import * as React from "react";
import copy from "copy-to-clipboard";
import { useRef } from "react";
import { ITextBlock } from "../../types/textBlock";
import { containerStackTokens } from "../common/common";

export interface ITextBlockComponentProps {
  textBlock: ITextBlock;
}

const TextBlockComponent: React.FC<ITextBlockComponentProps> = (props: ITextBlockComponentProps) => {
  const copyToClipboard = async () => {
    copy(props.textBlock.value, { format: "text/html" });
  };

  const iframeElement = useRef<HTMLIFrameElement>(null);

  const updateHeight = () => {
    if (iframeElement.current !== undefined && iframeElement.current !== null) {
      let height = iframeElement.current.contentWindow?.document.body.scrollHeight;
      let heightValue = height !== undefined ? (height + 20).toString() + "px" : "40px";

      console.log(height);
      iframeElement.current.style.height = heightValue;
    }
  };

  return (
    <div className='textBlockComponent'>
      <Stack tokens={containerStackTokens}>
        <TextField label='Baustein' value={props.textBlock.name} />
      </Stack>
      <Stack tokens={containerStackTokens}>
        <div className='textBlockContent'>
          <iframe srcDoc={props.textBlock.value} ref={iframeElement} onLoad={() => updateHeight()} />
        </div>
        <div className='copyButton'>
          <PrimaryButton onClick={() => copyToClipboard()}>
            <Icon iconName='copy'></Icon>
          </PrimaryButton>
        </div>
      </Stack>
    </div>
  );
};

export default TextBlockComponent;
