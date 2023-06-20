import { MessageBarType, Stack, TextField } from "@fluentui/react";
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
  filter: string | undefined;
}

const Main: React.FC<IMainProps> = (props: IMainProps) => {
  const [state, setState] = useState<IMainState>({ textBlocks: [], filter: "" });

  const newsResult: IHookResult<ITextBlock[] | undefined> = useGetTextBlocksHook(props.xrmContext);
  const loadedData: ITextBlock[] | undefined = newsResult.result;

  useEffect(() => {
    setState((oldState) => ({ ...oldState, textBlocks: loadedData }));
  }, [loadedData]);

  const items =
    state.filter !== undefined && state.filter !== ""
      ? state.textBlocks?.filter(
          (x) =>
            x.name.toLocaleLowerCase().indexOf(state.filter?.toLocaleLowerCase() as string) > -1 ||
            x.value.toLocaleLowerCase().indexOf(state.filter?.toLocaleLowerCase() as string) > -1
        )
      : state.textBlocks;

  console.log("state", state);
  console.table(items);

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

      {items?.map((value: ITextBlock) => {
        return (
          <div key={value.id}>
            <TextBlockComponent textBlock={value}></TextBlockComponent>
          </div>
        );
      })}
    </div>
  );
};

export default Main;
