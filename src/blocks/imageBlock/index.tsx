import { TextEditor } from "cms/dist/editor/editors/textEditor";
import { IBlockConfig } from "cms/dist/types/block";

interface IData {
    alt: string;
    src: string;
}

export const ImageBlock: IBlockConfig<any, IData> = {
    name: "Image",

    getInitialData: () => ({
        alt: "",
        src: "",
    }),

    getEditorInputs: () => ({
        alt: TextEditor,
        src: TextEditor,
    }),

    getLabel: data => data.alt || data.src,

    Component: props => (
        <img src={props.data.src} alt={props.data.alt} />
    ),
};
