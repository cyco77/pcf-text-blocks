
import { ITextBlock } from '../types/textBlock';
import textBlockJson from './mock/textBlocks.json';

export class MockTextBlockService {
    public static getTextBlocks(): ITextBlock[] {

        return textBlockJson.data;
    }
}