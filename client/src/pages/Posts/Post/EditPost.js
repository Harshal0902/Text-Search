import React, { useState, useEffect } from "react";
import joi from "joi-browser";
import FileBase64 from "react-file-base64";
import { TextInputField } from "../../../components/FormComponents";
import { EditPostData, GetPostDetailsById } from "../../../services/posts";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function EditPost(props) {
  const { id } = useParams();
  const [formValidationError, setFormValidationError] = useState("");
  const [state, setState] = useState({
    data: {
      title: "",
      imageFileSet: "",
      description: "",
    },
    errors: {},
  });

  const schema = {
    title: joi.string().required().label("Title").min(5),
    imageFileSet: joi.string().required().label("Image"),
    description: joi.string().required().label("Description"),
  };

  const handleOnChange = ({ target }) => {
    const { data, errors } = state;
    const { error } = joi.validate(data[target.name], schema[target.name], {
      abortEarly: true,
    });
    !error
      ? (errors[target.name] = "")
      : (errors[target.name] = error.details[0].message);
    data[target.name] = target.value;
    setState({ data, errors });
  };

  const validate = () => {
    let errorObj = {};
    let { error } = joi.validate(state.data, schema, { abortEarly: false });

    !error
      ? (errorObj = {})
      : error.details.map((item) => (errorObj[item.path] = item.message));
    return errorObj;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let errors = validate();
    let { data } = state;
    setState({ data, errors });

    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      EditPostData({ id, data })
        .then(() => {
          toast.success("Post Updated Successfully");
          setState({
            data: {
              title: "",
              imageFileSet: "",
              description: "",
            },
            errors: {},
          });
          props.history.push("/posts");
        })
        .catch((e) => {
          console.log("error", e);
          setFormValidationError(e.message);
        });
    }
  };

  useEffect(() => {
    GetPostDetailsById({ id })
      .then(({ data: { data: item } }) => {
        const { data, errors } = state;
        data.title = item.title;
        data.imageFileSet = item.imageFileSet;
        data.description = item.title;

        setState({ data, errors });
      })
      .catch((e) => {
        console.log("error", e);
        props.history.push("/posts");
      });
  }, [id]);

  return (
    <div className="max-w-lg">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <img
            src={state.data.imageFileSet}
            alt={state.data.title}
            className="w-full"
          />
        </div>
        <div className="col-span-1">
          <div className="grid">
            <div className="col-span-12">
              <div className="mt-2 mb-2">
                <h1 variant="h6" className="text-primary" align="center">
                  Edit Blog Post
                </h1>
                <h1 variant="subtitle2" className="text-error" align="center">
                  {formValidationError}
                </h1>
              </div>
              <form onSubmit={handleOnSubmit}>
                <div className="mt-2 mb-1">
                  <TextInputField
                    state={state}
                    name="title"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mt-2 mb-1">
                  <FileBase64
                    onDone={(e) => {
                      let { data, errors } = state;

                      data.imageFileSet = e.base64;
                      errors.imageFileSet = "";
                      setState({ data, errors });
                    }}
                  />
                  <h1 variant="subtitle2" className="text-error">
                    {state.errors.imageFileSet ? state.errors.imageFileSet : null}
                  </h1>
                </div>
                <div className="mt-2 mb-1">
                  <TextInputField
                    state={state}
                    name="description"
                    onChange={handleOnChange}
                    multiline
                    rows={4}
                  />
                </div>
                <div className="mt-2 mb-1">
                  <button
                    className="text-primary border-primary bg-red-500"
                    variant="outlined"
                    type="submit"
                    fullWidth
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
