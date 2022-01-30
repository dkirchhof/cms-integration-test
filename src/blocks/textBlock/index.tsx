import { multiLineEditorFactory } from "cms/dist/editor/editors/multiLineEditor";
import { IBlockConfig } from "cms/dist/types/block";
import { P } from "./styles";

interface IData {
    text: string;
}

export const TextBlock: IBlockConfig<IData> = {
    name: "Paragraph",
    toString: data => data.text.slice(0, 50),

    propConfigs: {
        text: {
            editor: multiLineEditorFactory(),
            defaultValue: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        },
    },

    Component: props => (
        <P>{props.data.text}</P>
    ),
};
