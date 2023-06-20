import React, { useState } from "react";
import joi from "joi-browser";
import FileBase64 from "react-file-base64";
import { TextInputField } from "../../../components/FormComponents";
import { AddPosts } from "../../../services/posts";
import { toast } from "react-toastify";

export default function AddPost(props) {
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
      AddPosts({ data })
        .then(() => {
          console.log("Post Added Successfully");
          toast.success("Post Added Successfully");
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

  return (
    <div className="w-screen mt-36 grid place-items-center">
      <div className="grid place-items-center bg-slate-100 px-4 py-6 rounded-xl">
        <div item xs={12} sm={6}>
          <div className="mt-2 mb-2">
            <h1 className="text-primary text-3xl text-center">
              Add Blog Post
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
  );
}
