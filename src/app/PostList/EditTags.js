import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState, useEffect, useRef } from 'react';

export const EditTags = ({ tags, setTags }) => {
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const input = useRef(null);
    const editInput = useRef(null);

    useEffect(() => {
        if(inputVisible) input.current.focus();
    }, [inputVisible]);

    useEffect(() => {
        if(editInputIndex !== -1) editInput.current.focus();
    }, [editInputIndex]);

    const handleClose = removedTag => {
        const newTags = tags.filter(tag => tag !== removedTag);
        // console.log(newTags);
        setTags(newTags);
    };
    
    const showInput = () => {
        setInputVisible(true);
    };
    
    const handleInputChange = e => {
        setInputValue(e.target.value);
    };
    
    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        // console.log(tags);
        setTags(tags);
        setInputVisible(false);
        setInputValue('');
    };
    
    const handleEditInputChange = e => {
        setEditInputValue(e.target.value);
    };
    
    const handleEditInputConfirm = () => {
        const newTags = [...tags];
        newTags[editInputIndex] = editInputValue;
        setTags(newTags);
        setEditInputIndex(-1);
        setEditInputValue('');
    };
    
    const saveInputRef = i => {
        input.current = i;
    };
    
    const saveEditInputRef = i => {
        editInput.current = i;
    };
    
    return (
        <>
        {tags?.map((tag, index) => {
            if (editInputIndex === index) {
              return (
                <Input
                    ref={saveEditInputRef}
                    key={tag}
                    size="small"
                    className="tag-input"
                    value={editInputValue}
                    onChange={handleEditInputChange}
                    onBlur={handleEditInputConfirm}
                    onPressEnter={handleEditInputConfirm}
                />
              );
            }
  
            const isLongTag = tag.length > 20;
  
            const tagElem = (
                <Tag
                    className="edit-tag"
                    key={tag}
                    closable={true}
                    onClose={() => handleClose(tag)}
                >
                    <span
                        onDoubleClick={e => {
                            setEditInputValue(tag);
                            setEditInputIndex(index);
                            e.preventDefault();
                        }}
                    >
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                    </span>
                </Tag>
            );
            return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                    {tagElem}
                </Tooltip>
            ) : (
                tagElem
            );
        })}
        {inputVisible && (
            <Input
                ref={saveInputRef}
                type="text"
                size="small"
                className="tag-input"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
            />
        )}
        {!inputVisible && (tags?.length < 3) && (
            <Tag className="site-tag-plus" onClick={showInput}>
                <PlusOutlined /> New Tag
            </Tag>
        )}
        </>
    );
}