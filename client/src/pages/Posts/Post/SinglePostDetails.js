import React, { useEffect, useState } from "react";

import {
  DeletePostById,
  GetPostDetailsById,
} from "../../../services/posts";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function SinglePostDetails(props) {
  const [data, setData] = useState({});
  const { id } = useParams();

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    GetPostDetailsById({ id })
      .then(({ data: { data } }) => {
        setData(data);
        console.log("data", data);
      })
      .catch((e) => {
        console.log("error", e);
        if (e.response.status === 404) {
          props.history.push("/posts");
        }
      });
  }, []);

  const DialogContent = () => (
    <div container>
      <div item xs={12}>
        <div className="mt-36">
          <div>
            <h1
              variant="h6"
              color="primary"
              align="center"
              className="mb-2"
            >
              Are You Sure Want to Delete ?
            </h1>
            <h1
              variant="h5"
              color="error"
              align="center"
              className="mb-2"
            >
              {data.title}
            </h1>
          </div>
          <div className="justify-center">
            <div mt={1} mb={1}>
              <button
                variant="outlined"
                color="primary"
                className="mr-2"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                variant="outlined"
                color="secondary"
                onClick={() =>
                  DeletePostById({ id }).then(() => {
                    setDialogOpen(false);
                    toast.success("Post Deleted successfully");
                    props.history.push("/posts");
                  })
                }
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const formatDate = (str) => {
    let date = new Date();
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  };

  return (
    <div>
      {!Object.keys(data).length ? (
        <div className="grid place-items-center text-2xl pt-12">
          <div>Loding....
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div className="pt-24">
              <div>
                <h1 className="text-4xl text-center">
                  {data.title}
                </h1>
                {data.publishedAt ? (
                  <h1 className="text-xl pr-72 text-right">
                    {formatDate(data.publishedAt)}
                  </h1>
                ) : null}
              </div>
            </div>
            <img
              src={data.imageFileSet}
              alt={data.title}
              className="grid place-items-center h-96 w-full px-12"
            />
            <div>
              <h1 className="text-xl px-12">
                {data.description}
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
