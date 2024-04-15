import RootComp from "./root"

const Discussion = (props: any) => {
    const { group } = props;

    return (
        <>
            <RootComp group={group} />
        </>
    )
}

export default Discussion