import { editorFactory } from "cms/dist/editor";
import { NextPage } from "next";
import { itemTypeConfigs } from "../../itemTypes";

const Admin: NextPage = () => {
    const Editor = editorFactory(itemTypeConfigs)

    return (
        <div suppressHydrationWarning>
            {typeof window === "undefined" ? null : <Editor/>}
        </div>
    )
};

export async function getServerSideProps() {
    return {
        props: {
            random: Math.random(),
        }, 
    };
};

export default Admin;
