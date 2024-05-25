import RootComp from "./root"

const GroupDetails = (props: any) => {
    const { group } = props;
    return (
        <>
            <RootComp group={group} />    
        </>
    )
}

export default GroupDetails