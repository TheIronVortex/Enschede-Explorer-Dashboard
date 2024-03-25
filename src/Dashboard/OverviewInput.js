/*
function OverviewInput(content) {
  
  return (
    <Form.Group>
      <Form.Label>{parentKeys[content]}:</Form.Label>
      <div className="d-flex align-items-center">
        <Form.Control
          disabled={!editableFields[parentKeys[content]]}
          type="text"
          className="ms-4 bg-light"
          style={{ width: "95%" }}
          defaultValue={data && data[parentKeys[content]]}
          onChange={(e) =>
            handleInputChange(
              parentKeys[content],
              e.target.value
            )
          }
        />
        <Button
          variant="secondary"
          className="ms-2"
          onClick={() => {
            if (editableFields[parentKeys[content]]) {
              saveData(
                parentKeys[content],
                editedValues[parentKeys[content]]
              );
            }
            toggleEditMode(parentKeys[content]);
          }}
        >
          {editableFields[parentKeys[content]] ? "Save" : "Edit"}
        </Button>
      </div>
    </Form.Group>
  );
}

export default OverviewInput;
*/