import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (value:string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState("");

    const activateEditModeHandler = () => {
        setEditMode(true);
        setTitle(props.title)
    }
    const activateViewModeHandler = () => {
        setEditMode(false);
        props.onChange(title)
    }

    const onChangeTitleHandler = (evt:ChangeEvent<HTMLInputElement>) => {
        setTitle(evt.currentTarget.value);
    }

    return (
        editMode
            ? <input value={title}
                     onBlur={activateViewModeHandler}
                     autoFocus
                     onChange={onChangeTitleHandler}/>
            : <span onDoubleClick={activateEditModeHandler}>{props.title}</span>
    )
}