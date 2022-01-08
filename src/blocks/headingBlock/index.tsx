import { TextEditor } from "cms/dist/editor/editors/textEditor";
import { IBlockConfig } from "cms/dist/editor/types/block";

interface IData {
    text: string;
}

export const HeadingBlock: IBlockConfig<IData> = {
    name: "Heading",

    getInitialData: () => ({
        text: "Heading",
    }),

    getEditorInputs: () => ({
        text: TextEditor,
    }),

    getLabel: data => data.text,

    Component: props => (
        <h1>{props.data.text}</h1>
    ),
};
