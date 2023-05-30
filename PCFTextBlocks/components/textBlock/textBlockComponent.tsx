import { Icon, PrimaryButton, Stack, TextField } from "@fluentui/react";
import * as React from "react";
import copy from "copy-to-clipboard";
import { ITextBlock } from "../../types/textBlock";
import { containerStackTokens } from "../common/common";

export interface ITextBlockComponentProps {
  textBlock: ITextBlock;
}

const TextBlockComponent: React.FC<ITextBlockComponentProps> = (props: ITextBlockComponentProps) => {
  const copyToClipboard = async () => {
    copy(props.textBlock.value, { format: "text/html" });
  };

  return (
    <div className='textBlockComponent'>
      <Stack tokens={containerStackTokens}>
        <TextField label='Baustein' value={props.textBlock.name} />
      </Stack>
      <Stack tokens={containerStackTokens}>
        <div className='textBlockContent'>
          <div dangerouslySetInnerHTML={{ __html: props.textBlock.value }}></div>
          {/* <TextField multiline autoAdjustHeight readOnly value={props.textBlock.value}></TextField> */}
          {/* <pre className='preWrap'>{props.textBlock.value}</pre> */}
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
