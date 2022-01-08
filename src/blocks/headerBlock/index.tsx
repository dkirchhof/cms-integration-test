import { TextEditor } from "cms/dist/editor/editors/textEditor";
import { useItem } from "cms/dist/editor/pages/visualBlockEditor";
import { IBlockConfig } from "cms/dist/editor/types/block";
import { HeaderContainer } from "./styles";

interface IData {
    imgAlt: string;
    imgSrc: string;
}

export const HeaderBlock: IBlockConfig<IData> = {
    name: "Header",

    getInitialData: () => ({
        imgAlt: "",
        imgSrc: "",
    }),

    getEditorInputs: () => ({
        imgAlt: TextEditor,
        imgSrc: TextEditor,
    }),

    getLabel: _data => "",

    Component: props => {
        const page = useItem<any>();

        return (
            <HeaderContainer>
                <img src={props.data.imgSrc} alt={props.data.imgAlt} />
                <div>
                    <h1>{page.title}</h1>
                    <h2>{page.subtitle}</h2>
                </div>
            </HeaderContainer>
        );
    },
};
