type MessageProps = {
    text: string,
    textColor?: string
}


function Message(props: MessageProps){

    console.log(props);
    return (
        <div>
            <h4 style={{color: props.textColor}}>Message: {props.text}</h4>
            <p>This is a functional component</p>
            <p>Generate @ {new Date().toString()}</p>
        </div>
    );
}

export default Message;