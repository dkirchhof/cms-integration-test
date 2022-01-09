import { MultiLineEditor } from "cms/dist/editor/editors/multiLineEditor";
import { IBlockConfig } from "cms/dist/types/block";
import { P } from "./styles";

interface IData {
    text: string;
}

export const TextBlock: IBlockConfig<any, IData> = {
    name: "Paragraph",

    getInitialData: () => ({
        text: "Lorem ipsum",
    }),

    getEditorInputs: () => ({
        text: MultiLineEditor,
    }),

    getLabel: data => data.text,

    Component: props => (
        <P>{props.data.text}</P>
    ),
};
