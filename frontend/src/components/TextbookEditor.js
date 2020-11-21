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
} from "reactstrap";

const TextbookEditor = ({
  textbookModel,
  handleTextChange,
  setTextbookModel,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
        <Input type="text" placeholder={textbookModel.authors} name="author" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Title</InputGroupText>
        </InputGroupAddon>
        <Input type="text" placeholder={textbookModel.title} name="title" />
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
          <InputGroupText>Image</InputGroupText>
        </InputGroupAddon>
        <CustomInput type="file" name="image" id="fileInput" />
      </InputGroup>
      <InputGroup>
        <Dropdown
          isOpen={dropdownOpen}
          toggle={() => setDropdownOpen(!dropdownOpen)}
        >
          <DropdownToggle caret>Condition</DropdownToggle>
          <DropdownMenu>
            {["New", "Used (Like New)", "Used (Good)", "Used (Worn)"].map(
              (condition, key) => {
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
              }
            )}
          </DropdownMenu>
        </Dropdown>
      </InputGroup>
    </div>
  );
};

export default TextbookEditor;
