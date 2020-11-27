import React, { useState } from "react";
import {
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  CustomInput,
  Button,
} from "reactstrap";

const TextbookEditor = ({
  textbookModel,
  setTextbookModel,
  onSubmit,
  onCancel,
}) => {
  const [conditionDropdown, setConditionDropdown] = useState(false);
  const [stateDropdown, setStateDropdown] = useState(false);

  const handleTextChange = (e) => {
    e.preventDefault();
    setTextbookModel({
      ...textbookModel,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    console.dir(e.target.files[0]);
    setTextbookModel({
      ...textbookModel,
      img: e.target.files[0],
    });
  };

  return (
    <div>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>ISBN</InputGroupText>
        </InputGroupAddon>
        <Input
          type="text"
          placeholder={textbookModel.isbn}
          name="isbn"
          onChange={handleTextChange}
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Authors</InputGroupText>
        </InputGroupAddon>
        <Input
          type="text"
          placeholder={textbookModel.authors}
          name="author"
          onChange={handleTextChange}
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Title</InputGroupText>
        </InputGroupAddon>
        <Input
          type="text"
          placeholder={textbookModel.title}
          name="title"
          onChange={handleTextChange}
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Price</InputGroupText>
        </InputGroupAddon>
        <Input
          type="number"
          name="price"
          onChange={handleTextChange}
          required
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Volume/Edition</InputGroupText>
        </InputGroupAddon>
        <Input type="number" name="volume" onChange={handleTextChange} />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Comments</InputGroupText>
        </InputGroupAddon>
        <Input
          type="text"
          placeholder={textbookModel.comments}
          onChange={handleTextChange}
          name="comments"
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Image</InputGroupText>
        </InputGroupAddon>
        <CustomInput
          type="file"
          name="image"
          id="fileInput"
          multiple={false}
          onChange={handleImageUpload}
          accept="image/*"
        />
      </InputGroup>
      <InputGroup>
        <Dropdown
          isOpen={conditionDropdown}
          toggle={() => setConditionDropdown(!conditionDropdown)}
        >
          <DropdownToggle caret>Condition</DropdownToggle>
          <DropdownMenu>
            {["New", "Fair", "Used"].map((condition, key) => {
              return (
                <DropdownItem
                  key={key}
                  onClick={() =>
                    setTextbookModel({
                      ...textbookModel,
                      condition: condition,
                    })
                  }
                >
                  {condition}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
      </InputGroup>
      <InputGroup>
        <Dropdown
          isOpen={stateDropdown}
          toggle={() => setStateDropdown(!stateDropdown)}
        >
          <DropdownToggle caret>State</DropdownToggle>
          <DropdownMenu>
            {["For Sale", "Draft"].map((state, key) => {
              return (
                <DropdownItem
                  key={key}
                  onClick={() =>
                    setTextbookModel({
                      ...textbookModel,
                      state: state === "Draft" ? "D" : "F",
                    })
                  }
                >
                  {state}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
      </InputGroup>
      <Button onClick={onCancel}>Cancel</Button>
      <Button onClick={onSubmit}>Submit</Button>
    </div>
  );
};

export default TextbookEditor;
