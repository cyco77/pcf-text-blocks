import { MessageBar, MessageBarType, Stack, TextField } from "@fluentui/react";
import * as React from "react";
import { useEffect, useState } from "react";
import { IInputs } from "../../generated/ManifestTypes";
import { IHookResult } from "../../types/hookResult";
import { ITextBlock } from "../../types/textBlock";
import { useGetTextBlocksHook } from "../../hooks/getTextBlocksHook";
import TextBlockComponent from "../textBlock/textBlockComponent";
import { containerStackTokens } from "../common/common";

export interface IMainProps {
  xrmContext: ComponentFramework.Context<IInputs>;
}

interface IMainState {
  textBlocks: ITextBlock[] | undefined;
  messageText?: string;
  messageType: MessageBarType;
  filter: string | undefined;
}

const Main: React.FC<IMainProps> = (props: IMainProps) => {
  const [state, setState] = useState<IMainState>({ textBlocks: [], messageType: MessageBarType.success, filter: "" });

  const newsResult: IHookResult<ITextBlock[] | undefined> = useGetTextBlocksHook(props.xrmContext);
  const loadedData: ITextBlock[] | undefined = newsResult.result;
  const loading: boolean = newsResult.loading;

  useEffect(() => {
    setState({ ...state, textBlocks: loadedData });
  }, [loadedData]);

  const showMessage = (text: string) => {
    setState({ ...state, messageText: text });
  };

  if (state.textBlocks === undefined) {
    return <>Data not loaded</>; // TODO: das muss noch schöner
  }

  const items =
    state.filter !== undefined && state.filter !== ""
      ? state.textBlocks.filter(
          (x) =>
            x.name.toLocaleLowerCase().indexOf(state.filter as string) > -1 ||
            x.value.toLocaleLowerCase().indexOf(state.filter as string) > -1
        )
      : state.textBlocks;

  return (
    <div className='main'>
      <Stack tokens={containerStackTokens}>
        <TextField
          placeholder='Filter...'
          value={state.filter}
          onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
            setState({ ...state, filter: newValue });
          }}
        ></TextField>
      </Stack>

      {items.map((value: ITextBlock, index: number, array: ITextBlock[]) => {
        return (
          <div key={index}>
            <TextBlockComponent textBlock={value}></TextBlockComponent>
          </div>
        );
      })}
    </div>
  );
};

export default Main;
