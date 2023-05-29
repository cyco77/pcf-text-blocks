import { MutableRefObject, useRef, useState } from "react";
import * as React from 'react';
import { IHookResult } from "../types/hookResult";
import { IInputs } from "../generated/ManifestTypes";

import { ITextBlock } from "../types/textBlock";
import { TextBlockService } from "../services/textBlockService";

export function useGetTextBlocksHook(xrmContext: ComponentFramework.Context<IInputs>): IHookResult<ITextBlock[] | undefined> {

    const [result, setResult] = useState<ITextBlock[] | undefined>();
    const loading: MutableRefObject<boolean> = useRef(true);
    const errorMessage: MutableRefObject<string> = useRef("");

    React.useEffect((): void => {

        const fetchData: () => Promise<void> = async () => {
            try {
                loading.current = true;

                const service = new TextBlockService(xrmContext);

                const textBlocks = await service.getTextBlocks();

                setResult(textBlocks);

                loading.current = false;

            } catch (error) {
                loading.current = true;
            }
        };

        fetchData();
    }, []);

    return { result, loading: loading.current, errorMessage: errorMessage.current };
}
