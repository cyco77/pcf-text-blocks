import { IInputs } from "../generated/ManifestTypes";
import { ITextBlock } from "../types/textBlock";
import { MockTextBlockService } from "./mockTextBlockService";

export class TextBlockService {
    context: ComponentFramework.Context<IInputs>;

    constructor(context: ComponentFramework.Context<IInputs>) {
        this.context = context;
    }

    public async getTextBlocks() {

        // (<any>this.context.webAPI).execute();
        try {
            const response = await this.context.webAPI.retrieveMultipleRecords("lh_textblock", "?$select=lh_name,lh_value&$filter=statecode eq 0");

            const results: ITextBlock[] = [];

            response.entities.forEach(element => {
                results.push({ id: element.lh_textblockid, name: element.lh_name, value: element.lh_value });
            });

            return results;

        } catch (error) {
            console.log(error);
            return MockTextBlockService.getTextBlocks();
        }

    }
}