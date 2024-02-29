import {
  unstable_parseMultipartFormData,
  unstable_createMemoryUploadHandler,
} from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { uploadFile } from "../files.server";

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const uploadHandler = unstable_createMemoryUploadHandler({
    maxPartSize: 20_000_000,
  });

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const files = formData.getAll("files");
  const result = await uploadFile(files, admin.graphql);
  console.log(result, "🎂");

  return {
    data: result,
  };
};
