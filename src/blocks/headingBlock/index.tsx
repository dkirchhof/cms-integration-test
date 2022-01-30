import { textEditorFactory } from "cms/dist/editor/editors/textEditor";
import { IBlockConfig } from "cms/dist/types/block";

interface IData {
    text: string;
}

export const HeadingBlock: IBlockConfig<IData> = {
    name: "Heading",
    toString: data => data.text,
    
    propConfigs: {
        text: {
            editor: textEditorFactory(),
            defaultValue: "Heading",
        }
    },

    Component: props => (
        <h1>{props.data.text}</h1>
    ),
};
