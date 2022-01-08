import { editorFactory } from "cms/dist/editor";
import { NextPage } from "next";
import { blockConfigs } from "../../blocks";
import { itemTypeConfigs } from "../../itemTypes";

const Admin: NextPage = () => {
    const Editor = editorFactory(itemTypeConfigs, blockConfigs)

    return (
        <div suppressHydrationWarning>
            {typeof window === "undefined" ? null : <Editor/>}
        </div>
    )
};

export default Admin;
